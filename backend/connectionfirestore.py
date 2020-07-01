import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from google.cloud.firestore_v1 import ArrayUnion, ArrayRemove

# Use a service account
cred = credentials.Certificate('key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
docs = db.collection('star_wars').get()

for doc in docs:
    print(doc.id) 

# datos = db.collection('star_wars').stream()

# for dato in star_wars:
#     personaje = dato.to_dict()
#     print(dato.id, personaje['name'])


# datos = db.collection('superheroes').get()
# for hero in datos:
#     hero.reference.delete()


# super_doc = db.collection('superheroes')
# super_doc.add({'nombre': 'Hulk', 'aparicion': 1945})
# super_doc.add({'nombre': 'Captain America', 'aparicion': 1941})
# super_doc.add({'nombre': 'Iron Man', 'aparicion': 1942})
# super_doc.add({'nombre': 'Thor', 'aparicion': 1940})
# super_doc.add({'nombre': 'Balck Widow', 'aparicion': 1943})


#doc = star_wars.document(u'BiiOuqWVrLVwpNxbEUVF').get()
#print(doc)
# doc['nave'] = 'Millennium Falcon'
# doc["peliculas"] = ['V']
# doc['edad'] = 120
# star_wars.document('HeVji5NS1cEm60VrGlQn').update(doc)
# star_wars.document('HeVji5NS1cEm60VrGlQn').update({'peliculas' : ArrayRemove(['II'])})
#
# star_wars.document('HeVji5NS1cEm60VrGlQn').update({'peliculasss': firestore.DELETE_FIELD})

# star_wars.add(doc)
# star_wars.document('8PfKeLfV9RtQf6kN6ZVa').delete()