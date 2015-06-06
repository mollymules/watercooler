import os
import sys
import urllib
import json
import xml2json
from xml.etree import ElementTree as ET

sys.path.insert(1, os.path.join(os.path.abspath('.'), 'lib'))

from flask import Flask, url_for, render_template
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

def get_show(id):
    requestURL = 'http://services.tvrage.com/feeds/full_show_info.php?sid=' + id
    root = ET.parse(urllib.urlopen(requestURL)).getroot()
    return xml2json.xml2json(ET.tostring(root),make_options(True))

@app.route('/show/<id>', methods=['GET','POST'])
def api_show(id):
    show = get_show(id);
    if request.method == 'Get':
        return show
    else:
        dict = jsons.loads(show);
        s = Show(name=dict['name'],
             id = dict['id'],
             image=dict['image'])
        s.put()
    
    

if __name__ == '__main__':
    app.run()
    
    
