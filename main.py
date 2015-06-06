import os
import sys
import urllib
from xml.etree import ElementTree as ET

sys.path.insert(1, os.path.join(os.path.abspath('.'), 'lib'))

from flask import Flask, url_for, render_template
app = Flask(__name__)


@app.route('/')
def index(name=None):
    return render_template('main.html')

@app.route('/search/<searchTerm>')
def api_shows(searchTerm):
    requestURL = 'http://services.tvrage.com/feeds/search.php?show=' + searchTerm 
    return ET.tostring(ET.parse(urllib.urlopen(requestURL)).getroot())



    




if __name__ == '__main__':
    app.run()
    
    
