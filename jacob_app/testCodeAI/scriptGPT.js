function calculateIncrement() {
    var initialValue = parseFloat(document.getElementById("initialValue").value);
    var incrementValue = parseFloat(document.getElementById("incrementValue").value);

    // Check if the inputs are valid numbers
    if (isNaN(initialValue) || isNaN(incrementValue)) {
        document.getElementById("result").innerHTML = "Please enter valid numbers.";
        return;
    }

    // Calculate the final value
    var finalValue = initialValue + incrementValue;

    // Display the final value
    document.getElementById("result").innerHTML = "Final Value: " + finalValue;
}

function addData() {
    // Get the input data from the form
    var inputData = document.getElementById("data").value;

    // Get the table body
    var tableBody = document.getElementById("tableBody");

    // Create a new row
    var newRow = tableBody.insertRow();

    // Insert a cell into the new row
    var cell = newRow.insertCell(0);

    // Add the data to the cell
    cell.innerHTML = inputData;

    // Clear the form input
    document.getElementById("data").value = "";
}