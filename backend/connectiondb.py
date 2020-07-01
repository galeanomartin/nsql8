import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1 import ArrayUnion,ArrayRemove
import json

cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def listar_restaurantes ():
    res = []
    restaurants = db.collection(u'restaurants').stream()
    for doc in restaurants:
        element = doc.to_dict()
        element["id"] = doc.id
        res.append (element)
    return res

def listar_restaurantes_tipo (tipo):
    res = []
    restaurants = db.collection(u'restaurants').where(u'cuisine',u'==',tipo).stream()
    for doc in restaurants:
        element = doc.to_dict()
        element["id"] = doc.id
        res.append (element)
    return res

def listar_categorias ():
    res = []
    restaurants = db.collection(u'restaurants').stream()
    for doc in restaurants:
        element = doc.to_dict()
        if (element["cuisine"] not in res):
            res.append (element["cuisine"])
    return res

def agregar_restaurante (item):
    restaurants = db.collection(u'restaurants')
    restaurants.add(item)

def modificar_restaurante (item):
    id = item["id"]
    del item ["id"]
    restaurants = db.collection(u'restaurants')
    restaurants.document(id).update(item)

def eliminar_restaurante (id):
    restaurants = db.collection(u'restaurants')
    restaurants.document(id).delete()

def obtener_restaurante (id):
    restaurants = db.collection(u'restaurants')
    doc = restaurants.document(id).get()
    res = doc.to_dict()
    res["id"] = doc.id
    return res

def cargar_datos ():
    restaurants = db.collection(u'restaurants')
    with open('restaurants.json') as f:
        file_data = json.load(f)
        for i in range (0,450):
            restaurants.add(file_data[i])
    with open('restaurants_cdelu.json') as f:
        file_data = json.load(f)
        for i in range (0,18):
            restaurants.add(file_data[i])  