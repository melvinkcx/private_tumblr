import sqlalchemy
from sqlalchemy.orm import load_only
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from model import Post
from db_engine import engine, Session

app_name = "private_tumblr"

app = Flask(app_name)

@app.route('/')
def index():
    # TODO This should return React page
    return 'home page'

@app.route('/posts')
def get_posts():
    session = Session()
    
    page = request.args.get('page', 1)
    page_size = request.args.get('page_size', 5)
    
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
