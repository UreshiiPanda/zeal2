
var i = localStorage.getItem('levelCounter');


function unlockButton() {
    // Set a flag in Local Storage to indicate the button should be unlocked
    if (i == 1)
    {
        localStorage.setItem('buttonUnlocked', 'true');
        alert('Challenger 2 unlocked!');
    } 
    else if (i == 2)
    {
        localStorage.setItem('buttonUnlocked2', 'true');
        alert('Challenger 3 unlocked!');
    }
    else if (i == 3)
    {
        localStorage.setItem('buttonUnlocked3', 'true');
        alert('Challenger 4 unlocked!');
    } 

}

