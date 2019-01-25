from sqlalchemy import Column, Integer, String, UnicodeText, Unicode, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Session = sessionmaker()
Base = declarative_base()

class Post(Base):
    __tablename__ = 'posts'

    id = Column(String, primary_key=True) 
    url = Column(String)
    url_with_slug = Column(Unicode)
    type = Column(String)
    date_gmt = Column(String)
    date = Column(DateTime)
    unix_timestamp = Column(String)
    format = Column(String)
    reblog_key = Column(String)
    slug = Column(Unicode)
    state = Column(String)
    is_reblog = Column(String)
    tumblelog = Column(String)
    html_string = Column(UnicodeText) # not recommended though

    direct_video = Column(String)