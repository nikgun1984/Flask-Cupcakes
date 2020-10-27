from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import InputRequired

class AddCakeForm(FlaskForm):
    """Form for adding cake into database"""
    flavor = StringField("Flavor", validators=[InputRequired(message="Cake's Flavor cannot be blank")])
    size = IntegerField("Size", validators=[InputRequired(message="Cake's Size cannot be blank")])
    rating = FloatField("Ratings", validators=[InputRequired(message="Ratings cannot be blank")])
    image = StringField("Image", validators=[InputRequired(message="Cake's Flavor cannot be blank")])
