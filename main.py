import os
import sys
import urllib
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
def api_shows(searchTerm):
    requestURL = 'http://services.tvrage.com/feeds/search.php?show=' + searchTerm 
    root = ET.parse(urllib.urlopen(requestURL)).getroot()

    return xml2json.xml2json(ET.tostring(root),make_options(True))




if __name__ == '__main__':
    app.run()
    
    
