// Function to unlock buttons
function unlockButtons() {
    // Get the buttons to be unlocked
    var button1 = document.getElementById("lockedButton1");
    var button2 = document.getElementById("lockedButton2");

    // Enable the buttons
    button1.disabled = false;
    button2.disabled = false;
}

// Event listener for completing the task
document.getElementById("completeTaskButton").addEventListener("click", function() {
    // Here, you can add conditions to check if the task is completed
    // For example, you can check if the input field has a specific value
    var taskInput = document.getElementById("taskInput").value;

    if (taskInput === "unlock") { // Replace "unlock" with the actual condition
        unlockButtons();
    } else {
        alert("Please complete the task to unlock the buttons.");
    }
});