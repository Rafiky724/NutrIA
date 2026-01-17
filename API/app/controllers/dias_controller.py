from typing import List
from bson import ObjectId
from fastapi import HTTPException
from app.core.database import db
from app.core.parse import safe_parse_json
from app.core.llm import ask_llm

class DiasController:

    DIAS_VALIDOS = {
    "lunes", "martes", "miercoles",
    "jueves", "viernes", "sabado", "domingo"
    }

    @staticmethod
    def build_dia_document(plan_id: ObjectId, dia_semana: str, comidas_json: dict) -> dict:
        dia_doc = {
            "plan_id": plan_id,
            "dia_semana": dia_semana,
            "comidas": comidas_json
        }
        return dia_doc

    @staticmethod
    async def build_dias_from_dieta(dias: List[dict], session=None):
        return await db.dias.insert_many(dias, session=session)
    
    @staticmethod
    async def update_dia(dia_id: ObjectId, update_data: dict, session=None) -> bool:
        """
        Actualiza un documento específico de la colección dias.
        
        Args:
            dia_id: ObjectId del documento a actualizar
            update_data: Diccionario con los datos a actualizar
            session: Sesión opcional de la base de datos
            
        Returns:
            True si la actualización fue exitosa, False si no se encontró el documento
        """
        result = await db.dias.update_one(
            {"_id": dia_id},
            {"$set": update_data},
            session=session
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=404,
                detail="Día no encontrado"
            )
        
        return result.modified_count > 0
    
    @staticmethod
    async def get_dia_by_nombre(current_user: dict, dia: str) -> dict:

        user_id = ObjectId(current_user["_id"])

        dia = dia.lower()
        if dia not in DiasController.DIAS_VALIDOS:
            raise HTTPException(status_code=400, detail="Día inválido")

        plan = await db.planes.find_one(
            {"id_usuario": user_id, "activo": True},
            {"_id": 1}
        )

        if not plan:
            raise HTTPException(status_code=404, detail="Plan activo no encontrado")

        dia_doc = await db.dias.find_one(
            {
                "id_plan": plan["_id"],
                "dia_semana": dia.lower()
            },
            {"_id": 0}
        )

        if not dia_doc:
            raise HTTPException(status_code=404, detail=f"No hay información para {dia}")

        return dia_doc

    @staticmethod
    async def get_dia_completo_by_nombre(current_user: dict, dia: str) -> dict:
        """
        Retorna el documento completo de días incluyendo el _id.
        
        Args:
            current_user: Diccionario del usuario actual
            dia: Nombre del día de la semana
            
        Returns:
            Documento completo del día incluyendo _id
        """
        user_id = ObjectId(current_user["_id"])

        dia = dia.lower()
        if dia not in DiasController.DIAS_VALIDOS:
            raise HTTPException(status_code=400, detail="Día inválido")

        plan = await db.planes.find_one(
            {"id_usuario": user_id, "activo": True},
            {"_id": 1}
        )

        if not plan:
            raise HTTPException(status_code=404, detail="Plan activo no encontrado")

        dia_doc = await db.dias.find_one(
            {
                "id_plan": plan["_id"],
                "dia_semana": dia.lower()
            }
        )

        if not dia_doc:
            raise HTTPException(status_code=404, detail=f"No hay información para {dia}")

        return dia_doc

    @staticmethod
    def build_prompt_editar_comida(
        objetivo_usuario: str,
        calorias_diarias: float,
        dia_semana: str,
        tipo_comida: str,
        resumen_dia: list[dict],
        totales_dia: dict,
        ingredientes: list[str]
    ) -> str:
        return f"""
    Eres un nutricionista profesional.
    Contexto del usuario:
    - Objetivo: {objetivo_usuario}
    - Calorías diarias objetivo: {calorias_diarias}
    - Día de la semana: {dia_semana}
    - Estado nutricional del día (antes del cambio): {resumen_dia}
    - Totales actuales del día: {totales_dia}
    - Comida a editar: {tipo_comida}
    El usuario quiere modificar esta comida usando únicamente los siguientes ingredientes:
    {', '.join(ingredientes)}
    Tareas:
    1. Ajusta las cantidades adecuadas para esta comida según el objetivo del usuario.
    2. Calcula los macronutrientes por ingrediente:
    - calorías
    - proteínas
    - carbohidratos
    - grasas
    3. Calcula los totales del plato.
    4. Estima un precio aproximado del plato en pesos COLOMBIANOS.
    5. Mantén coherencia nutricional con el objetivo del usuario.
    6. Da una breve opinión profesional (máx 3 líneas) sobre el cambio realizado.

    Devuelve EXCLUSIVAMENTE un JSON con esta estructura exacta:
    {{
    "comida": {{
        "calorias": number,
        "proteinas": number,
        "carbohidratos": number,
        "grasas": number,
        "precio_estimado": number,
        "ingredientes": [
        {{
            "nombre": string,
            "tipo": string,
            "cantidad": string,
            "calorias_ingrediente": number,
            "proteinas_ingrediente": number,
            "carbohidratos_ingrediente": number,
            "grasas_ingrediente": number
        }}
        ]
    }},
    "opinion": string
    }}
    No incluyas texto fuera del JSON.
    """
    
    async def actualizar_comida_dia(response_text: str, dia_doc: dict, tipo_comida: str) -> dict:
        try:
            parsed_ia = safe_parse_json(response_text)
        except Exception as e:
            # fallback: no actualizar comida
            # devolver mensaje al usuario
            raise HTTPException(
                status_code=422,
                detail=f"No se pudo procesar la respuesta de la IA: {str(e)}"
            )

        comida_ia = parsed_ia["comida"]
        opinion_ia = parsed_ia["opinion"]

        for comida in dia_doc["comidas"]:
            if comida["tipo_comida"].lower() == tipo_comida.lower():
                comida["ingredientes"] = comida_ia["ingredientes"]
                comida["calorias"] = comida_ia["calorias"]
                comida["proteinas"] = comida_ia["proteinas"]
                comida["carbohidratos"] = comida_ia["carbohidratos"]
                comida["grasas"] = comida_ia["grasas"]
                comida["precio_estimado"] = comida_ia["precio_estimado"]
                #comida["verificada"] = False
                #comida["completada"] = False

        # Recalcular totales del día
        dia_doc["calorias_totales"] = sum(c["calorias"] for c in dia_doc["comidas"])
        dia_doc["proteinas_totales"] = sum(c["proteinas"] for c in dia_doc["comidas"])
        dia_doc["carbohidratos_totales"] = sum(c["carbohidratos"] for c in dia_doc["comidas"])
        dia_doc["grasas_totales"] = sum(c["grasas"] for c in dia_doc["comidas"])
        dia_doc["completado"] = False

        try:
            async with await db.client.start_session() as session:
                async with session.start_transaction():
                    await DiasController.update_dia(
                        dia_id=ObjectId(dia_doc["_id"]),
                        update_data=dia_doc,
                        session=session
                    )
                    # Si llega aquí, todo OK
        except Exception as e:
            # ROLLBACK automático por salir del transaction
            raise HTTPException(status_code=500, detail=f"Error al actualizar: {str(e)}")
        
        return dia_doc, opinion_ia

    @staticmethod
    async def editar_comida_dia(user: dict, dia: str, tipo_comida: str, ingredientes: list[str]) -> dict:
        dia_doc = await DiasController.get_dia_completo_by_nombre(user, dia)

        objetivo = await db.objetivos.find_one(
            {"id_usuario": ObjectId(user["_id"]), "activo": True},
            {"_id": 1, "tipo_objetivo": 1, "calorias_diarias": 1}
        )

        resumen_dia = DiasController.build_resumen_dia(dia_doc["comidas"], tipo_comida)
        totales_dia = DiasController.recalcular_totales_dia(dia_doc["comidas"])

        prompt = DiasController.build_prompt_editar_comida(objetivo_usuario=objetivo["tipo_objetivo"],
                                                           calorias_diarias=objetivo["calorias_diarias"],
                                                            dia_semana=dia,
                                                            tipo_comida=tipo_comida,
                                                            resumen_dia=resumen_dia,
                                                            totales_dia=totales_dia,
                                                            ingredientes=ingredientes)
        
        response_text = await ask_llm(prompt, model="gemini-2.5-flash-lite")
        
        """
        guardar_respuesta = {
            "id_usuario": ObjectId(user["_id"]),
            "cambio_dia": response_text,
            "dia": dia,
            "tipo_comida": tipo_comida
        }
        await db.cambiosDiasProvisional.insert_one(guardar_respuesta)"""
        """
        response = await db.cambiosDiasProvisional.find_one({"id_usuario": ObjectId(user["_id"])})
        response_text = response["cambio_dia"]"""

        try:
            dia_doc, opinion_ia = await DiasController.actualizar_comida_dia(response_text, dia_doc, tipo_comida)
        except Exception as e:
            raise HTTPException(
                status_code=422,
                detail=f"No se pudo procesar la respuesta de la IA: {str(e)}"
            )

        return {
            "dia": dia_doc,
            "opinion_ia": opinion_ia
        }

    @staticmethod
    def build_prompt_regenerar_comida(
        objetivo_usuario: str,
        calorias_diarias: float,
        dia_semana: str,
        tipo_comida: str,
        resumen_dia: list[dict],
        totales_dia: dict,
        ingredientes_base: List[str]
    ) -> str:
        return f"""
    Eres un nutricionista profesional.

    Objetivo del usuario:
    - {objetivo_usuario}
    - Calorías diarias objetivo: {calorias_diarias}

    Día: {dia_semana}

    Estado nutricional del día (antes del cambio):
    {resumen_dia}

    Totales actuales del día:
    {totales_dia}

    Comida a regenerar: {tipo_comida}

    Ingredientes disponibles: {ingredientes_base}

    Tareas:
    1. Regenera completamente este plato usando SOLO esos ingredientes.
    2. Ajusta cantidades según el BALANCE DEL DÍA COMPLETO.
    3. Calcula macros por ingrediente y totales del plato.
    4. Estima precio en pesos COLOMBIANOS.
    5. Mantén coherencia con el objetivo del usuario.
    6. Da una breve opinión profesional (máx 3 líneas).

    Devuelve EXCLUSIVAMENTE un JSON con esta estructura exacta:
    {{
    "comida": {{
        "calorias": number,
        "proteinas": number,
        "carbohidratos": number,
        "grasas": number,
        "precio_estimado": number,
        "ingredientes": [
        {{
            "nombre": string,
            "tipo": string,
            "cantidad": string,
            "calorias_ingrediente": number,
            "proteinas_ingrediente": number,
            "carbohidratos_ingrediente": number,
            "grasas_ingrediente": number
        }}
        ]
    }},
    "opinion": string
    }}
    No incluyas texto fuera del JSON.
    """

    def build_resumen_dia(comidas: list[dict], comida_excluir: str) -> list[dict]:
        resumen = []
        for comida in comidas:
            if comida["tipo_comida"] != comida_excluir:
                resumen.append({
                    "tipo_comida": comida["tipo_comida"],
                    "calorias": comida["calorias"],
                    "proteinas": comida["proteinas"],
                    "carbohidratos": comida["carbohidratos"],
                    "grasas": comida["grasas"],
                })
        return resumen
    
    def recalcular_totales_dia(comidas: list[dict]) -> dict:
        return {
            "calorias_totales": sum(c["calorias"] for c in comidas),
            "proteinas_totales": sum(c["proteinas"] for c in comidas),
            "carbohidratos_totales": sum(c["carbohidratos"] for c in comidas),
            "grasas_totales": sum(c["grasas"] for c in comidas),
        }
    
    @staticmethod
    async def regenerar_comida_dia(user: dict, dia: str, tipo_comida: str) -> dict:

        dia_doc = await DiasController.get_dia_completo_by_nombre(user, dia)

        objetivo = await db.objetivos.find_one(
            {"id_usuario": ObjectId(user["_id"]), "activo": True},
            {"_id": 1, "tipo_objetivo": 1, "calorias_diarias": 1}
        )

        resumen_dia = DiasController.build_resumen_dia(dia_doc["comidas"], tipo_comida)
        totales_dia = DiasController.recalcular_totales_dia(dia_doc["comidas"])

        ingredientes_base = await db.despensas.find_one(
            {"id_usuario": ObjectId(user["_id"])},
            {"_id": 0, "ingredientes": 1}
        )
        
        prompt = DiasController.build_prompt_regenerar_comida(
            objetivo_usuario=objetivo["tipo_objetivo"],
            calorias_diarias=objetivo["calorias_diarias"],
            dia_semana=dia,
            tipo_comida=tipo_comida,
            resumen_dia=resumen_dia,
            totales_dia=totales_dia,
            ingredientes_base=ingredientes_base["ingredientes"]
        )
        
        
        response_text = await ask_llm(prompt, model="gemini-2.5-flash-lite")
        """
        guardar_respuesta = {
            "id_usuario": ObjectId(user["_id"]),
            "cambio_dia": response_text,
            "dia": dia,
            "tipo_comida": tipo_comida
        }
        await db.cambiosDiasProvisional.insert_one(guardar_respuesta)
        """
        """
        response = await db.cambiosDiasProvisional.find_one({"id_usuario": ObjectId(user["_id"])})
        response_text = response["cambio_dia"]"""
        
        try:
            dia_doc, opinion_ia = await DiasController.actualizar_comida_dia(response_text, dia_doc, tipo_comida)
        except Exception as e:
            raise HTTPException(
                status_code=422,
                detail=f"No se pudo procesar la respuesta de la IA: {str(e)}"
            )
        
        return {
            "dia": dia_doc,
            "opinion_ia": opinion_ia
        }