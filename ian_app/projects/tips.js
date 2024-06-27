function validateDecimalPlaces(input) {
    var value = input.value;
    if (value.includes('.')) {
        var decimalPlaces = value.split('.')[1];
        if (decimalPlaces.length > 2) {
            input.value = parseFloat(value).toFixed(2);
        }
    }
}

function calculateTip(percentage) {
    var billAmount = parseFloat(document.getElementById('billAmount').value);
    var taxPercentage = parseFloat(document.getElementById('taxPercentage').value);

    if (isNaN(billAmount) || isNaN(taxPercentage)) {
        alert("Please enter a valid bill amount and tax percentage.");
        return;
    }

    var tipAmount = billAmount * (percentage / 100);
    var taxAmount = billAmount * (taxPercentage / 100);
    var totalAmount = billAmount + tipAmount + taxAmount;

    document.getElementById('tipAmount').textContent = tipAmount.toFixed(2);
    document.getElementById('calculatedTaxAmount').textContent = taxAmount.toFixed(2);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
    for (let i = 0; i < 20; i++) {
        createDollarSign();
    }
}

function toggleCustomInput() {
    var customTipContainer = document.getElementById('customTipContainer');
    if (customTipContainer.style.display === 'none' || customTipContainer.style.display === '') {
        customTipContainer.style.display = 'block';
    } else {
        customTipContainer.style.display = 'none';
    }
}

function calculateCustomTip() {
    var customTip = parseFloat(document.getElementById('customTip').value);
    if (isNaN(customTip)) {
        alert("Please enter a valid custom tip percentage.");
        return;
    }
    calculateTip(customTip);
}

let leftSide = true; // boolean flag to alternate sides

function createDollarSign() {
    const container = document.getElementById('floating-container');
    const dollarSign = document.createElement('span');
    dollarSign.textContent = '$';
    dollarSign.className = 'dollar-sign';

    // Alternate between left and right side of the screen
    let xPos;
    if (leftSide) {
        xPos = Math.random() * (window.innerWidth / 2); // Left half
    } else {
        xPos = Math.random() * (window.innerWidth / 2) + (window.innerWidth / 2); // Right half
    }
    leftSide = !leftSide; // Toggle the side for the next dollar sign

    dollarSign.style.left = xPos + 'px';
    dollarSign.style.bottom = '0px'; // Start from the bottom of the screen

    container.appendChild(dollarSign);

    // Remove the element after animation ends
    dollarSign.addEventListener('animationend', () => {
        dollarSign.remove();
    });
}

const state_tax_rates = [
    { state: "Alabama", abbrev: "AL", tax: 4.0 },
    { state: "Alaska", abbrev: "AK", tax: 0 },
    { state: "Arizona", abbrev: "AZ", tax: 5.6 },
    { state: "Arkansas", abbrev: "AR", tax: 6.5 },
    { state: "California", abbrev: "CA", tax: 7.5 },
    { state: "Colorado", abbrev: "CO", tax: 2.9 },
    { state: "Connecticut", abbrev: "CT", tax: 6.35 },
    { state: "Delaware", abbrev: "DE", tax: 0 },
    { state: "District of Columbia", abbrev: "DC", tax: 5.75 },
    { state: "Florida", abbrev: "FL", tax: 6.0 },
    { state: "Georgia", abbrev: "GA", tax: 4.0 },
    { state: "Hawaii", abbrev: "HI", tax: 4.0 },
    { state: "Idaho", abbrev: "ID", tax: 6.0 },
    { state: "Illinois", abbrev: "IL", tax: 6.25 },
    { state: "Indiana", abbrev: "IN", tax: 7.0 },
    { state: "Iowa", abbrev: "IA", tax: 6.0 },
    { state: "Kansas", abbrev: "KS", tax: 6.5 },
    { state: "Kentucky", abbrev: "KY", tax: 6.0 },
    { state: "Louisiana", abbrev: "LA", tax: 4.0 },
    { state: "Maine", abbrev: "ME", tax: 5.5 },
    { state: "Maryland", abbrev: "MD", tax: 6.0 },
    { state: "Massachusetts", abbrev: "MA", tax: 6.25 },
    { state: "Michigan", abbrev: "MI", tax: 6.0 },
    { state: "Minnesota", abbrev: "MN", tax: 6.88 },
    { state: "Mississippi", abbrev: "MS", tax: 7.0 },
    { state: "Missouri", abbrev: "MO", tax: 4.23 },
    { state: "Montana", abbrev: "MT", tax: 0 },
    { state: "Nebraska", abbrev: "NE", tax: 5.5 },
    { state: "Nevada", abbrev: "NV", tax: 6.85 },
    { state: "New Hampshire", abbrev: "NH", tax: 0 },
    { state: "New Jersey", abbrev: "NJ", tax: 7.0 },
    { state: "New Mexico", abbrev: "NM", tax: 5.13 },
    { state: "New York", abbrev: "NY", tax: 4.0 },
    { state: "North Carolina", abbrev: "NC", tax: 4.75 },
    { state: "North Dakota", abbrev: "ND", tax: 5.0 },
    { state: "Ohio", abbrev: "OH", tax: 5.75 },
    { state: "Oklahoma", abbrev: "OK", tax: 4.5 },
    { state: "Oregon", abbrev: "OR", tax: 0 },
    { state: "Pennsylvania", abbrev: "PA", tax: 6.0 },
    { state: "Puerto Rico", abbrev: "PR", tax: 6.0 },
    { state: "Rhode Island", abbrev: "RI", tax: 7.0 },
    { state: "South Carolina", abbrev: "SC", tax: 6.0 },
    { state: "South Dakota", abbrev: "SD", tax: 4.0 },
    { state: "Tennessee", abbrev: "TN", tax: 7.0 },
    { state: "Texas", abbrev: "TX", tax: 6.25 },
    { state: "Utah", abbrev: "UT", tax: 5.95 },
    { state: "Vermont", abbrev: "VT", tax: 6.0 },
    { state: "Virginia", abbrev: "VA", tax: 5.3 },
    { state: "Washington", abbrev: "WA", tax: 6.5 },
    { state: "West Virginia", abbrev: "WV", tax: 6.0 },
    { state: "Wisconsin", abbrev: "WI", tax: 5.0 },
    { state: "Wyoming", abbrev: "WY", tax: 4.0 }
];
