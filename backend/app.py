from flask import Flask
from flask import jsonify, request, redirect, url_for,send_file
import json
from connectiondb import cargar_datos,listar_restaurantes,agregar_restaurante,modificar_restaurante,eliminar_restaurante,obtener_restaurante,listar_categorias,listar_restaurantes_tipo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/cargar_db', methods=['GET'])
@app.before_first_request
def cargar_db():
    try:
        cargar_datos ()
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/', methods=['GET'])
def listall_restaurants():
    try:
        return jsonify (listar_restaurantes())
    except (Exception) as err:
        return str(err), 500

@app.route('/list-type/<tipo>', methods=['GET'])
def list_type(tipo):
    try:
        return jsonify (listar_restaurantes_tipo(tipo))
    except (Exception) as err:
        return str(err), 500

@app.route('/list-categories', methods=['GET'])
def list_categories():
    try:
        return jsonify (listar_categorias())
    except (Exception) as err:
        return str(err), 500

@app.route('/add', methods=['POST'])
def add_restaurant():
    try:
        nuevo = {
            "name":request.json["name"],
            "cuisine":request.json["cuisine"],
            "borough":request.json["borough"],
            "address":request.json["address"],
            "grades":request.json["grades"]
        }
        agregar_restaurante (nuevo)
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/modify', methods=['POST'])
def modify_restaurant():
    try:
        nuevo = {
            "id":request.json["id"],
            "name":request.json["name"],
            "cuisine":request.json["cuisine"],
            "borough":request.json["borough"],
            "address":request.json["address"],
            "grades":request.json["grades"]
        }
        modificar_restaurante (nuevo)
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/delete', methods=['POST'])
def delete_restaurant():
    try:
        id = request.json["id"]
        eliminar_restaurante (id)
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/get', methods=['POST'])
def get_restaurant():
    try:
        id = request.json["id"]
        res = obtener_restaurante (id)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

if __name__ == '__main__':
    app.run(host='backend', port='5000', debug=True)