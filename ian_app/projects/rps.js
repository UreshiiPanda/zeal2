//When each button is pressed, a computer will pick a random option from rock, paper and scissors.
document.getElementById('pickButton').addEventListener('click', function() {
    // Array of options
    const options = ['Rock', 'Paper', 'Scissors'];
    
    // Pick a random option
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption1 = options[randomIndex];
    // print the result
    document.getElementById('result1').innerText = `You picked Rock, The Computer picked ${randomOption1}!`;
});
document.getElementById('pickButton2').addEventListener('click', function() {
    // Array of options
    const options = ['Rock', 'Paper', 'Scissors'];
    
    // Pick a random option
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption2 = options[randomIndex];
    
    // Display the result
    document.getElementById('result2').innerText = `You picked Paper, The Computer picked ${randomOption2}!`;
});
document.getElementById('pickButton3').addEventListener('click', function() {
    // Array of options
    const options = ['Rock', 'Paper', 'Scissors'];
    
    // Pick a random option
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption3 = options[randomIndex];
    
    // Display the result
    document.getElementById('result3').innerText = `You picked Scissors, The Computer picked ${randomOption3}!`;
});
if (randomOption1 === "Rock") {
    // Print "Tie!" if the condition is met
    document.getElementById('result1').innerText = "Tie!";
}
else if (randomOption1 === "Paper") {
    //Print "You lost!" if condition is met
    document.getElementById('result1').innerText = "You Lost!"
}
else {
    //Print "You won!" if condiiton is true.
    document.getElementById('result1').InnerText = "You Won!"
}