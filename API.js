function fetchData() {
    const API_KEY = '8b1960cf9c5847b490b9de4499de24c0';

    console.log(timeInterval);
    console.log(outputSize);

    let cryptoSymbol = changeCryptoValue;
    let crypto_API_Call = `https://api.twelvedata.com/time_series?symbol=${cryptoSymbol}&exchange=Binance&interval=${timeInterval}&outputsize=${outputSize}&apikey=${API_KEY}`;

    let stockSymbol = changeStockValue;
    let stock_API_Call = `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=${timeInterval}&outputsize=${outputSize}&apikey=${API_KEY}`;

    let stockResObj = [];
    let cryptoResObj = [];
    const datesObject = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };

    var stockWorkingMonthArr = [];
    var cryptoWorkingMonthArr = [];
    var cryptoWorkingYearArr = [];
    var combinedMonthYear = [];

    var stockWorkingMonthSplitArr = [];
    var cryptoWorkingMonthSplitArr = [];
    var stockDateNums;
    var cryptoDateNums;
    var cryptoDateYear;

    var argsObj = {};

    var stockDates;
    var cryptoDates;

    fetch(stock_API_Call)
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (stockData) {
            for (let key in stockData['values']) {
                stockResObj.push(stockData['values'][key]);
            }

            stockDates = stockResObj.map(dates => dates.datetime);
            var stockClosingPrice = stockResObj.map(stockClosePrice => stockClosePrice.close);

            console.log(stockDates);

            for (let i = 0; i < stockDates.length; i++) {
                stockWorkingMonthSplitArr = stockDates[i].split("");
                stockDateNums = stockWorkingMonthSplitArr[5].concat(stockWorkingMonthSplitArr[6]);
                console.log(stockDateNums);
                stockWorkingMonthArr.push(datesObject[stockDateNums]);
            }

            stockWorkingMonthArr = stockWorkingMonthArr.reverse();
            stockClosingPrice = stockClosingPrice.reverse();

            argsObj = {
                stockGraphTimeline: stockWorkingMonthArr,
                stockGraphPrice: stockClosingPrice
            }

            return fetch(crypto_API_Call)
        })
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (cryptoData) {
            for (let key in cryptoData['values']) {
                cryptoResObj.push(cryptoData['values'][key]);
            }

            cryptoDates = cryptoResObj.map(dates => dates.datetime);

            var cryptoClosingPrice = cryptoResObj.map(cryptoClosePrice => cryptoClosePrice.close);

            for (let i = 0; i < cryptoDates.length; i++) {
                cryptoWorkingMonthSplitArr = cryptoDates[i].split("");
                cryptoDateNums = cryptoWorkingMonthSplitArr[5].concat(cryptoWorkingMonthSplitArr[6]);
                cryptoDateYear = cryptoWorkingMonthSplitArr[2].concat(cryptoWorkingMonthSplitArr[3]);
                cryptoWorkingYearArr.push(cryptoDateYear);
                cryptoWorkingMonthArr.push(datesObject[cryptoDateNums]);
            }

            cryptoWorkingYearArr = cryptoWorkingYearArr.reverse();
            cryptoWorkingMonthArr = cryptoWorkingMonthArr.reverse();
            cryptoClosingPrice = cryptoClosingPrice.reverse();

            console.log(cryptoWorkingMonthArr);

            for (let i = 0; i < cryptoWorkingMonthArr.length; i++) {
                combinedMonthYear.push(cryptoWorkingMonthArr[i].concat(" \'").concat(cryptoWorkingYearArr[i]));
            }

            console.log(combinedMonthYear);

            argsObj.cryptoGraphTimeline = combinedMonthYear;
            argsObj.cryptoGraphPrice = cryptoClosingPrice;

            return argsObj;
        })
        .then(function (argsObj) {
            graphData(argsObj);
        }
        )
}

fetchData();