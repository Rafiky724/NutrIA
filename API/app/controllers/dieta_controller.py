from datetime import datetime, timedelta, date
import unicodedata
from bson import ObjectId
from app.controllers.plan_controller import PlanController
from app.controllers.objetivo_controller import ObjetivoController
from app.controllers.dias_controller import DiasController
from app.controllers.user_controller import UserController
from app.core.database import db
from fastapi import HTTPException
import json
from app.core.llm import ask_llm
import re

class DietaController:

    DIAS_SEMANA = [
    "lunes", "martes", "miercoles",
    "jueves", "viernes", "sabado", "domingo"
    ]


    @staticmethod
    def safe_parse_json(text: str) -> dict:
        """
        Try to safely parse a JSON object from a given text response.
        """

        if not text:
            raise ValueError("Respuesta vacía del LLM")

        # Delete extra spaces/newlines
        start = text.find("{")
        end = text.rfind("}")

        if start == -1 or end == -1:
            raise ValueError("No se encontró un objeto JSON en la respuesta")

        json_candidate = text[start:end + 1]

        # Delete comments (// ...)
        json_candidate = re.sub(r"//.*", "", json_candidate)

        # Try to parse the cleaned JSON
        try:
            return json.loads(json_candidate)
        except json.JSONDecodeError as e:
            raise ValueError(f"Error al parsear JSON del LLM: {e}")

    @staticmethod
    async def create_dieta(current_user: dict) -> dict:

        user_id = ObjectId(current_user["_id"])

        #print("USER ID DIETA:", user_id)

        despensa = await db.despensas.find_one({"id_usuario": user_id})
        if not despensa:
            raise HTTPException(status_code=404, detail="Despensa no encontrada para el usuario")
        
        objetivo = await db.objetivos.find_one({"id_usuario": user_id})
        if not objetivo:
            raise HTTPException(status_code=404, detail="Objetivo no encontrado para el usuario")
        
        plan = await db.planes.find_one({"id_usuario": user_id})
        if not plan:
            raise HTTPException(status_code=404, detail="Plan no encontrado para el usuario")
        
        promt = DietaController.build_dieta_prompt(current_user, despensa, objetivo, plan)
    
        
        response_text = await ask_llm(promt, model="gemini-2.5-flash")
        """
        guardar_respuesta = {
            "id_usuario": user_id,
            "dieta": response_text
        }
        await db.dietasProvisional.insert_one(guardar_respuesta)"""

        #print("RESPONSE DIETA:", response_text)
        #print("PROMPT DIETA:", promt)

        """
        response = await db.dietasProvisional.find_one({"id_usuario": user_id})
        response_text = response["dieta"]"""

        try:
            dieta_json = DietaController.safe_parse_json(response_text)
        except ValueError as e:
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )

        #print("DIETA JSON:", dieta_json)

        plan_update = DietaController.extract_plan_update_from_dieta(dieta_json)

        objetivo_update = DietaController.extract_objetivo_update_from_dieta(dieta_json)

        dias_docs = DietaController.build_dias_from_dieta(plan_id=plan["_id"], dieta_json=dieta_json)

        async with await db.client.start_session() as session:
            async with session.start_transaction():
                await PlanController.update_plan_from_dieta(user_id, plan_update, session=session)

                await ObjetivoController.update_objetivo_from_dieta(user_id, objetivo_update, session=session)

                if dias_docs:
                    await DiasController.build_dias_from_dieta(dias_docs, session=session)
                
                await UserController.update_tiene_plan(user_id, session=session)

        return {200: "Dieta creada y almacenada exitosamente"}

    @staticmethod
    def build_dieta_prompt(user: dict, despensa: dict, objetivo: dict, plan: dict) -> str:
        return f"""
        Eres un nutricionista profesional y científico. Tu tarea es crear un plan alimenticio semanal personalizado.
        REGLAS OBLIGATORIAS:
        - Responde ÚNICAMENTE con un JSON válido
        - NO agregues texto adicional
        - NO agregues explicaciones
        - Usa exactamente la estructura solicitada
        - Usa null cuando no tengas certeza exacta (excepto en el precio, siempre has un estimado)
        - Todos los valores numéricos deben ser números, no strings
        DATOS DEL USUARIO:
        - Género: {user.get("genero")}
        - Nacimiento: {user.get("fecha_nacimiento")}
        - Peso: {user.get("peso_actual")} kg
        - Altura: {user.get("altura_cm")} cm
        - Nivel de actividad: {user.get("nivel_actividad")}
        - Tipo de actividad: {user.get("tipo_actividad")}
        - Objetivo principal: {objetivo.get("tipo_objetivo")}
        - Peso objetivo: {objetivo.get("peso_objetivo")} kg
        - Tipo de dieta: {plan.get("tipo_dieta")}
        - Velocidad de dieta: {plan.get("velocidad_dieta")}
        - Presupuesto semanal: {plan.get("presupuesto_semanal")} (si hay un valor de presupuesto, ajústate a eso. Si no, ignora este campo pero aún así pon precios)
        - Comidas por día: {plan.get("cantidad_comidas")}
        ENFERMEDADES:
        - Enfermedades: {plan.get("enfermedad")}
        ALIMENTOS DISPONIBLES (USAR SOLO ESTOS ALIMENTOS):
        - Despensa: {despensa.get("ingredientes")}
        FORMATO DE RESPUESTA (OBLIGATORIO):
        Devuelve exactamente este JSON (mismas claves, misma jerarquía):

        {{
        "dieta": {{
            "calorias_diarias_recomendadas": "" (cantidad de calorías diarias recomendadas),
            "carbs_diarios_recomendados": "" (cantidad de carbohidratos diarios recomendados),
            "grasas_diarias_recomendadas": "" (cantidad de grasas diarias recomendadas),
            "proteinas_diarias_recomendadas": "" (cantidad de proteínas diarias recomendadas),
            "dia_objetivo_logrado_aproximado": "" (cantidad de días estimados para lograr el peso objetivo),

            "Lunes": {{
            "Desayuno": {{
                "precio_estimado": "" (precio esitimado del plato en pesos colombianos. Aplicar para todos),
                "hora": "",
                "calorias": "" (cantidad de calorías de ese plato),
                "proteina": "",
                "carbs": "",
                "grasas": "",
                "ingredientes": [
                {{
                    "nombre": "",
                    "tipo": "" (poner el mismo tipo que en la despensa, por ejemplo: vegetal, fruta, cereal, legumbre, proteína animal, lácteo, etc.),
                    "cantidad": "" (poner con string la cantidad con unidad, por ejemplo: 100g, 1 taza, 2 unidades, etc.),
                    "calorias": "" (cantidad de calorías del total del ingrediente),
                    "proteina": "",
                    "carbs": "",
                    "grasas": ""
                }}
                ]
            }},
            "Almuerzo": {{
                "precio_estimado": "",
                "hora": "",
                "calorias": "",
                "proteina": "",
                "carbs": "",
                "grasas": "",
                "ingredientes": [
                {{
                    "nombre": "",
                    "tipo": "",
                    "cantidad": "",
                    "calorias": "",
                    "proteina": "",
                    "carbs": "",
                    "grasas": ""
                }}
                ]
            }},
            "Cena": {{
                "precio_estimado": "",
                "hora": "",
                "calorias": "",
                "proteina": "",
                "carbs": "",
                "grasas": "",
                "ingredientes": [
                {{
                    "nombre": "",
                    "tipo": "",
                    "cantidad": "",
                    "calorias": "",
                    "proteina": "",
                    "carbs": "",
                    "grasas": ""
                }}
                ]
            }}
            }}

            // Repetir la misma estructura para Martes a Domingo y según las comidas que decidió el usuario
        }}
        }}
        """
    
    @staticmethod
    def extract_plan_update_from_dieta(dieta_json: dict) -> dict:
        dieta = dieta_json.get("dieta", {})

        return {
            "fecha_inicio": datetime.now(),
            "calorias_diarias": dieta.get("calorias_diarias_recomendadas"),
            "proteinas_diarias": dieta.get("proteinas_diarias_recomendadas"),
            "carbohidratos_diarios": dieta.get("carbs_diarios_recomendados"),
            "grasas_diarias": dieta.get("grasas_diarias_recomendadas"),
            "activo": True
        }
    
    @staticmethod
    def extract_objetivo_update_from_dieta(dieta_json: dict) -> dict:
        dieta = dieta_json.get("dieta", {})

        dias_estimados = dieta.get("dia_objetivo_logrado_aproximado")
        calorias_diarias = dieta.get("calorias_diarias_recomendadas")

        fecha_inicio = datetime.now()

        fecha_estimada = None
        if isinstance(dias_estimados, (int, float)):
            fecha_estimada = fecha_inicio + timedelta(days=int(dias_estimados))

        return {
            "fecha_inicio": fecha_inicio,
            "fecha_estimada": fecha_estimada,
            "calorias_diarias": calorias_diarias
        }
    
    @staticmethod
    def build_dia_document(plan_id, dia_semana: str, comidas_json: dict) -> dict:
        comidas = []

        calorias_total = 0
        proteinas_total = 0
        carbs_total = 0
        grasas_total = 0

        for tipo_comida, data in comidas_json.items():

            ingredientes = []
            for ing in data.get("ingredientes", []):
                ingredientes.append({
                    "nombre": ing.get("nombre"),
                    "tipo": ing.get("tipo"),
                    "cantidad": str(ing.get("cantidad")),
                    "calorias_ingrediente": ing.get("calorias"),
                    "proteinas_ingrediente": ing.get("proteina"),
                    "carbohidratos_ingrediente": ing.get("carbs"),
                    "grasas_ingrediente": ing.get("grasas")
                })

            comidas.append({
                "tipo_comida": tipo_comida,
                "hora_sugerida": data.get("hora"),
                "hora_real": None,
                "calorias": data.get("calorias"),
                "proteinas": data.get("proteina"),
                "carbohidratos": data.get("carbs"),
                "grasas": data.get("grasas"),
                "precio_estimado": data.get("precio_estimado"),
                "completada": False,
                "verificada": False,
                "ingredientes": ingredientes
            })
            
            try:
                calorias_total += data.get("calorias", 0)
                proteinas_total += data.get("proteina", 0)
                carbs_total += data.get("carbs", 0)
                grasas_total += data.get("grasas", 0)

            except (TypeError, ValueError):
                raise HTTPException(status_code=404, detail="Error en los datos nutricionales de la dieta")

        return {
            "id_plan": plan_id,
            "dia_semana": DietaController.normalizar_texto(dia_semana),

            "calorias_totales": calorias_total,
            "proteinas_totales": proteinas_total,
            "carbohidratos_totales": carbs_total,
            "grasas_totales": grasas_total,
            #"costo_total": None,

            "completado": False,
            "comidas": comidas,

            "created_at": datetime.now()
        }
    
    @staticmethod
    def build_dias_from_dieta(plan_id, dieta_json: dict) -> list:
        dias_docs = []

        dieta = dieta_json.get("dieta", {})

        # Mapear claves normalizadas -> clave original para lidiar con mayúsculas/acentos
        normalized_map = {}
        for key in dieta.keys():
            normalized_map[DietaController.normalizar_texto(key)] = key

        # Para cada día canonical, buscar la clave correspondiente en la respuesta
        for dia in DietaController.DIAS_SEMANA:
            norm_dia = DietaController.normalizar_texto(dia)
            if norm_dia in normalized_map:
                comidas_json = dieta[normalized_map[norm_dia]]
            else:
                # Si el LLM no devolvió ese día, usar dict vacío (build_dia_document generará día vacío)
                comidas_json = {}

            dia_doc = DietaController.build_dia_document(
                plan_id=plan_id,
                dia_semana=dia,
                comidas_json=comidas_json
            )

            dias_docs.append(dia_doc)

        return dias_docs
    
    @staticmethod
    def normalizar_texto(texto: str) -> str:
        texto = texto.lower()
        texto = unicodedata.normalize("NFD", texto)
        texto = "".join(
            c for c in texto
            if unicodedata.category(c) != "Mn"
        )
        return texto