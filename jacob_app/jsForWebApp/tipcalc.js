
//let billTot = 100
//let tipPer = 20


function calculateTip() {
    // Check if the inputs are valid numbers
    var billAmount = parseFloat(document.getElementById("totalBill").value);
    var tipPercentage = parseFloat(document.getElementById("myRange").value);


    if (isNaN(billAmount) || isNaN(tipPercentage)) 
    {
        return "Please enter valid numbers for bill amount and tip percentage.";
    }

    var tipAmount = billAmount * (tipPercentage / 100);
    billAmount += tipAmount;
    document.getElementById("result").innerHTML = "Your total bill is: " + billAmount + "$";
    document.getElementById("result2").innerHTML = "Your total tip is: " + tipAmount + "$";

}
//console.log(calculateTip(billTot, tipPer));
console.log('hello');

// document.getElementById("totalBill").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         calculateTip();
//     }
// });

var slider = document.getElementById("myRange");

// Function to handle slider change event
function handleSliderChange(event) {
    // Get the current value of the slider
    var sliderValue = event.target.value;

    // Do something with the slider value, for example update a display
    calculateTip()
}

// Add event listener to the slider
slider.addEventListener("input", handleSliderChange);


