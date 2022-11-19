import DBAdapter as DBA

def main() -> None:
    # add your password here
    password = ""
    myDBA = DBA.DBAdapter("localhost", password)
    myDBA.connect()
    
    # called once to create db or to reset all the tables
    # comment out to preserve data
    myDBA.initNew()

    myDBA.insertUser("Adam", "API KEY", "SECRET KEY")
    myDBA.insertUser("Adam", "123", "123")
    myDBA.insertUser("Amit", "gd67g12hjw", "324463")
    myDBA.insertUser("Derek", "j35t84uy98r3kj2", "45d4168awd")
    myDBA.insertUser("Nick", "7823u4j289", "hbd54g1rd156es")

    print(myDBA.getUser("7823u4j289", "hbd54g1rd156es"))
    
    print("--- Printing users ---")
    myDBA.printTable("user")

    myDBA.addBot("AdamsBOT", "Test", "Test condition 1, condition 2, condition 3", "buy 1, buy 2", "10/24/22")
    myDBA.addBot("AdamsBOT2", "Test2", "SELL ALL", "BUY NONE", "10/26/22")

    bot = myDBA.isBotPresent("AdamsBOT")
    print(bot)

    print("\n--- Printing bots ---")
    myDBA.printTable("bot")

    myDBA.setBuyConditions(2, "TESTING TESTING")
    myDBA.printTable("bot")
    myDBA.setSellConditions(2, "SELL SELL SELL")
    myDBA.printTable("bot")
    myDBA.setStockSymbol("AdamsBOT", "NEW NAME")
    myDBA.printTable("bot")

    print("ApiKey: " + str(myDBA.getAPIKey("Adam")))
    print("SecretKey: " + str(myDBA.getSecretKey("Adam")))
    print("Buy: " + str(myDBA.getBuyConditions(1)))
    print("Sell: " + str(myDBA.getSellConditions(1)))
    print("StockSymbol: " + str(myDBA.getStockSymbol("AdamsBOT")))

    myDBA.addRelationship("Adam", "AdamsBOT")
    myDBA.addRelationship("Adam", "AdamsBOT2")
    print(myDBA.getUserBots("API KEY", "SECRET KEY"))
    myDBA.setActive("API KEY", "SECRET KEY", 1)
    res = myDBA.isActive("API KEY", "SECRET KEY", 1)
    print(res)
    myDBA.setInactive("API KEY", "SECRET KEY", 1)
    res = myDBA.isActive("API KEY", "SECRET KEY", 1)
    print(res)

    print(myDBA.containsBot(1))
    print(myDBA.containsBot(7))

    print("\n--- Printing user-bots ---")
    myDBA.printTable("userbot")
    print("\n--- Printing user-bots ---")
    myDBA.setActive("API KEY", "SECRET KEY", 0)
    myDBA.printTable("userbot")
    print("\n--- Printing user-bots ---")
    myDBA.setInactive("API KEY", "SECRET KEY", 1)

    myDBA.printTable("userbot")
    print("Adams bots: ")
    print(myDBA.getUserBots("API KEY", "SECRET KEY"))
    myDBA.removeRelationship(2)
    print()
    myDBA.printTable("userbot")
    myDBA.removeBot(1)
    print()
    print(myDBA.getUserBots("API KEY", "SECRET KEY"))
    myDBA.printTable("bot")




if __name__ == "__main__":
    main()