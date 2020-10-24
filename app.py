from flask import Flask, request, jsonify, render_template
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)

@app.route('/api/cupcakes')
def list_cupcakes():
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake = cupcake.serialize())

@app.route('/api/cupcakes', methods=["POST"])
def submit_cupcake():
    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"]
    new_cupcake = Cupcake(flavor=flavor, size=size,rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()
    serialized = new_cupcake.serialize()
    return (jsonify(cupcake=serialized), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["PATCH"])
def update_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = cupcake.json.get('flavor', cupcake.flavor)
    cupcake.size = cupcake.json.get('size', cupcake.size)
    cupcake.rating = cupcake.json.get('rating',cupcake.rating)
    cupcake.image = cupcake.json.get('image',cupcake.image)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["DELETE"])
def delete_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="Deleted")






