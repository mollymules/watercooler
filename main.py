import os
import sys
import urllib
import json
import xml2json
import models
from xml.etree import ElementTree as ET
from google.appengine.ext import db

sys.path.insert(1, os.path.join(os.path.abspath('.'), 'lib'))

from flask import Flask, url_for, render_template, request, jsonify
app = Flask(__name__)

class Options(object):
    pretty = False

def make_options(pretty):
    options = Options()
    options.pretty = pretty
    return options



@app.route('/')
def index(name=None):
    return render_template('main.html')

@app.route('/search/<searchTerm>')
def api_search(searchTerm):
    requestURL = 'http://services.tvrage.com/feeds/search.php?show=' + searchTerm 
    root = ET.parse(urllib.urlopen(requestURL)).getroot()

    return xml2json.xml2json(ET.tostring(root),make_options(True))

@app.route('/getShows')
def get_all_shows():
    return ''

def get_show(id):
    requestURL = 'http://services.tvrage.com/feeds/full_show_info.php?sid=' + id
    root = ET.parse(urllib.urlopen(requestURL)).getroot()
    return xml2json.xml2json(ET.tostring(root),make_options(True))

@app.route('/show/<id>', methods=['GET','POST'])
def api_show(id):
    if request.method == 'GET':
        q = db.Query(models.Show)
        q.filter('id =', id)
        s = q.get()
        return jsonify(name=s.name, id=s.id, image=s.image)
    else:
        show = get_show(id);
        dict = json.loads(show)['Show'];
        s = models.Show(name=dict['name'],
             id = id,
             image=dict['image'])
        s.put()
        return jsonify(name=s.name, id=s.id, image=s.image)
    
    

if __name__ == '__main__':
    app.run()
    
    
