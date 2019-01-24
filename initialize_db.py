import xml.etree.ElementTree as ET 
from sqlalchemy import create_engine
from model import Post, Session, Base

engine = create_engine('sqlite:///./data.db', echo=True)
Base.metadata.create_all(engine)
Session.configure(bind=engine)

session = Session()

# Step 1: Read all post details
with open('./posts.xml', 'r') as f:
    t = ET.parse(f)
    posts = t.find('posts')
    add_posts = [] # Posts to be added into DB
    for p in posts: 
        post_attr = p.items()
        post_attr = map(lambda x: (x[0].replace('-', '_'), x[1]), post_attr)
        post = Post(**dict(post_attr))
        add_posts.append(post)

    session.add_all(add_posts)
    session.commit()

# Step 2: Read all post content
