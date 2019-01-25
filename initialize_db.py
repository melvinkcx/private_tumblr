import xml.etree.ElementTree as ET 
from dateutil import parser as datetime_parser
from model import Post
from db_engine import engine, Session

# Step 1: Start transaction
session = Session()

# Step 2: Read all post details
add_posts = [] # Posts to be added into DB
with open('./data/posts.xml', 'r') as f:
    t = ET.parse(f)
    posts = t.find('posts')
    for p in posts: 
        post_attr = p.items()
        post_attr = map(lambda x: (x[0].replace('-', '_'), x[1]), post_attr)

        # Filter invalid/unwanted attributes
        _valid_attr = Post.__dict__.keys()
        post_attr = filter(lambda x: x if x[0] in _valid_attr else None, post_attr)

        post_attr = dict(post_attr)

        # Parse datetime
        post_attr['date'] = datetime_parser.parse(post_attr['date']) if post_attr['date'] else None

        add_posts.append(Post(**post_attr))

# Step 3: Read all post content
import glob
import re

htmls = glob.glob('./data/html/*.html')
for p in add_posts:
    post_id = str(p.id)
    results = filter(lambda x: re.search(post_id, x), htmls)
    results = list(results)

    if len(results) >= 1:
        with open(results[0], 'r') as f:
            h = f.read()
            p.html_string = h
    else: 
        pass

# Step 4: Commit transaction
session.add_all(add_posts)
session.commit()

        
