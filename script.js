const PlayerSetupSection = document.getElementById("player-setup-section");
const categorySelectionSection = document.getElementById("category-selection-section");

const startGameButton = document.getElementById("start-game-button");
const startRoundButton = document.getElementById("start-round-button");

let player1Name = "";
let player2Name = "";

categorySelectionSection.style.display = "none";

startGameButton.addEventListener("click", function() {
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    
    const player1Name = player1Input.value;
    const player2Name = player2Input.value;
    
    const error = document.getElementById("error-msg");
    error.textContent = "";
    
    if (player1Name == "" || player2Name == "") {
        error.textContent = "Please enter both player names";
        return;
    }
    
    if (player1Name == player2Name) {
        error.textContent = "Player names must be unique";
        return;
    }
    
    PlayerSetupSection.style.display = "none";
    categorySelectionSection.style.display = "block";
    
    const displayPlayer1Name = document.getElementById("display-player1-name");
    const displayPlayer2Name = document.getElementById("display-player2-name");
    
    displayPlayer1Name.textContent = "FirstPlayer: " + player1Name;
    displayPlayer2Name.textContent = "SecondPlayer: " + player2Name
})

startRoundButton.addEventListener("click", function () {
    const categoryDropdown = document.getElementById("category-dropdown");
    const selectedCategory = categoryDropdown.value;

    const difficulty = ["easy", "medium", "hard"];

    categoryDropdown.remove(categoryDropdown.selectedIndex);

    fetchQuestions(selectedCategory, difficulty);
});

async function fetchQuestions(category, difficulty) {
    try {
    const response = await fetch(
      `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}&limit=2`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();
    console.log(data);

    } catch (error) {
    console.error("Error:", error);
    }
}

