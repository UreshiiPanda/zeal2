var levelCount;
var lossCount;

function playRockPaperScissors(playerChoice) {
    
    // Array of choices: Rock, Paper, Scissors
    var choices = ["rock", "paper", "scissors"];
    var seed;
    var computerChoice;

    seed = generateRandomNumber();
    
    // Randomly select computer's choice
    if(seed != undefined)
    {
        computerChoice = choices[0];
    }

    //var computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    if (playerChoice === computerChoice) {
        //return "It's a tie! Both chose " + playerChoice + ".";
       
        document.getElementById("resultRPS").innerHTML = "Its a tie! Both chose: " + playerChoice;

        winCounter = 0;
        document.getElementById("winCount").innerHTML = "Win streak: " + winCounter; //tie
    } 
    else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        //return "You win! " + playerChoice + " beats " + computerChoice + ".";
        document.getElementById("resultRPS").innerHTML = "You win! " + playerChoice + " beats " + computerChoice + ".";

        // if (winCounter === undefined){
        //     winCounter = 1;
        // }
        // else{
        //     winCounter += 1;
        // } 
        // document.getElementById("winCount").innerHTML = "Win streak: " + winCounter;

        if(levelCount === undefined){
            levelCount = 1;
            localStorage.setItem('levelCounter', levelCount);
        }
        

        window.location.href = 'winpage.html';
    } 
    else {
        //return "Computer wins! " + computerChoice + " beats " + playerChoice + ".";
        document.getElementById("resultRPS").innerHTML = "Computer wins! " + computerChoice + " beats " + playerChoice + ".";

        winCounter = 0;
        document.getElementById("winCount").innerHTML = "Win streak: " + winCounter;

        if(lossCount === undefined){
            lossCount = 1;
            localStorage.setItem('lossCounter', lossCount);
        }
        else{
            lossCount++;
            localStorage.setItem('lossCounter', lossCount);
        }

        window.location.href = 'losspage.html';
    } //loss
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
} // generate a number 1-100 so i can change the odds of a particular move 

document.addEventListener('DOMContentLoaded', function() {
    var image = document.getElementById('fallingImage');
    image.classList.add('animate');
});

