from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Session = sessionmaker()
Base = declarative_base()

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True) 
    url = Column(String)
    url_with_slug = Column(String)
    type = Column(String)
    date_gmt = Column(String)
    date = Column(String)
    unix_timestamp = Column(String)
    format = Column(String)
    reblog_key = Column(String)
    slug = Column(String)
    state = Column(String)
    is_reblog = Column(String)
    tumblelog = Column(String)
    html_string = Column(String) # not recommended though