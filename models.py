import datetime
from google.appengine.ext import db
from google.appengine.api import users


class Show(db.Model):
    name = db.StringProperty(required=True)
    id = db.StringProperty(required=True)
    image = db.StringProperty(required=True)

    def serialize(self):
        return {
            'name': self.name, 
            'id': self.id,
            'image': self.image,
        }