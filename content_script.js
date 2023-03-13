// Regex to locate prices
const priceRegex = new RegExp(/[(0-9)+.?(0-9)*]+/g);
const priceRegexAll = new RegExp(/(^\$)[(0-9)+.?(0-9)*]+/g);

// Script to run & add timeCost to page

var elements = document.getElementsByTagName('*');
var priceHours;
var priceMinutes;

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            // var hourlyRate = localStorage.getItem("hourlyRate");

            // Read it using the storage API
            var hourlyRate = chrome.storage.sync.get("hourlyRate");

            var text = node.nodeValue;
            var priceDisplayed = Number(text.match(priceRegex));
            priceHours = Math.floor(priceDisplayed / hourlyRate);
            var minuteRate = hourlyRate / 60;
            priceMinutes = Math.floor((priceDisplayed % hourlyRate) / minuteRate);
            var replacedText = text.replace(priceRegexAll, `${text} (${priceHours}h ${priceMinutes}m)`);

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}