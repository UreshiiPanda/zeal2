// Function to show a specific screen and hide the others
function showScreen(screenId) {
    // Get all screen elements
    const screens = document.querySelectorAll('.screen');
    
    // Hide all screens
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the selected screen
    document.getElementById(screenId).classList.add('active');
}

// Add event listener to the rockbutton to navigate to screen2
document.getElementById('rockbutton').addEventListener('click', () => {
    showScreen('screen2');
});

// Show the first screen initially
document.addEventListener('DOMContentLoaded', () => {
    showScreen('screen1');
});
