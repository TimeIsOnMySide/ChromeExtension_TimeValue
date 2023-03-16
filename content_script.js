// Regex to locate prices

const priceRegex = new RegExp(/([\d,]+(?:\.\d+)?)/g);
const priceRegexAll = new RegExp(/\$([\d,]+(?:\.\d+)?)/g);

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
    // console.log(hourlyPay);


    // WORKS ON MOST OTHER PRICES EXCEPT AMAZON OR IF THERES A COMMA
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
    
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];
    
            if (node.nodeType === 3) {
    
                var text = node.nodeValue;
                
                var priceDisplayed = text.match(priceRegex);
                // priceDisplayed = Number(priceDisplayed[0].replace(',',''));
                
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


    //  WORKS ON AMAZON PRICES (Need to add logic for a comma in formatting final number)
    document.querySelectorAll('.a-price').forEach(function(element){
        var priceDisplayed = element.innerText.replace('$','');
        priceDisplayed = parseFloat(priceDisplayed.replace(',',''));
        priceHours = Math.floor(priceDisplayed / hourlyPay);
        var minuteRate = hourlyPay / 60;
        priceMinutes = Math.floor((priceDisplayed % hourlyPay) / minuteRate);
        element.innerText = `$${priceDisplayed} (${priceHours}h ${priceMinutes}m)`;
    });

}


mainFuction();



