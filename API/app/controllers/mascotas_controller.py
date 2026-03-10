from zoneinfo import ZoneInfo
from bson import ObjectId
from fastapi import HTTPException
from datetime import datetime
from app.models.mascota_model import MascotaModel
from app.models.user_model import UserModel
from app.core.database import db

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

                    "gafa_puesto": None,
                    "gorra_puesto": None,
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
    
    @staticmethod
    async def comprar_o_equipar(data, current_user):

        user_id = ObjectId(current_user["_id"])

        tienda = await MascotaModel.get_tienda()
        usuario_mascotas = await MascotaModel.get_mascotas_usuario(user_id)
        #user = await UserModel.get_user(user_id)

        if not tienda or not usuario_mascotas:
            raise HTTPException(status_code=404, detail="Datos no encontrados")

        gemas_usuario = current_user.get("gemas_acumuladas", 0)
        original_gemas = gemas_usuario  # preserve to know if we need to update later
        #print("Gemas usuario:", gemas_usuario)

        #return{200: "OK"}

        categoria = data.categoria
        item_id = data.item_id

        # -------- Search item on the shop --------

        if categoria == "mascotas":
            try:
                items_catalogo = tienda["mascotas"]
            except KeyError:
                raise HTTPException(status_code=400, detail="Categoría inválida")
        else:
            try:
                items_catalogo = tienda[categoria]
            except KeyError:
                raise HTTPException(status_code=400, detail="Categoría inválida")

        item_catalogo = next(
            (i for i in items_catalogo if i["id"] == item_id),
            None
        )

        if not item_catalogo:
            raise HTTPException(status_code=404, detail="Artículo no encontrado")

        precio = item_catalogo["precio_gemas"]

        mascota_activa_tipo = usuario_mascotas["mascota_activa"]

        mascota_activa = None

        for mascota in usuario_mascotas["mascotas"]:
            if mascota["tipo"] == mascota_activa_tipo:
                mascota_activa = mascota
                break

        inventario = usuario_mascotas["inventario"]

        # --------- Pep ---------

        if categoria == "mascotas":

            mascotas_usuario = [m["tipo"] for m in usuario_mascotas["mascotas"]]

            if item_id not in mascotas_usuario:

                if gemas_usuario < precio:
                    raise HTTPException(status_code=400, detail="No tienes gemas suficientes")

                if not data.nombre_mascota:
                    raise HTTPException(status_code=400, detail="Debes enviar nombre para la mascota")

                nueva_mascota = {
                    "tipo": item_id,
                    "nombre": data.nombre_mascota,
                    "estado": "feliz",
                    "gafa_puesto": None,
                    "gorra_puesto": None,
                    "marco_puesto": None,
                    "fondo_puesto": None,
                    "accesorio_puesto": None
                }

                usuario_mascotas["mascotas"].append(nueva_mascota)

                gemas_usuario -= precio

                #await UserModel.actualizar_gemas(user_id, gemas_usuario)

            usuario_mascotas["mascota_activa"] = item_id

        # --------- Item ---------

        else:

            items_usuario = inventario.get(categoria, [])

            if item_id not in items_usuario:

                if gemas_usuario < precio:
                    raise HTTPException(status_code=400, detail="No tienes gemas suficientes")

                inventario[categoria].append(item_id)

                gemas_usuario -= precio

                #await UserModel.actualizar_gemas(user_id, gemas_usuario)

            campo = f"{categoria[:-1]}_puesto"

            if mascota_activa[campo] == item_id:
                mascota_activa[campo] = None
            else:
                mascota_activa[campo] = item_id

        # Session rollback

        try:
            session = await db.client.start_session()
            async with session:
                async with session.start_transaction():
                    # solo actualizamos gemas si hubo un gasto real
                    if gemas_usuario != original_gemas:
                        await UserModel.actualizar_gemas(user_id, gemas_usuario, session=session)

                    await MascotaModel.actualizar_mascota_usuario(
                        user_id,
                        {
                            "mascotas": usuario_mascotas["mascotas"],
                            "inventario": inventario,
                            "mascota_activa": usuario_mascotas["mascota_activa"]
                        },
                        session=session,
                    )
        except Exception as e:
            # Si algo falla durante la transacción, FastAPI elevará un HTTPException
            # y no habrá cambios persistidos.
            raise HTTPException(status_code=500, detail="Error aplicando el artículo")

        # buscar nuevamente mascota activa
        mascota_final = next(
            (m for m in usuario_mascotas["mascotas"] if m["tipo"] == usuario_mascotas["mascota_activa"]),
            None
        )

        return {
            "mensaje": "Artículo aplicado correctamente",
            "mascota_actual": mascota_final,
            "gemas_restantes": gemas_usuario
        }