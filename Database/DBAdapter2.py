import mysql.connector as connector

class DBAdapter2:
    host : str
    passWord: str

    def __init__(self, host : str, passWord : str):
        self.host = host
        self.password = passWord

    def connect(self):
            self.db = connector.connect(
                host= self.host,
                user="root",
                passwd=self.password,
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

            userTable = "CREATE TABLE user( userId int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), apiKey VARCHAR(256), secretKey VARCHAR(50))"
            botTable = "CREATE TABLE bot (botId int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), stockSymbol VARCHAR(20), sellConditions VARCHAR(256), buyConditions VARCHAR(256), added VARCHAR(10))"
            userBotTable = "CREATE TABLE userBot (relId int PRIMARY KEY AUTO_INCREMENT, UserID int, BotID int, isActive BOOL )"

            self.cursor.execute(userTable)
            self.cursor.execute(botTable)
            self.cursor.execute(userBotTable)

    def insertUser(self, name: str, apiKey: str, secretKey: str) -> None:
            # do not add the same user
            if self.isUserPresent(name) is not None:
                return
            sql = "INSERT INTO user (name, apiKey, secretKey) VALUES (%s, %s, %s)"
            val = (name, apiKey, secretKey)
            self.cursor.execute(sql, val)

    def isUserPresent(self, name: str):
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
            if self.isBotPresent(name) is not None:
                return
            sql = "INSERT INTO bot (name, stockSymbol, sellConditions, buyConditions, added) VALUES (%s, %s, %s, %s, CURDATE())"
            val = (name, stockSymbol, sellConditions, buyConditions)
            self.cursor.execute(sql, val)

    def addRelationship(self, userName, botName):
        self.cursor.execute(f""" INSERT INTO userbot (userID, botID)
                            SELECT u.userID, b.botID 
                            FROM user u, bot b
                            WHERE u.name = '{userName}'
                            AND b.name = '{botName}'
                            """)
    def printTable(self, tableName):
        self.cursor.execute(f"SELECT * FROM {tableName}")
        res = self.cursor.fetchall()
        if res is None:
            return
        for x in res:
            print(x)