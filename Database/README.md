# DBA

## READ ME
**important:** Database Adapter is currently being rewritten to be more efficient. The way I have this currently written is a huge mess.

---
**Upcoming changes:** 
- Changing the date from using mySQL's method to taking in a string passed from the front end
- Adding Getters to all fields in the database rather than having to parse a json string
- Updating efficiency of the DB



# Using the DB
## How to connect

1. create a DBAdapter object by passing in the host name and the password
    ```python
    import DBAdapter as DBA

    myDBA = DBA(host, password)
    ```
2. Use `connect()` method to connect to the DBA
3. For creating a new DBA with empty entries, use the `initNew()`
    - **WARNING:** using this method with entries already in the database will wipe all existing entries. Only use this when testing
