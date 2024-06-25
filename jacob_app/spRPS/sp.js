document.addEventListener('DOMContentLoaded', (event) => {
    const isUnlocked = localStorage.getItem('buttonUnlocked');
    if (isUnlocked === 'true') {
        const targetButton = document.getElementById('chal2');
        targetButton.disabled = false;
    }
});
document.addEventListener('DOMContentLoaded', (event) => {
    const isUnlocked = localStorage.getItem('buttonUnlocked2');
    if (isUnlocked === 'true') {
        const targetButton = document.getElementById('chal3');
        targetButton.disabled = false;
    }
});
document.addEventListener('DOMContentLoaded', (event) => {
    const isUnlocked = localStorage.getItem('buttonUnlocked3');
    if (isUnlocked === 'true') {
        const targetButton = document.getElementById('chal4');
        targetButton.disabled = false;
    }
});

function resetStorage() {
    // Clear local storage
    localStorage.clear();

    // Clear session storage
    sessionStorage.clear();

    // Provide feedback to the user
    alert('Browser storage has been reset.');

    window.location.reload(true);
}