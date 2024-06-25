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

