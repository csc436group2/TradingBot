# Python standard libraries
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_cors import CORS
from flask import Flask, jsonify, request, make_response
import cmd
from contextlib import redirect_stdout
import json
import os
import sys
# from typing_extensions import reveal_type

# FinViz Imports
from finviz.screener import Screener
import finviz

# Alpaca Imports
import alpaca_trade_api as tradeapi
from pandas import DataFrame


# the mock-0.3.1 dir contains testcase.py, testutils.py & mock.py
sys.path.append('../Database')
from DBAdapter import *


# Third-party libraries


# Flask app setup
app = Flask(__name__)
CORS(app, support_credentials=True)

# should connect to Azure/Cloud Server we set up for production
db = DBAdapter("127.0.0.1", "")
db.connect()
# db.initNew()  # may not need to make new

@app.after_request
def set_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response

@app.route("/api/login", methods=['POST'])
def signUploging():
     # fetched name, key and secret
    incomingName = str(request.json["userName"])
    incomingKey = str(request.json["apiKey"])
    incomingSecret = str(request.json["secretKey"])

    retDict = db.isUserPresent(incomingName)
    print(retDict)
    print(db.printTable('user'))
    if retDict == None:
        # no entry exists, make entry
        db.insertUser(incomingName, incomingKey, incomingSecret)
        print(db.printTable('user'))
        # successful sign-up
        return "Success Sign-Up", 201
    elif (retDict[0][2] == incomingKey and retDict[0][3] == incomingSecret):
        return "Success Login", 200  # successful login
    else:
        # wrong info provided
        return "Wrong Info Provided.", 406


@app.route("/create", methods=['POST'])
def createBot():
    incomingKey = str(request.json["apiKey"])
    incomingSecret = str(request.json["secretKey"])
    stockSym = request.json["stockSym"]
    botName = request.json["botName"]
    buyCond = request.json["buy_condition"]
    sellCond = request.json["sell_condition"]
    createDate = request.json["creation_date"]
    isRunning = request.json["isRunning"]
    hasBot = db.isBotPresent(botName)
    if (hasBot == None):
        # create bot in bot table
        db.addBot(botName, stockSym, json.dumps(sellCond), json.dumps(buyCond), createDate)
        # get user entry dict
        retDict = db.getUser(incomingKey, incomingSecret)
        print(retDict)
        # add relationship between current user and bot created
        db.addRelationship(retDict[0][1], botName)
        return "Success", 200
    else:
        return "Wrong Info Provided", 406


@app.route("/edit", methods=['PUT'])
def editBot():
    botName = request.json["botName"]
    retVal = db.isBotPresent(botName)
    if (retVal == None):
        return make_response(jsonify("Wrong Info Provided"), 406)
    else:
        # change bot
        return make_response(jsonify("Success"), 200)


@app.route("/pause", methods=['PUT'])
def pause():
    botName = request.json("botName")
    user = request.json("name")
    retVal = db.isBotPresent(botName)
    if (retVal == None):
        return make_response(jsonify("Wrong Info Provided"), 406)
    else:
        # do some thing with DB
        curBotActivity = db.getBotStatus(botName)
        if (curBotActivity == False):
            db.setActive(user, botName)
        else:
            db.setInactive(user, botName)
        return make_response(jsonify("Success"), 200)

@app.route("/botstatus", methods=['GET'])
def botStatus():
    botName = str(request.args["botName"]) #example should get specific symbol 
    retVal = db.isBotPresent(botName)
    if (retVal == None):
        return make_response(jsonify("Wrong Info Provided"), 406)
    else:
        status = db.isActive(botName)
        return jsonify(status)

@app.route("/delete", methods=['POST'])
def removeBot():
    botName = request.json["botName"]
    botId = request.json["botId"]
    retVal = db.isBotPresent(botName)
    if (retVal == None):
        return make_response(jsonify("Wrong Info Provided"), 406)
    else:
        db.removeBot(botId)
        return make_response(jsonify("Success"), 200)


@app.route("/getbots", methods=['GET'])
def listBots():
    incomingKey = request.args["apiKey"]
    incomingSecret = request.args["secretKey"]
    retList = db.getUserBots(incomingKey, incomingSecret)
    print(retList)
    if len(retList) == 0:
        return jsonify([])
    else: 
        return jsonify(retList)
        
@app.route( "/detail", methods = ['GET'])
def finVizSymbolData():
    symbol = str(request.args["stocksym"]) #example should get specific symbol 
    ret = None
    try: 
        retJson = finviz.get_stock(symbol)
        ret = retJson
    except: 
        print("An error has occured")
    # print(ret) #should be json info
    if ret != None:
        return jsonify(ret)
    else:
        return make_response(jsonify("Not Found"), 404)

@app.route( "/portfolio", methods = ['GET'])
def alpacaHistory():
    # key_id = request.args["apiKey"]
    # secret_key = request.args["secretKey"]
    api = tradeapi.REST(key_id=request.args["key_id"], secret_key=request.args["secret_key"], base_url="https://paper-api.alpaca.markets")
    print(api.get_portfolio_history())
    portfolio = DataFrame.to_json(api.get_portfolio_history().df)
    return make_response(portfolio, 200)

@app.route( "/api/dumpDB", methods = ['GET'])
def dbDumb():
    db.printTable("user")
    return "hello"
    
# @app.route("/api/toggleBotPause", methods = ['POST'])
# def toggleBotPause():
# update bot field in DB

# if __name__ == '__main__':
#     context = ('server.crt', 'server.key')#certificate and key files
#     app.run(debug=True, ssl_context=context)

# @app.route("/home", methods = ['POST'])