export default class Bot {
    botName;
    stockSym;
    creation_date;
    isRunning;
    buy_condition;
    sell_condition;
    botId;
  
    constructor(botName, stockSym, creation_date, isRunning, buy_condition, sell_condition, botId) {
        this.botName = botName;
        this.stockSym = stockSym;
        this.creation_date = creation_date;
        this.isRunning = isRunning;
        this.buy_condition = buy_condition;
        this.sell_condition = sell_condition;
        this.botId = botId;
    }
}