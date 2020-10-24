# Flask-Cupcakes

### RESTful API Cupcake recepe App    
#### Backend Technologies used:  
* Python(Flask framework, SQLAlchemy) for communicating with database and manipulating the data
* PostgreSQL RDBMS  

#### Frontend Tecnologies:
* Javascript(Axios,jQuery libraries) for sending requests from clientside to   server

Projects also include Integration Tests for all the routes and manipulate separate database. 

**Installations instructions**: python3 install -r requirements.txt  
**Bugs avoidance**: make sure add these add-ons to your settings.json:  
"python.pythonPath": "venv/bin/python",  
    "python.linting.pylintArgs": ["--load-plugins", "pylint-flask"],  
    "code-runner.executorMap": {  
        "python": "python3 -u"  
    }