from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect Database to our Flask App"""
    db.app = app
    db.init_app(app)

"""Models for Cupcake app."""
class Cupcake(db.Model):

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer,
                   primary_key = True,
                   autoincrement = True)

    flavor = db.Column(db.Text,
                       nullable = False)
    
    size = db.Column(db.Text,
                     nullable = False)
    
    rating = db.Column(db.Float,
                       nullable = False)
    
    image = db.Column(db.Text,
                      nullable = False,
                      default = 'https://tinyurl.com/demo-cupcake')

    def __repr__(self):
        return f"<CupCake: {self.flavor} {self.size} {self.rating}>"

    def serialize(self):
        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }

