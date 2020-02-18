import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

data = []


def initialize():
    if (not len(firebase_admin._apps)):
        cred = credentials.Certificate('serviceAccount.json')
        firebase_admin.initialize_app(cred)

    db = firestore.client()

    users_ref = db.collection(u'event1')
    docs = users_ref.stream()

    for doc in docs:
        data.append(doc.to_dict())


initialize()
