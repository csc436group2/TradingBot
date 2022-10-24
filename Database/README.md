# DBA

## READ ME
**important:** Database Adapter is currently being rewritten to be more efficient. The way I have this currently written is a huge mess.

---
**Upcoming changes:** 
- Changing the date from using mySQL's method to taking in a string passed from the front end
- Adding Getters to all fields in the database rather than having to parse a json string
- Updating efficiency of the DB
- Ability to change buy conditions, sell conditions, and stock symbol
- Ability to delete bots and remove relationship



# Using the DB
## How to connect

1. create a DBAdapter object by passing in the host name and the password
    ```python
    import DBAdapter as DBA
    host : str
    password: str
    myDBA = DBA(host, password)
    ```
2. Use `connect()` method to connect to the DBA
3. For creating a new DBA with empty entries, use the `initNew()`
    - **WARNING:** using this method with entries already in the database will wipe all existing entries. Only use this when testing
---
## Methods
| Method name | Purpose
---|---
`connect()`| connects to the database
`initNew()`| creates the database and the tables
`insertUser()`| inserts a new user into the database taking the name, apikey, and secret key
`addBot()` | adds bot into the database by taking the name, stocksymbol, sell conditions, and buy conditions
`isUserPresent()` | checks if the user is present and returns the entire entry
`isBotPresent()` | checks if the bot is present and returns the entire entry
`addRelationship()`     | adds a relationship between the bot and the user
`setActive()`           | sets a bot active
`setInactive()`         | sets a bot as inactive
`isActive()`            | checks if a given bot is active
`getAPIKey()`           | gets api key for user
`getSecretKey()`        | gets secret key for user
`getBuyConditions()`    | gets the buy conditions for bot
`getSellConditions()`   | gets the sell condtions for bot
`getStockSymbol()`      | gets the stock symbol for the bot
`setSellCondition()`    | sets the sell condition for a bot
`setBuyCondition()`     | sets the buyCondition for a bot
`setStockSymbol()`      | sets the stock symbol for a bot
`printTable()`          | prints the table for user, bot, or userBot
