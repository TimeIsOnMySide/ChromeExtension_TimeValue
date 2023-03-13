const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
const priceRegex = new RegExp(/(^\$)[(0-9)+.?(0-9)*]+/g);

for(let i = 0; i < text.length; i++) {
    if(text[i].innerHTML.includes(priceRegex)) {
        text[i].innerHTML = text[i].innerHTML.concat(' ', timeCost);
    }
}