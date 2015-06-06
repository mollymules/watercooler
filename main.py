import os
import sys

sys.path.insert(1, os.path.join(os.path.abspath('.'), 'lib'))

from flask import Flask, url_for, render_template
app = Flask(__name__)


@app.route('/')
def index(name=None):
    return render_template('main.html')

@app.route('/search/<searchTerm>')
def api_shows(searchTerm):
    return 'You are searching for ' + searchTerm





if __name__ == '__main__':
    app.run()
    
    
