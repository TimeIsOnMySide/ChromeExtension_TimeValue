// Regex to locate prices
const priceRegex = new RegExp(/[(0-9)+.?(0-9)*]+/g);
const priceRegexAll = new RegExp(/(^\$)[(0-9)+.?(0-9)*]+/g);

var elements = document.getElementsByTagName('*');
var priceHours;
var priceMinutes;
var hourlyPay;

async function mainFuction() {
    var p = new Promise(function(resolve, reject){
        chrome.storage.sync.get("rate", function(options){
            resolve(options.rate);
        })
    });

    hourlyPay = await p;
    console.log(hourlyPay);
}


mainFuction();

console.log(hourlyPay);

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {

            var text = node.nodeValue;
            var priceDisplayed = Number(text.match(priceRegex));
            priceHours = Math.floor(priceDisplayed / hourlyPay);
            var minuteRate = hourlyPay / 60;
            priceMinutes = Math.floor((priceDisplayed % hourlyPay) / minuteRate);
            var replacedText = text.replace(priceRegexAll, `${text} (${priceHours}h ${priceMinutes}m)`);

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}