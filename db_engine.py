from sqlalchemy import create_engine
from model import Session, Base

engine = create_engine('sqlite:///./data/data.db', echo=True)

Base.metadata.create_all(engine)
Session.configure(bind=engine)