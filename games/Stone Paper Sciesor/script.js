
const buttons=document.querySelectorAll(".choice");
const result=document.getElementById("result");

const playerScoreText=document.getElementById("playerScore");
const computerScoreText=document.getElementById("computerScore");

let playerScore=0;
let computerScore=0;

const choices=["Stone","Paper","Scissors"];

buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        const playerChoice=button.dataset.choice;
        const computerChoice=
        choices[Math.floor(Math.random()*3)];
        play(playerChoice,computerChoice);
    });
});

function play(player,computer){
    let message="";
    if(player===computer){
        message="Draw!";
    }

    else if(
        (player==="Stone" && computer==="Scissors") ||
        (player==="Paper" && computer==="Stone") ||
        (player==="Scissors" && computer==="Paper")
    ){
        playerScore++;
        message="You Win!";
    }

    else{
        computerScore++;
        message="Computer Wins!";
    }

    playerScoreText.textContent=playerScore;
    computerScoreText.textContent=computerScore;
    result.innerHTML=`
        You : <b>${player}</b><br><br>
        Computer : <b>${computer}</b><br><br>
        <h2>${message}</h2>
    `;

}

document.getElementById("restart").addEventListener("click",()=>{
    playerScore=0;
    computerScore=0;
    playerScoreText.textContent=0;
    computerScoreText.textContent=0;
    result.innerHTML="Choose your move!";
});
