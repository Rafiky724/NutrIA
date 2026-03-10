from zoneinfo import ZoneInfo

from bson import ObjectId
from fastapi import HTTPException
from datetime import datetime
from app.models.mascota_model import MascotaModel

class MascotasController:

    categorias_validas = [
        "mascotas",
        "gafas",
        "gorras",
        "marcos",
        "fondos",
        "accesorios"
    ]

    @staticmethod
    async def crear_mascota_usuario(current_user: dict, data):

        user_id = ObjectId(current_user["_id"])

        mascota_usuario = await MascotaModel.get_mascota_usuario(user_id)

        if mascota_usuario:
            raise HTTPException(
                status_code=400,
                detail="El usuario ya tiene una mascota creada"
            )

        if data.tipo_mascota not in ["nutria", "perro", "gato"]:
            raise HTTPException(
                status_code=400,
                detail="Tipo de mascota inválido"
            )

        mascota_documento = {

            "id_usuario": user_id,

            "mascota_activa": data.tipo_mascota,

            "mascotas": [
                {
                    "tipo": data.tipo_mascota,
                    "nombre": data.nombre,

                    "estado": "feliz",

                    "gafas_puestas": None,
                    "gorra_puesta": None,
                    "marco_puesto": None,
                    "fondo_puesto": None,
                    "accesorio_puesto": None
                }
            ],

            "inventario": {
                "gorras": [],
                "gafas": [],
                "fondos": [],
                "marcos": [],
                "accesorios": []
            },

            "creado_en": datetime.now(ZoneInfo("America/Bogota")),
            "fecha_actualizacion": None
        }

        try:
            await MascotaModel.crear_mascota_usuario(mascota_documento)

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail="Error al crear la mascota"
            )

        return {
            "mensaje": "Mascota creada correctamente"
        }
    

    async def crear_tienda():

        tienda_existente = await MascotaModel.get_tienda()

        if tienda_existente:
            raise HTTPException(
                status_code=400,
                detail="La tienda ya fue inicializada"
            )

        mascotas = [
            {
                "id": "nutria",
                "nombre": "nutria",
                "precio_gemas": 0,
                "imagen": "nutria.svg"
            },
            {
                "id": "perro",
                "nombre": "perro",
                "precio_gemas": 0,
                "imagen": "perro.svg"
            },
            {
                "id": "gato",
                "nombre": "gato",
                "precio_gemas": 0,
                "imagen": "gato.svg"
            },
            {
                "id": "dinosaurio",
                "nombre": "dinosaurio",
                "precio_gemas": 200,
                "imagen": "dinosaurio.svg"
            }
        ]

        def generar_items(tipo, precio_base):
            items = []
            for i in range(1, 7):
                items.append({
                    "id": f"{tipo}{i}",
                    "nombre": f"{tipo}{i}",
                    "precio_gemas": precio_base,
                    "imagen": f"{tipo}{i}.svg"
                })
            return items

        tienda_documento = {
            "_id": "tienda_principal",

            "mascotas": mascotas,

            "gorras": generar_items("gorra", 50),
            "gafas": generar_items("gafas", 60),
            "fondos": generar_items("fondo", 70),
            "marcos": generar_items("marco", 80),
            "accesorios": generar_items("accesorio", 40)
        }

        await MascotaModel.crear_tienda(tienda_documento)

        return {
            "mensaje": "Tienda creada correctamente"
        }
    
    @staticmethod
    async def get_tienda_mascotas(current_user: dict):

        user_id = ObjectId(current_user["_id"])

        tienda = await MascotaModel.get_tienda()

        if not tienda:
            raise HTTPException(
                status_code=404,
                detail="La tienda no está inicializada"
            )

        mascotas_usuario = await MascotaModel.get_mascotas_usuario(user_id)

        if not mascotas_usuario:
            raise HTTPException(
                status_code=404,
                detail="El usuario no tiene mascota creada"
            )

        #user = await UserModel.get_gemas(user_id)

        #gemas = user.get("cantidad_gemas", 0)

        mascota_activa_tipo = mascotas_usuario["mascota_activa"]

        mascota_actual = None
        mascotas_compradas = []

        for mascota in mascotas_usuario["mascotas"]:
            mascotas_compradas.append(mascota["tipo"])

            if mascota["tipo"] == mascota_activa_tipo:
                mascota_actual = mascota

        mascotas_tienda = []

        for mascota in tienda["mascotas"]:

            comprado = mascota["id"] in mascotas_compradas
            equipado = mascota["id"] == mascota_activa_tipo

            mascotas_tienda.append({
                "id": mascota["id"],
                "imagen": mascota["imagen"],
                "precio_gemas": mascota["precio_gemas"],
                "comprado": comprado,
                "equipado": equipado
            })

        return {
            "mascota_actual": mascota_actual,
            "mascotas_tienda": mascotas_tienda
        }

    @staticmethod
    async def get_items_categoria(categoria: str, current_user: dict):

        if categoria not in MascotasController.categorias_validas:
            raise HTTPException(
                status_code=400,
                detail="Categoría inválida"
            )

        user_id = ObjectId(current_user["_id"])

        tienda = await MascotaModel.get_tienda()

        if not tienda:
            raise HTTPException(
                status_code=404,
                detail="La tienda no existe"
            )

        mascotas_usuario = await MascotaModel.get_mascotas_usuario(user_id)

        if not mascotas_usuario:
            raise HTTPException(
                status_code=404,
                detail="El usuario no tiene mascota creada"
            )

        inventario = mascotas_usuario["inventario"]

        mascota_activa_tipo = mascotas_usuario["mascota_activa"]

        mascota_activa = None

        for mascota in mascotas_usuario["mascotas"]:
            if mascota["tipo"] == mascota_activa_tipo:
                mascota_activa = mascota
                break

        items = []

        if categoria == "mascotas":

            mascotas_compradas = [m["tipo"] for m in mascotas_usuario["mascotas"]]

            for item in tienda["mascotas"]:

                comprado = item["id"] in mascotas_compradas
                equipado = item["id"] == mascota_activa_tipo

                items.append({
                    "id": item["id"],
                    "imagen": item["imagen"],
                    "precio_gemas": item["precio_gemas"],
                    "comprado": comprado,
                    "equipado": equipado
                })

        else:

            items_catalogo = tienda[categoria]

            items_usuario = inventario.get(categoria, [])

            campo_equipado = f"{categoria[:-1]}_puesto"

            item_equipado = mascota_activa.get(campo_equipado)

            for item in items_catalogo:

                comprado = item["id"] in items_usuario
                equipado = item["id"] == item_equipado

                items.append({
                    "id": item["id"],
                    "imagen": item["imagen"],
                    "precio_gemas": item["precio_gemas"],
                    "comprado": comprado,
                    "equipado": equipado
                })

        return {
            "categoria": categoria,
            "items": items
        }