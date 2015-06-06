import datetime
from google.appengine.ext import db
from google.appengine.api import users

class Person(db.Model):
    id = db.StringProperty(required=True)
    name = db.StringProperty(required=True)
    username = db.StringProperty(required=True)
    watched = db.BooleanProperty()
    picture = db.StringProperty()

    def serialize(self):
        return {
            'username': self.username, 
            'name': self.name, 
            'id': self.id,
            'picture': self.picture,
            'watched': self.watched
        }

class Show(db.Model):
    name = db.StringProperty(required=True)
    id = db.StringProperty(required=True)
    image = db.StringProperty()

    def serialize(self):
        return {
            'name': self.name, 
            'id': self.id,
            'image': self.image,
        }
        
class Episode(db.Model):
    epnum = db.StringProperty(required=True)
    seasonnum = db.StringProperty(required=True)
    title = db.StringProperty(required=True)
    showid = db.StringProperty(required=True)
    screencap = db.StringProperty()

    def serialize(self):
        return {
            'epnum': self.epnum, 
            'seasonnum': self.seasonnum,
            'title': self.title,
            'showid': self.showid,
            'screencap': self.screencap
        }        