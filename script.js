const PlayerSetup = document.getElementById("PlayerSetup");

const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");

const error = document.getElementById("errorMsg");

const startBtn = document.getElementById("startBtn");

let player1Name = "";
let player2Name = "";

startBtn.addEventListener("click", function() {
    const firstPlayer = player1Input.value;
    const secondPlayer = player2Input.value;
    
    error.textContent = "";
    
    if (player1Name == "" || player1Name == "") {
        error.textContent = "Please enter both player names";
        return;
    }
    
    if (player1Name == player2Name) {
        error.textContent = "Player names must be unique";
        return;
    }
})
