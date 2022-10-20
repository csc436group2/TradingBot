# Python standard libraries
import cmd
from contextlib import redirect_stdout
import json
import os
import sys

# the mock-0.3.1 dir contains testcase.py, testutils.py & mock.py
sys.path.append('/Users/d/Desktop/TradingBot/Database')
from DBAdapter import *



# Third-party libraries
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)


# Flask app setup
app = Flask(__name__)
CORS(app)

db = DBAdapter("127.0.0.1", "")
db.connect()
db.initNew()


# app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)

# User session management setup
# https://flask-login.readthedocs.io/en/latest
# login_manager = LoginManager()
# login_manager.init_app(app)


# Flask-Login helper to retrieve a user from our db
# @login_manager.user_loader
# def load_user(user_id):
    # DBAdapter.getUser(userId)

@app.route( "/api/login", methods = ['POST'])
def signUploging(): 
     #fetched name, key and secret
    incomingName= request.json["name"]
    incomingKey = request.json["apiKey"]
    incomingSecret = request.json["secretKey"]
    
    #set up DB queries
    selectQuery = "SELECT * FROM users WHERE name=%s AND secretKey=%s"
    selectID = "SELECT * FROM users WHERE name=%s"
    
    cmd.execute(selectQuery, (incomingName, incomingSecret))
    if cmd.fetchall():
        return 
    
    
    # isUser = DBAdapter.getUser(uniqID)
    #if check on this if user exits dont insert
    db.insertUser(name,key , secret)
    #db.printTable("user")
    return ""


#should return an ID of the user, then make make another end point called log in.
# create an endpoint called login 
    # grab the urser name and key from frontend
    # query db for that user and key
    # create a session toekn for that user
    # return token to front end

    
@app.route("/api/createBot", methods = ['POST'])
def createBot():
    return '<div>TODO WHAT DOES A BOT LOOK LIKE?</div>'


@app.route("/api/toggleBotPause", methods = ['POST'])
def toggleBotPause():
#update bot field in DB

# if __name__ == '__main__':
#     context = ('server.crt', 'server.key')#certificate and key files
#     app.run(debug=True, ssl_context=context)

# @app.route("/home", methods = ['POST'])
