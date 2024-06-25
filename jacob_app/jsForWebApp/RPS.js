function playRockPaperScissors(playerChoice) {
    
    // Array of choices: Rock, Paper, Scissors
    var choices = ["rock", "paper", "scissors"];
    
    // Randomly select computer's choice
    var computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    if (playerChoice === computerChoice) {
        //return "It's a tie! Both chose " + playerChoice + ".";
       
        document.getElementById("resultRPS").innerHTML = "Its a tie! Both chose: " + playerChoice;

        winCounter = 0;
        document.getElementById("winCount").innerHTML = "Win streak: " + winCounter;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        //return "You win! " + playerChoice + " beats " + computerChoice + ".";
        document.getElementById("resultRPS").innerHTML = "You win! " + playerChoice + " beats " + computerChoice + ".";

        if (winCounter === undefined){
            winCounter = 1;
        }
        else{
            winCounter += 1;
        }
        document.getElementById("winCount").innerHTML = "Win streak: " + winCounter;
    } else {
        //return "Computer wins! " + computerChoice + " beats " + playerChoice + ".";
        document.getElementById("resultRPS").innerHTML = "Computer wins! " + computerChoice + " beats " + playerChoice + ".";

        winCounter = 0;
        document.getElementById("winCount").innerHTML = "Win streak: " + winCounter;
    }
}