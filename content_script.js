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
        element.innerText = `$${priceDisplayed.toLocaleString("en-US")} (${priceHours}h ${priceMinutes}m)`;
    });



    // Quick test
    // var pageText = document.body.innerHTML;

    // document.body.innerHTML = pageText.replace(/\$([\d,]+(?:\.\d+)?)/g,
    // function (string, c1) {
    //     //If there are commas, get rid of them and record they were there
    //     var comma = c1.indexOf(',') != -1;
    //     c1 = c1.replace(/,/g, '');
    //     //Parse and double
    //     var value = '' + (parseFloat(c1) * 2);
    //     //Reinsert commas if they were there before
    //     if (comma) {
    //         var split = value.split(".");
    //         value = split[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    //         if(split.length > 1)
    //             value += "."+split[1];
    //     }
    //     //Return with dollar sign prepended
    //     return '$' + value;
    // });

}


mainFuction();



