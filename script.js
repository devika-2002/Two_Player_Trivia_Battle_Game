const PlayerSetupSection = document.getElementById("player-setup-section");
const categorySelectionSection = document.getElementById("category-selection-section");
const questionGameplaySection = document.getElementById("question-gameplay-section");

const startGameButton = document.getElementById("start-game-button");
const startRoundButton = document.getElementById("start-round-button");

let index = 0;

let player1Name = "";
let player2Name = "";

let currentCategory = "";
const difficultyList = ["easy", "medium", "hard"];
let currentDifficulty = "";

categorySelectionSection.style.display = "none";
questionGameplaySection.style.display = "none";

startGameButton.addEventListener("click", function() {
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    
    player1Name = player1Input.value;
    player2Name = player2Input.value;
    
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
    
    currentCategory = selectedCategory;

    categoryDropdown.remove(categoryDropdown.selectedIndex);
    
    categorySelectionSection.style.display = "none";
    questionGameplaySection.style.display = "block";
    
    const roundNumberElement = document.getElementById("round-number");
    roundNumberElement.textContent = "Round: " + (index + 1);
    
    const categoryName = document.getElementById("category-name");
    categoryName.textContent = "Category: " + currentCategory;
    
    let currentDifficulty = "";

    if (index < 2) {
      currentDifficulty = difficultyList[0]; 
    } else if (index < 4) {
      currentDifficulty = difficultyList[1]; 
    } else {
      currentDifficulty = difficultyList[2];
    }

    const difficultyLevel = document.getElementById("difficulty-level");
    difficultyLevel.textContent = "Difficulty: " + currentDifficulty;
    
    const currentPlayerTurn = document.getElementById("current-player-turn");
    if (index % 2 === 0) {
        currentPlayerTurn.textContent = "Player Turn: " + player1Name;
    } else {
        currentPlayerTurn.textContent = "Player Turn: " + player2Name;
    }
   
    fetchQuestions(selectedCategory, difficultyList);
});

async function fetchQuestions(category, difficultyList) {
    try {
    const response = await fetch(
      `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficultyList}&limit=2`
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

function showQuestion() {

}







































