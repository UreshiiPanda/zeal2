function addData() {
    // Get the input data from the form
    var inputData = document.getElementById("gldata").value;

    // makes sure there is data in the edit box
    if (inputData.trim() === "") {
        alert("Please enter some data.");
        return;
    }

    // Get the table body
    var tableBody = document.getElementById("tableBody");

    var newRow = tableBody.insertRow();
    var cell = newRow.insertCell(0);
    cell.innerHTML = inputData;

    //new data below
    var actionCell = newRow.insertCell(1);
    actionCell.innerHTML = '<button onclick="editData(this)">Edit</button> <button onclick="deleteData(this)">Delete</button>';

    // Clear the form input
    document.getElementById("gldata").value = "";
}

function editData(button) {
    // Get the row containing the button, parent cell -- > parent row
    var row = button.parentNode.parentNode;

    // Get the current data
    var currentData = row.cells[0].innerText;

    // Prompt user for new data
    var newData = prompt("Edit data:", currentData);

    // If user did not cancel the prompt and the input is not empty, update the cell
    if (newData !== null && newData.trim() !== "") {
        row.cells[0].innerText = newData;
    } else if (newData !== null) {
        alert("Data cannot be empty.");
    }
}

function deleteData(button) {
    // Get the row containing the button
    var row = button.parentNode.parentNode;

    // Delete the row
    row.parentNode.removeChild(row);
}

document.getElementById("gldata").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addData();
    }
});

