# Python standard libraries
import cmd
from contextlib import redirect_stdout
import json
import os
import sys
from typing_extensions import reveal_type

#FinViz Imports
from finviz.screener import Screener
import finviz

#Alpaca Imports
import alpaca_trade_api as tradeapi


# the mock-0.3.1 dir contains testcase.py, testutils.py & mock.py
sys.path.append('/Users/d/Desktop/TradingBot/Database')
from DBAdapter import *



# Third-party libraries
from flask import Flask, jsonify, request, make_response
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
    incomingName = request.json["name"]
    incomingKey = request.json["apiKey"]
    incomingSecret = request.json["secretKey"]
    
    retDict = db.isUserPresent(incomingName)
    if retDict == None:
        #no entry exists, make entry
        db.insertUser(incomingName, incomingKey , incomingSecret)
        return make_response(jsonify("Success Sign-Up"),201) #successful sign-up
    elif (retDict["apiKey"] == incomingKey and retDict["secretKey"] == incomingSecret):
        return make_response(jsonify("Success Login") ,200) #successful login
    else:
        return make_response(jsonify("Wrong Info Provided."),406) #wrong info provided    
    
@app.route("/api/create", methods = ['POST'])
def createBot():
    incomingKey = request.json["apiKey"]
    incomingSecret = request.json["secretKey"]
    stockSym = request.json["stockSym"]
    botName = request.json["botName"]
    buyCond = request.json["buy_condition"]
    sellCond = request.json["sell_condition"]
    createDate = request.json["creation_date"]
    isRunning = request.json["isRunning"]
    
    hasBot = db.isBotPresent(botName)
    
    if(hasBot == None):
        #create bot in bot table
        db.addBot(botName, stockSym, sellCond, buyCond)
        #get user entry dict
        retDict = db.getUser(incomingKey, incomingSecret)
        #add relationship between current user and bot created
        db.addRelationship(retDict["name"], botName)
        return make_response(jsonify("Success", 200))
    else: 
        return make_response(jsonify("Wrong Info Provided"),406)

@app.route( "/api/edit", methods = ['PUT'])
def editBot():
    botName = request.json["botName"]
    retVal = db.isBotPresent(botName)
    if(retVal == None):
        return make_response(jsonify("Wrong Info Provided"), 406)
    else: 
        #change bot 
        return make_response(jsonify("Success"), 200)
    
@app.route( "/api/pause", methods = ['PUT'])
def pause():
    botName = request.json("botName")
    user = request.json("name")
    retVal = db.isBotPresent(botName)
    if(retVal == None):
        return make_response(jsonify("Wrong Info Provided"), 406)
    else:
        #do some thing with DB
        curBotActivity = db.getBotStatus(botName)
        if(curBotActivity == False):
            db.setActive(user, botName)
        else:
            db.setInactive(user, botName)
        return make_response(jsonify("Success"), 200)
    
@app.route( "/api/delete", methods = ['POST'])
def removeBot():
    botName = request.json("botName")
    retVal = db.isBotPresent(botName)
    if(retVal == None):
        return make_response(jsonify("Wrong Info Provided"), 406)
    else:
        #do some thing with DB
        return make_response(jsonify("Success"), 200)

@app.route( "/api/getbots", methods = ['GET'])
def listBots():
    retList = db.getUserBots()
    if retList == None:
        return []
    else: 
        return jsonify(retList)
        #parse retList to make list of bot names
        
@app.route( "/api/detail", methods = ['GET'])
def finVizSymbolData():
    symbol = 'MSFT' #example should get specific symbol 
    retJson = finviz.get_stock(symbol)
    print(retJson) #should be json info
    return retJson

@app.route( "/api/portfolio", methods = ['GET'])
def alpacaHistory():
    skey = "" #need to get key from DB
    apiKey = "" #need to get apiKey from DB
    alpacaApiEndPoint = "https://api.alpaca.markets/"
    api = tradeapi.REST(apiKey,skey)
    api.get_portfolio_history()
    return api
    
# @app.route("/api/toggleBotPause", methods = ['POST'])
# def toggleBotPause():
#update bot field in DB

# if __name__ == '__main__':
#     context = ('server.crt', 'server.key')#certificate and key files
#     app.run(debug=True, ssl_context=context)

# @app.route("/home", methods = ['POST'])