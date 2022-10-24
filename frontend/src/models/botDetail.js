export default class BotDetail {
  detailsDescription;
  detailsFirstHalf;
  detailsSecondHalf;
  detailsEPS;
  detailsRatio;

  constructor() {
    this.detailsDescription = [
      { key: "Company", val: "Microsoft Corporation" },
      { key: "Sector", val: "Technology" },
      { key: "Industry", val: "Software - Infrastructure" },
      { key: "Country", val: "USA" },
      { key: "Website", val: "https://www.microsoft.com/" },
      { key: "Index", val: "DJIA S&P500" },
      { key: "Employees", val: "221000" },
      { key: "Price", val: "246.79" },
      { key: "Volume", val: "20,161,816" },
    ];

    this.detailsEPS = [
        { key: "EPS this Y", val: "19.80%" },
        { key: "EPS (ttm)", val: "9.64" },
        { key: "EPS Q/Q", val: "2.80%" },
        { key: "EPS past 5Y", val: "24.30%" },
        { key: "EPS next Q", val: "2.59" },
        { key: "EPS next Y", val: "11.94" },
        { key: "EPS next 5Y", val: "15.41%" },
        { key: "EPS growth next Y", val: "17.98%" },
        { key: "ROI", val: "31.30%" },
        { key: "ROA", val: "21.00%" },
        { key: "ROE", val: "45.40%" },
        { key: "RSI (14)", val: "47.11" },
    ];

    this.detailsRatio = [
        { key: "ATR", val: "6.65" },
        { key: "Book/sh", val: "22.29" },
        { key: "Cash/sh", val: "13.77" },
        { key: "Current Ratio", val: "1.80" },
        { key: "Debt/Eq", val: "0.39" },
        { key: "LT Debt/Eq", val: "0.37" },
        { key: "P/B", val: "11.07" },
        { key: "P/C", val: "17.92" },
        { key: "P/E", val: "25.59" },
        { key: "Forward P/E", val: "20.67" },
        { key: "P/FCF", val: "39.92" },
        { key: "P/S", val: "9.47" },
        { key: "PEG", val: "1.66" },
        { key: "Quick Ratio", val: "1.70" },
        { key: "Short Ratio", val: "1.72" },

    ];

    this.detailsFirstHalf = [
      { key: "Insider Own", val: "0.08%" },
      { key: "Shs Outstand", val: "7.47B" },
      { key: "Perf Week", val: "3.91%" },
      { key: "Market Cap", val: "1876.88B" },
      { key: "Insider Trans", val: "-2.23%" },
      { key: "Shs Float", val: "7.43B" },
      { key: "Perf Month", val: "-4.38%" },
      { key: "Income", val: "72.74B" },
      { key: "Inst Own", val: "72.20%" },
      { key: "Short Float", val: "0.58%" },
      { key: "Perf Quarter", val: "-7.80%" },
      { key: "Sales", val: "198.27B" },
      { key: "Inst Trans", val: "-0.08%" },
      { key: "Perf Half Y", val: "-17.60%" },
      { key: "Target Price", val: "332.49" },
      { key: "Perf Year", val: "-15.80%" },
      { key: "52W Range", val: "232.73 - 349.67" },
      { key: "Perf YTD", val: "-26.62%" },
      { key: "Dividend", val: "2.72" },
      { key: "52W High", val: "-29.42%" },
      { key: "Beta", val: "0.96" },
    ];

    this.detailsSecondHalf = [
      { key: "Gross Margin", val: "68.40%" },
      { key: "52W Low", val: "6.04%" },
      { key: "Sales Q/Q", val: "12.40%" },
      { key: "Oper. Margin", val: "42.00%" },
      { key: "Volatility (Week)", val: "2.58%" },
      { key: "Volatility (Month)", val: "2.40%" },
      { key: "Profit Margin", val: "36.70%" },
      { key: "Rel Volume", val: "0.81" },
      { key: "Prev Close", val: "249.20" },
      { key: "Earnings", val: "Jul 26 AMC" },
      { key: "Payout", val: "24.90%" },
      { key: "Avg Volume", val: "25.02M" },
      { key: "Recom", val: "1.70" },
      { key: "SMA20", val: "0.47%" },
      { key: "SMA50", val: "-6.66%" },
      { key: "SMA200", val: "-12.07%" },
      { key: "Change", val: "-0.97%" },
      { key: "Dividend %", val: "1.10%" },
      { key: "Sales past 5Y", val: "15.50%" },
      { key: "Shortable", val: "Yes" },
      { key: "Optionable", val: "Yes" },
    ];
  }
}
