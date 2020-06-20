from pymongo import MongoClient
from bson.objectid import ObjectId
import json

def inicializar_db ():
    try:
        #client = MongoClient(host='db',port=27017)
        client = MongoClient(host='restaurants-db',port=27017)
        mydb = client["db"]
        return mydb
    except (Exception) as err:
        return err

def listar_restaurantes ():
    res = []
    db = inicializar_db ()
    for x in db.restaurants.find({},{"_id":1,"name":2,"borough":3,"cuisine":4,"address":5}):
        x["id"] = str(x["_id"])
        del x ["_id"]
        res.append (x)
    return res

def listar_restaurantes_tipo (tipo):
    res = []
    db = inicializar_db ()
    for x in db.restaurants.find({"cuisine":{"$regex":tipo}},{"_id":1,"name":2,"borough":3,"cuisine":4,"address":5}):
        x["id"] = str(x["_id"])
        del x ["_id"]
        res.append (x)
    return res

def listar_categorias ():
    res = []
    db = inicializar_db ()
    for x in db.restaurants.distinct("cuisine"):
        res.append (x)
    return res

def agregar_restaurante (item):
    db = inicializar_db ()
    db.restaurants.insert_one(item)

def modificar_restaurante (item):
    db = inicializar_db ()
    db.restaurants.update_one({"_id":ObjectId(item["id"])},{"$set":item})

def eliminar_restaurante (id):
    db = inicializar_db()
    res = db.restaurants.delete_one({"_id":ObjectId(id)})

def obtener_restaurante (id):
    db = inicializar_db()
    res = db.restaurants.find_one({"_id":ObjectId(id)})
    res["id"] = str(res["_id"])
    del res ["_id"]
    return res

def cargar_datos ():
    db = inicializar_db ()
    if db.restaurants.count() == 0:
        with open('restaurants.json') as f:
            file_data = json.load(f)
        db.restaurants.insert_many(file_data)
        with open('restaurants_cdelu.json') as f:
            file_data = json.load(f)
        db.restaurants.insert_many(file_data)
        