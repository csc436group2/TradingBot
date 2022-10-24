from getpass import getuser
import mysql.connector as connector

"""
File: DBAdapter.py
Author: Adam Mekhail
Purpose: To create a database adapter which will handle all SQL
Queries for adding users, bots, and relationships between the user and bots
as well as set the bots as active or not.
"""
class DBAdapter:

    host : str
    passwrd : str

    
    def __init__(self, host, passWrd):
        """
        Starts the database adapter by taking the host and password
        host: the host address
        passWrd: the password for the DB
        """
        self.host = host
        self.passwrd = passWrd
    
    def connect(self):
        """
        Connects to the db with the provided credentials
        """
        self.db = connector.connect(
            host= self.host,
            user="root",
            passwd=self.passwrd,
            database="ubt"
            )
        self.cursor = self.db.cursor()

    def initNew(self):
        """
        Creates the db if isn't created already or resets the DB for testing
        purposes
        """
        # if exists, drop
        self.cursor.execute("DROP DATABASE IF EXISTS ubt")
        # create db
        self.cursor.execute("create database ubt")

        self.cursor.execute("use ubt")

        userTable = "CREATE TABLE user( id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), apiKey VARCHAR(256), secretKey VARCHAR(50))"
        botTable = "CREATE TABLE bot (id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), stockSymbol VARCHAR(20), sellConditions VARCHAR(256), buyConditions VARCHAR(256), added DATE)"
        userBotTable = "CREATE TABLE userBot (id int PRIMARY KEY AUTO_INCREMENT, UserID int, BotID int, isActive BOOL )"

        self.cursor.execute(userTable)
        self.cursor.execute(botTable)
        self.cursor.execute(userBotTable)

    def insertUser(self, name: str, apiKey: str, secretKey: str) -> None:
        """
        Inserts a user into the DB their api key and secret key
        name: the user name
        apikey: the api key
        secretKey: the secret key
        """
        # do not add the same user
        if self.isUserPresent(name) is not None:
            return
        sql = "INSERT INTO user (name, apiKey, secretKey) VALUES (%s, %s, %s)"
        val = (name, apiKey, secretKey)
        self.cursor.execute(sql, val)
    
    def isUserPresent(self, name: str):
        """
        Checks if the user is present in the DB, if so it returns the entry
        otherwise returns None
        name: The user name
        """
        self.cursor.execute(f"SELECT * FROM user WHERE name='{name}'")
        res = self.cursor.fetchall()
        if res == []:
            return None
        else:
            return res

    def isBotPresent(self, name):
        self.cursor.execute(f"SELECT * FROM bot WHERE name='{name}'")
        res = self.cursor.fetchall()
        if res == []:
            return None
        else:
            return res

    def addBot(self, name, stockSymbol, sellConditions, buyConditions):
        """
        Adds a bot to the db
        name: the name of the bot
        """
        if self.isBotPresent(name) is not None:
            return
        sql = "INSERT INTO bot (name, stockSymbol, sellConditions, buyConditions, added) VALUES (%s, %s, %s, %s, CURDATE())"
        val = (name, stockSymbol, sellConditions, buyConditions)
        self.cursor.execute(sql, val)
    
    def addRelationship(self, userName, botName):
        """
        Associates a user with a bot
        userName: the user
        botName: the bot
        """
        # get userID
        self.cursor.execute(f"SELECT * FROM user WHERE name='{userName}'")
        user = self.cursor.fetchone()
        self.cursor.execute(f"SELECT * FROM bot WHERE name='{botName}'")
        bot = self.cursor.fetchone()
        if user is None or bot is None:
            return
        userID = user[0]
        botID = bot[0]
        sql = "INSERT INTO userbot (UserID, BotID, isActive) values (%s, %s, %s)"
        val = (userID, botID, False)
        self.cursor.execute(sql, val)
    
    def setActive(self, userName, botName):
        """
        Sets a bot active to show that it is running
        userName: The user
        botName: the bot
        """
        self.cursor.execute(f"SELECT id FROM bot WHERE name='{botName}'")
        botID = self.cursor.fetchone()
        self.cursor.execute(f"SELECT id FROM user WHERE name='{userName}'")
        userID = self.cursor.fetchone()
        if userID is None or botID is None:
            return
        self.cursor.execute(f"UPDATE userbot SET isActive = {True} WHERE userID='{userID[0]}' AND botID='{botID[0]}'")

    def setInactive(self, userName, botName):
        """
        Sets a bot inactive to show that it is not running
        userName: The user
        botName: the bot
        """
        self.cursor.execute(f"SELECT id FROM bot WHERE name='{botName}'")
        botID = self.cursor.fetchone()
        self.cursor.execute(f"SELECT id FROM user WHERE name='{userName}'")
        userID = self.cursor.fetchone()
        if userID is None or botID is None:
            return
        self.cursor.execute(f"UPDATE userbot SET isActive = {False} WHERE userID='{userID[0]}' AND botID='{botID[0]}'") 

    def isActive(self, botName):
        if self.isBotPresent(botName) is None:
            return
        self.cursor.execute(f"SELECT id FROM bot WHERE name='{botName}'")
        botID = self.cursor.fetchone()
        self.cursor.execute(f"SELECT isActive FROM userBot WHERE botID='{botID[0]}'")
        isActive = self.cursor.fetchone()
        return bool(isActive[0])

    def getAPIKey(self, userName):
        res = self.isUserPresent(userName)
        if res is None:
            return
        print(res)
        return res[0][2]
    
    def getSecretKey(self, userName):
        res = self.isUserPresent(userName)
        if res is None:
            return
        return res[0][3]

    def getBuyConditions(self, botName):
        res = self.isBotPresent(botName)
        if res is None:
            return
        return res[0][3]
    
    def setBuyConditions(self, botName, newCond):
        self.cursor.execute(f"UPDATE bot SET buyConditions = '{newCond}' WHERE name = '{botName}'")

    def setSellConditions(self, botName, newCond):
        self.cursor.execute(f"UPDATE bot SET sellConditions = '{newCond}' WHERE name = '{botName}'")
    
    def getSellConditions(self, botName):
        res = self.isBotPresent(botName)
        if res is None:
            return
        return res[0][4]
    
    def getStockSymbol(self, botName):
        res = self.isBotPresent(botName)
        if res is None:
            return
        return res[0][2]

    def setStockSymbol(self, botName, newCond):
        self.cursor.execute(f"UPDATE bot SET stockSymbol = '{newCond}' WHERE name = '{botName}'")
    
    def getUser(self, apiKey: str, secretKey: str):
        sql = f"""  SELECT *
                    FROM user
                    WHERE user.apiKey = '{apiKey}'
                    AND user.secretKey = '{secretKey}'"""
        self.cursor.execute(sql)
        res = self.cursor.fetchall()
        return res

    def getUserBots(self, apikey : str, secreykey : str):
        res = self.getUser(apikey, secreykey)
        if res is None:
            return
        res = res[0][0]
        sql = f"""  SELECT bot.id, bot.name, bot.stockSymbol, bot.sellConditions, bot.buyConditions
                    FROM bot 
                    INNER JOIN userbot on bot.id = userbot.BotID
                    WHERE UserID = '{res}'
                """
        self.cursor.execute(sql)
        ids = self.cursor.fetchall()
        return ids


    def printTable(self, tableName):
        self.cursor.execute(f"SELECT * FROM {tableName}")
        res = self.cursor.fetchall()
        if res is None:
            return
        for x in res:
            print(x)
