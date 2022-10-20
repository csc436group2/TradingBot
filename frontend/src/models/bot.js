export default class Bot {
    botName;
    stockSym;
    creationDate;
    isRunning;
    buy_condition;
    sell_condition;
  
    constructor(botName, stockSym, creationDate, isRunning, buy_condition, sell_condition) {
        this.botName = botName;
        this.stockSym = stockSym;
        this.creationDate = creationDate;
        this.isRunning = isRunning;
        this.buy_condition = buy_condition;
        this.sell_condition = sell_condition;
    }
}