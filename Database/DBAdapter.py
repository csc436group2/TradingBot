import mysql.connector as connector

class DBAdapter:

    host : str
    passwrd : str

    def __init__(self, host, passWrd):
        self.host = host
        self.passwrd = passWrd
    
    def connect(self):
        self.db = connector.connect(
            host= self.host,
            user="root",
            passwd=self.passwrd,
            database="ubt"
            )
        self.cursor = self.db.cursor()

    def initNew(self):
        # if exists, drop
        self.cursor.execute("DROP DATABASE IF EXISTS ubt")
        # create db
        self.cursor.execute("create database ubt")

        self.cursor.execute("use ubt")

        userTable = "CREATE TABLE user( id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), apiKey VARCHAR(256), secretKey VARCHAR(50))"
        botTable = "CREATE TABLE bot (id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50))"
        userBotTable = "CREATE TABLE userBot (id int PRIMARY KEY AUTO_INCREMENT, UserID int, BotID int, isActive BOOL )"

        self.cursor.execute(userTable)
        self.cursor.execute(botTable)
        self.cursor.execute(userBotTable)

    def insertUser(self, name: str, apiKey: str, secretKey: str) -> None:
        sql = "INSERT INTO user (name, apiKey, secretKey) VALUES (%s, %s, %s)"
        val = (name, apiKey, secretKey)
        self.cursor.execute(sql, val)
    
    def addBot(self, name):
        sql = "INSERT INTO bot (name) VALUES (%s)"
        val = (name,)
        self.cursor.execute(sql, val)
    
    def addRelationship(self, userName, botName):
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
        self.cursor.execute(f"SELECT id FROM bot WHERE name='{botName}'")
        botID = self.cursor.fetchone()
        self.cursor.execute(f"SELECT id FROM user WHERE name='{userName}'")
        userID = self.cursor.fetchone()
        if userID is None or botID is None:
            return
        self.cursor.execute(f"UPDATE userbot SET isActive = {True} WHERE userID='{userID[0]}' AND botID='{botID[0]}'")

    def setInactive(self, userName, botName):
        self.cursor.execute(f"SELECT id FROM bot WHERE name='{botName}'")
        botID = self.cursor.fetchone()
        self.cursor.execute(f"SELECT id FROM user WHERE name='{userName}'")
        userID = self.cursor.fetchone()
        if userID is None or botID is None:
            return
        self.cursor.execute(f"UPDATE userbot SET isActive = {False} WHERE userID='{userID[0]}' AND botID='{botID[0]}'") 


    def printTable(self, tableName):
        self.cursor.execute(f"SELECT * FROM {tableName}")
        res = self.cursor.fetchall()
        for x in res:
            print(x)