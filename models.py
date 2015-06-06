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