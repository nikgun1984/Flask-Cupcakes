from flask import Flask, request, jsonify, render_template, flash
from models import db, connect_db, Cupcake
from forms import AddCakeForm

app = Flask(__name__)

"""Configuarions"""
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)

@app.route('/', methods=["GET","POST"])
def add_cupcake():
    """will display form and list of cakes if available"""
    form = AddCakeForm()
    cakes = Cupcake.query.all()
    if form.validate_on_submit():
        flavor = form.flavor.data
        size = form.size.data
        rating = form.rating.data
        image = form.image.data

        cake = Cake(flavor=flavor,size=size,rating=rating,image=image)
        db.session.add(cake)
        db.session.commit()
        flash(f'Created {flavor} {size}', "success")
        return redirect('/')
    return render_template('index.html',form=form, cakes=cakes)

@app.route('/api/cupcakes')
def list_cupcakes():
    """Fetch all items and view their info"""
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """Return one of the selected items to view its info"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake = cupcake.serialize())

@app.route('/api/cupcakes/search')
def query_data():
    query_string = request.args["search"]
    query = Cupcake.query.filter(Cupcake.flavor.ilike(f'%{query_string}%'))
    cupcakes = [cupcake.serialize() for cupcake in query]
    return jsonify(cupcakes=cupcakes)


@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    """Create a new cupcake and submit it to the database"""
    # import pdb
    # pdb.set_trace()
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
    """Update entry in the database"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating',cupcake.rating)
    cupcake.image = request.json.get('image',cupcake.image)
    db.session.commit()
    flash('Cake was updated',"success")
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """Delete cupcake from the database"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="Deleted")






