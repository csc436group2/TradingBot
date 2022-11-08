import mysql.connector as connector
import time
import os
import json
import shutil
from os.path import exists

def createDB():
    db = connector.connect(
            host= "",
            user="root",
            passwd="",
            database="ubt"
            )
    return db

def createCursor(database):
    cursor = database.cursor()
    cursor.execute("START TRANSACTION")

def checkForBotFile(botID):
    return exists(f"/StoredBots/'{botID}'")
    
def getAllUSRS(cursor,db):
    cursor.execute("SELECT * FROM user")
    usrs = cursor.fetchall()
    db.commit()
    return usrs

def watchData():
    db = createDB()
    cursor = createCursor(db)
    while (True):
        usrs = getAllUSRS(cursor,db)
        for usr in usrs:
            secretKey = usr["secretKey"]
            apiKey = usr["apiKey"]
            userId = usr["userId"]
            cursor.execute(f"SELECT * FROM userBot WHERE UserID='{userId}'")
            bots = cursor.fetchall()
            db.commit()
            for b in bots:
                if (b["isActive"]):
                    #bot is active
                    if (checkForBotFile(b['BotID'])):
                        continue
                    cursor.execute(f"SELECT * FROM bot WHERE botID='{b['BotID']}'")
                    bt = cursor.fetchall()
                    db.commit()
                    shutil.copyfile("bot.py", f"/StoredBots/'{b['BotID']}'/bot.py")
                    jsonData = "{\"secrete_key\":" + secretKey +",\"api_key\":"+apiKey+",\"stock_sym\":"+ bt["stockSymbol"] +",\"buy_condition\":"+ bt["buyConditions"] +",\"sell_condition\":"+ bt["sellConditions"] + "}"
                    f = open(f"/StoredBots/'{b['BotID']}'/config.json","a")
                    f.write(jsonData)
                    exec(open(f"/StoredBots/'{b['BotID']}'/bot.py").read())
                else:
                    #bot is inactive
                    if (checkForBotFile(b['BotID'])):
                        os.remove(f"/StoredBots/'{b['BotID']}'/bot.py")
                        os.remove(f"/StoredBots/'{b['BotID']}'/config.json")
        time.sleep(500)