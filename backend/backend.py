# Standard / Flask Libraries
from flask_cors import CORS
from flask import Flask, jsonify, request, make_response
import json
import sys

# FinViz Imports
import finviz

# Alpaca Imports
import alpaca_trade_api as tradeapi
from pandas import DataFrame

# the mock-0.3.1 dir contains testcase.py, testutils.py & mock.py
sys.path.append('../Database')
from DBAdapter import *

# Flask app setup
app = Flask(__name__)
CORS(app, support_credentials=True)

db = DBAdapter("127.0.0.1", "")
db.connect()

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


@app.route("/pause", methods=['POST'])
def pause():
    incomingKey = str(request.json["apiKey"])
    incomingSecret = str(request.json["secretKey"])
    botId = str(request.json["botId"])
    botName = str(request.json["botName"])
    retVal = db.isBotPresent(botName)
    if (retVal == None):
        return make_response(jsonify("Wrong Info Provided"), 406)
    else:
        active = db.isActive(incomingKey, incomingSecret, botId)
        if (active):
            db.setInactive(incomingKey, incomingSecret, botId)
        else:
            db.setActive(incomingKey, incomingSecret, botId)
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
    symbol = str(request.args["stocksym"]) 
    ret = None
    try: 
        retJson = finviz.get_stock(symbol)
        ret = retJson
    except: 
        print("An error has occured")
    if ret != None:
        return jsonify(ret)
    else:
        return make_response(jsonify("Not Found"), 404)

@app.route( "/portfolio", methods = ['GET'])
def alpacaHistory():
    apiKey = request.args["key_id"]
    secretKey = request.args["secret_key"]
    url = "https://paper-api.alpaca.markets"
    api = tradeapi.REST(key_id=apiKey, secret_key=secretKey, base_url=url)
    print(api.get_portfolio_history())
    portfolio = DataFrame.to_json(api.get_portfolio_history().df)
    return make_response(portfolio, 200)

@app.route( "/api/dumpDB", methods = ['GET'])
def dbDumb():
    db.printTable("user")
    return "hello"
