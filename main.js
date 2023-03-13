// JS to collect payRate info
const textInput = document.getElementById('income');
let income = 0;
let saveBtn = document.getElementById('save-btn');
const payType = document.getElementById('payType'); 
let hourlyRate;
const hoursPerWeek = 40;
const weeksPerYear = 52;

saveBtn.addEventListener('click', function() {
    income = Number(textInput.value);
    //if hourly rate is selected, do nothing. Income = hourly
    //if salary rate is selected, calculat hourly rate assuming 40 hour work week
    //Hourly = Salary per year / (Hours per week × Weeks per year)
    if(payType.value === 'salary') {
        hourlyRate = income / (hoursPerWeek * weeksPerYear);
    } else if(payType.value === 'hourly') {
        hourlyRate = income;
    }
    
    // localStorage.setItem("hourlyRate", hourlyRate);

    // Send hourlyRate to chrome storage
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({'hourlyRate': hourlyRate}, function() {
        console.log('Settings saved');
      });
});

