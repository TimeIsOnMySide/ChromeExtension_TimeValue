// JS to collect payRate info
const textInput = document.getElementById('income');
let income = 0;
let saveBtn = document.getElementById('save-btn');
const payType = document.getElementById('payType'); 
let hourlyRate;
const hoursPerWeek = 40;
const weeksPerYear = 52;

saveBtn.addEventListener('click', function() {
    income = textInput.value;
    //if hourly rate is selected, do nothing. Income = hourly
    //if salary rate is selected, calculat hourly rate assuming 40 hour work week
    //Hourly = Salary per year / (Hours per week × Weeks per year)
    if(payType.value === 'salary') {
        hourlyRate = income / (hoursPerWeek * weeksPerYear);
    } else if(payType.value === 'hourly') {
        hourlyRate = income;
    }
});

// Look at every element of the page
const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');

// Regex to locate prices
const priceRegex = new RegExp(/[(0-9)+.?(0-9)*]+/g);

// let timeCost = `(${hoursCost}h ${minutesCost})`;

// Script to run & add timeCost to page

for(let i = 0; i < text.length; i++) {
    
    if(text[i].innerHTML.includes('$')) {
        
    }
}