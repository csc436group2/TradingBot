from dataclasses import replace
from operator import truediv
import requests
import alpaca_trade_api as tradeapi
from finviz.screener import Screener
import finviz
import time
import datetime
import json
skey = ""
apiKey = ""
apiEndpoint = "https://api.alpaca.markets"
class ScreenerCondition:
    def __init__(self,property,gt,lt):
        self.property = property
        self.gt = gt
        self.lt = lt
buyConditions = []
sellConditions = []
stockToTrade = ""
#START JSON CONIFG SETUP
f = open("config.json")
data = json.load(f)
skey = data["secret_key"]
apiKey = data["api_key"]
stockToTrade = data["stock_sym"]
for i in data["buy_condition"]:
    buyConditions.append(ScreenerCondition(i["property"],i["gt"],i["lt"]))
for i in data["sell_condition"]:
    sellConditions.append(ScreenerCondition(i["property"],i["gt"],i["lt"]))
#END JSON CONIFG SETUP
orderAmount = 10
holding = False
api = tradeapi.REST(apiKey,skey)
def GetStockData(symbol):
    return (finviz.get_stock(symbol))
def isMarketOpen():
    clock = api.get_clock()
    return clock.is_open
def buyStock(sym,amount):
    api.submit_order(
        symbol=sym,
        qty=amount,
        side='buy',
        type='market',
        time_in_force='gtc'
    )
def sellStock(sym,amount):
    api.submit_order(
        symbol=sym,
        qty=amount,
        side='sell',
        type='market',
        time_in_force='opg',
    )
def tradeLoop():
    while (True):
        while isMarketOpen() == False:
            time.sleep(600)
        sData = json.loads( GetStockData(stockToTrade))
        if (holding):
            passed = True
            for sc in sellConditions:
                property = float(sData[sc.property].upper().To.replace("%","").replace("M","").replace("K",""))
                if (property < sc.gt or property > sc.lt):
                    passed = False
            if (passed):
                sellStock(stockToTrade,orderAmount)
        else:
            passed = True
            for sc in buyConditions:
                property = float(sData[sc.property].upper().To.replace("%","").replace("M","").replace("K",""))
                if (property < sc.gt or property > sc.lt):
                    passed = False
            if (passed):
                buyStock(stockToTrade,orderAmount)
        time.sleep(500)
    



