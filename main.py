from flask import Flask, request
from flask_socketio import SocketIO

app_name = "private_tumblr"

app = Flask(app_name)

@app.route('/')
def index():
    # TODO This should return React page
    return 'home page'

@app.route('/posts')
def get_posts():
    if request.method == 'GET':
        return ''
