import sqlalchemy
from sqlalchemy.orm import load_only
from flask import Flask, request, jsonify, send_from_directory
from flask_socketio import SocketIO
from flask_cors import CORS
from model import Post
from db_engine import engine, Session

app_name = "private_tumblr"

app = Flask(app_name, static_url_path="/")
CORS(app)

@app.route('/')
@app.route('/<path:subpath>')
def index(subpath=None):
    if subpath is None:
        return send_from_directory('ui/build/default/', 'index.html')
    else:
        return send_from_directory('ui/build/default', subpath)

@app.route('/posts')
def get_posts():
    session = Session()
    
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('page_size', 5))
    
    # Query
    _results = session.query(Post) \
    .order_by(Post.date.desc()) \
    .options(load_only("id", "date", "html_string", "type")) \
    .limit(page_size) \
    .offset(page_size * (page - 1))

    _total_count = session.query(Post).count()

    # Data massage
    results = {
        "total_count": _total_count,
        "page": page,
        "page_size": page_size,
        "data": [{
        "id": r.id,
        "date": r.date,
        "type": r.type,
        "html_string": r.html_string
    } for r in _results ]}

    return jsonify(results)
