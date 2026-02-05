const PlayerSetupSection = document.getElementById("player-setup-section");
const categorySelectionSection = document.getElementById("category-selection-section");
const questionGameplaySection = document.getElementById("question-gameplay-section");

const startGameButton = document.getElementById("start-game-button");
const startRoundButton = document.getElementById("start-round-button");

const roundNumberEl = document.getElementById("round-number");
const categoryNameEl = document.getElementById("category-name");
const difficultyLevelEl = document.getElementById("difficulty-level");
const currentPlayerTurnEl = document.getElementById("current-player-turn");
const questionTextEl = document.getElementById("question-text");
const nextButtonEl = document.getElementById("next-button");

const optionOneEl = document.getElementById("option-one");
const optionTwoEl = document.getElementById("option-two");
const optionThreeEl = document.getElementById("option-three");
const optionFourEl = document.getElementById("option-four");

const optionOneText = document.getElementById("option-one-text");
const optionTwoText = document.getElementById("option-two-text");
const optionThreeText = document.getElementById("option-three-text");
const optionFourText = document.getElementById("option-four-text");




const player1ScoreEl = document.getElementById("player1-name-score");
const player2ScoreEl = document.getElementById("player2-name-score");

let index = 0;

let player1Name = "";
let player2Name = "";

let player1Score = 0;
let player2Score = 0;

let currentCategory = "";
let difficultyList = ["easy", "medium", "hard"];
let currentDifficulty = "";

let questions = []; 

categorySelectionSection.style.display = "none";
questionGameplaySection.style.display = "none";

startGameButton.addEventListener("click", function () {
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");

    player1Name = player1Input.value;
    player2Name = player2Input.value;

    const error = document.getElementById("error-msg");
    error.textContent = "";

    if (player1Name === "" || player2Name === "") {
        error.textContent = "Please enter both player names";
        return;
    }

    if (player1Name === player2Name) {
        error.textContent = "Player names must be unique";
        return;
    }

    PlayerSetupSection.style.display = "none";
    categorySelectionSection.style.display = "block";

    document.getElementById("display-player1-name").textContent = "FirstPlayer: " + player1Name;

    document.getElementById("display-player2-name").textContent = "SecondPlayer: " + player2Name;
});

startRoundButton.addEventListener("click", function () {
    const categoryDropdown = document.getElementById("category-dropdown");
    currentCategory = categoryDropdown.value;

    categoryDropdown.remove(categoryDropdown.selectedIndex);

    categorySelectionSection.style.display = "none";
    questionGameplaySection.style.display = "block";

    categoryNameEl.textContent = "Category: " + currentCategory;

    player1ScoreEl.textContent = player1Name + ": " + player1Score;
    player2ScoreEl.textContent = player2Name + ": " + player2Score;

    fetchQuestions(currentCategory, currentDifficulty);
});


async function fetchQuestions(category, difficulty) {
    questions = []; 
    index = 0;

    try {
        for (let i = 0; i < difficultyList.length; i++) {
            const difficulty = difficultyList[i];

            const response = await fetch(
                `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}&limit=2`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }

            const data = await response.json();
            data.forEach(function (q) {
                questions.push(q);
            });
        }

        console.log("Total questions:", questions.length);
        showQuestion();

    } catch (error) {
        console.error("Error:", error);
    }
}

function showQuestion() {
    const currentQuestion = questions[index]; 
    
    roundNumberEl.textContent = "Round: " + (index + 1);
    
    difficultyLevelEl.textContent = "Difficulty: " + currentQuestion.difficulty
    
    if (index % 2 === 0) {
        currentPlayerTurnEl.textContent = "Player Turn: " + player1Name;
    } else {
        currentPlayerTurnEl.textContent = "Player Turn: " + player2Name;
    }
    
    questionTextEl.textContent = currentQuestion.question.text;
    
    let options = [];
        
    options.push(currentQuestion.correctAnswer);
    options.push(currentQuestion.incorrectAnswers[0]);
    options.push(currentQuestion.incorrectAnswers[1]);
    options.push(currentQuestion.incorrectAnswers[2]);  
    
    optionOneText.textContent = options[0];
    optionTwoText.textContent = options[1];
    optionThreeText.textContent = options[2];
    optionFourText.textContent = options[3];
    
    optionOneEl.checked = false;
    optionTwoEl.checked = false;
    optionThreeEl.checked = false;
    optionFourEl.checked = false;

    if (index >= questions.length - 1) {
        nextButtonEl.disabled = true; 
    } else {
        nextButtonEl.disabled = false;
    }
}

nextButtonEl.addEventListener("click", function () {
    index++;
    showQuestion();
});


