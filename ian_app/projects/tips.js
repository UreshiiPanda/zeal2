tip_on_tax = false;

function allow_decimal(event) {
    const input = event.target;
    const value = input.value;
    
    // Regular expression to match non-negative decimal numbers with up to two decimal places
    const regex = /^\d*\.?\d{0,2}$/;
    
    // If the value matches the regex, allow it; otherwise, revert to the previous valid value
    if (!regex.test(value)) {
        input.value = input.value.slice(0, -1);
    }
}

function allow_integer(event) {
    const input = event.target;
    const value = input.value;
    
    // Remove any characters that are not digits
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    if (value.charAt(0) == '0') input.value = 1;
    else input.value = sanitizedValue;
}

function tip_button_pressed(tip_percentage) {
    const tip_input = document.getElementById("tip-percentage");
    tip_input.value = tip_percentage;
}

function toggle_tax_on_tip() {
    tip_on_tax = !tip_on_tax;
}

function calculate_tip() {
    const bill_amount = parseFloat(document.getElementById("bill-amount").value);
    const tip_percentage = parseInt(document.getElementById("tip-percentage").value);
    let tax_percentage = parseFloat(document.getElementById("tax-percentage").value);
    let people = parseInt(document.getElementById("people").value);

    if (!bill_amount) return alert("Please enter a bill amount...");
    else if (!tip_percentage) return alert("Please enter a tip percentage...");

    populate_date();
    populate_hex_message();

    if (!people) people = 1;
    if (!tax_percentage) tax_percentage = 0;

    let tax = bill_amount * (tax_percentage / 100);
    let tip;
    if (tip_on_tax) tip = (bill_amount + tax) * (tip_percentage / 100);
    else tip = bill_amount * (tip_percentage / 100);
    let total = bill_amount + tax + tip;

    document.getElementById("subtotal").innerText = bill_amount.toFixed(2);
    document.getElementById("tax-percentage").innerText = tax_percentage.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("tip-percentage").innerText = tip_percentage.toFixed(2);
    document.getElementById("tip").innerText = tip.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);

    document.getElementById("your-tip").innerText = (tip / people).toFixed(2);

    const asterik = document.getElementById("asterik");
    const disclaimer = document.getElementById("disclaimer");
    if (tip_on_tax) {
        asterik.classList.remove("hidden");
        disclaimer.classList.remove("hidden");
    } else {
        asterik.classList.add("hidden");
        disclaimer.classList.add("hidden");
    }

    const split_tip = document.getElementById("split-tip");
    if (people !== 1) {
        split_tip.classList.remove("hidden");
    } else {
        split_tip.classList.add("hidden");
    }
}

function populate_hex_message() {
    const encode_strings = [
        "zeal",
        "ianlee",
        "jojo",
        "hayden",
        "gavin",
        "imaan",
        "srisai",
        "jimmy",
        "hammer",
        "trizzy",
        "tmoney",
        "imaan",
        "madeline",
        "christian",
        "texas",
        "cowboy",
    ]
    const i = Math.floor(Math.random() * encode_strings.length);
    const encoded_string = stringToHex(encode_strings[i]);
    document.getElementById("transaction-id").innerText = encoded_string
}

function populate_date() {
    const now = luxon.DateTime.now();
    const now_string = now.toFormat("cccc D t")
    document.getElementById("date").innerText = now_string;
}

function stringToHex(str) {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      hex += str.charCodeAt(i).toString(16);
    }
    return hex;
}

document.addEventListener("DOMContentLoaded", () => {
    populate_date()
    populate_hex_message();
});