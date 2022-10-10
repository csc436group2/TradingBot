import DBAdapter as DBA

def main() -> None:
    # add your password here
    password = ""
    myDBA = DBA.DBAdapter("localhost", password)
    myDBA.connect()
    
    # called once to create db or to reset all the tables
    # comment out to preserve data
    myDBA.initNew()

    myDBA.insertUser("Adam", "6125387", "16545")
    myDBA.insertUser("Amit", "gd67g12hjw", "324463")
    myDBA.insertUser("Derek", "j35t84uy98r3kj2", "45d4168awd")
    myDBA.insertUser("Nick", "7823u4j289", "hbd54g1rd156es")

    print("--- Printing users ---")
    myDBA.printTable("user")

    myDBA.addBot("AdamsBOT")

    print("\n--- Printing bots ---")
    myDBA.printTable("bot")

    myDBA.addRelationship("Adam", "AdamsBOT")

    print("\n--- Printing user-bots ---")
    myDBA.printTable("userbot")
    print("\n--- Printing user-bots ---")
    myDBA.setActive("Adam", "AdamsBOT")
    myDBA.printTable("userbot")
    print("\n--- Printing user-bots ---")
    myDBA.setInactive("Adam", "AdamsBOT")

    myDBA.printTable("userbot")




if __name__ == "__main__":
    main()