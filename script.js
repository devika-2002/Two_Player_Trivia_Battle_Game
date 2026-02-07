
const PlayerSetupSection = document.getElementById("player-setup-section");
const categorySelectionSection = document.getElementById("category-selection-section");
const questionGameplaySection = document.getElementById("question-gameplay-section");
const roundSummarySection = document.getElementById("round-summary-section");
const finalResultSection = document.getElementById("final-result-section");

const startGameButton = document.getElementById("start-game-button");
const startRoundButton = document.getElementById("start-round-button");
const nextQuestionButton = document.getElementById("next-question-button");
const nextRoundButton = document.getElementById("next-round-button");
const endGameButton = document.getElementById("end-game-button");

const optionOneEl = document.getElementById("option-one");
const optionTwoEl = document.getElementById("option-two");
const optionThreeEl = document.getElementById("option-three");
const optionFourEl = document.getElementById("option-four");

const optionOneText = document.getElementById("option-one-text");
const optionTwoText = document.getElementById("option-two-text");
const optionThreeText = document.getElementById("option-three-text");
const optionFourText = document.getElementById("option-four-text");

const answerResultEl = document.getElementById("answer-result");
const player1ScoreEl = document.getElementById("player1-score");
const player2ScoreEl = document.getElementById("player2-score");

let round = 1;
let currentQuestionIndex = 0;

let player1Name = "";
let player2Name = "";
let player1Score = 0;
let player2Score = 0;

let currentCategory = "";
let questions = [];

const difficultyList = ["easy", "medium", "hard"];

categorySelectionSection.style.display = "none";
questionGameplaySection.style.display = "none";
roundSummarySection.style.display = "none";
finalResultSection.style.display = "none";

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
});

startRoundButton.addEventListener("click", function () {
    const categoryDropdown = document.getElementById("category-dropdown");
    currentCategory = categoryDropdown.value;
    
    const categoryError = document.getElementById("category-error");
    categoryError.textContent = "";
    

    if (currentCategory === "") {
        categoryError.textContent = "Please select a category";
        return;
    }

    categoryDropdown.remove(categoryDropdown.selectedIndex);

    fetchQuestions(currentCategory);
});

async function fetchQuestions(category) {
    questions = [];
    currentQuestionIndex = 0;

    try {
        for (let i = 0; i < difficultyList.length; i++) {
            const difficulty = difficultyList[i];

            const response = await fetch(
                `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulty}&limit=2`
            );

            const data = await response.json();

            data.forEach(function (question) {
                questions.push(question);
            });
        }

        const difficultyLevel = ["easy", "medium", "hard"];
        let orderedQuestions = [];

        for (let i = 0; i < difficultyLevel.length; i++) {
            for (let j = 0; j < questions.length; j++) {
                if (questions[j].difficulty === difficultyLevel[i]) {
                    orderedQuestions.push(questions[j]);
                }
            }
        }

        questions = orderedQuestions;

        categorySelectionSection.style.display = "none";
        questionGameplaySection.style.display = "block";

        showQuestion();

    } catch (error) {
        const errorElement = document.getElementById("error-message");
        errorElement.textContent = "Failed to load questions. Please try again later.";
    }
}

function showQuestion() {

    const question = questions[currentQuestionIndex];
    const gameRoundEl = document.getElementById("game-round");
    gameRoundEl.textContent = "Round " + round;
    
    const gameCategoryEl = document.getElementById("game-category");
    gameCategoryEl.textContent = "Category: " + currentCategory;
    
    const gameDifficultyEl = document.getElementById("game-difficulty");
    gameDifficultyEl.textContent = "Difficulty: " + question.difficulty;

    let currentPlayer = "";

    if (currentQuestionIndex % 2 === 0) {
        currentPlayer = player1Name;
    } else {
        currentPlayer = player2Name;
    }

    const playerTurnEl = document.getElementById("player-turn");
    playerTurnEl.textContent = "Turn: " + currentPlayer;

    player1ScoreEl.textContent = `${player1Name}: ${player1Score}`;
    player2ScoreEl.textContent = `${player2Name}: ${player2Score}`;

    const questionTextEl = document.getElementById("question-text");
    questionTextEl.textContent = question.question.text;
    
    answerResultEl.textContent = "";
    nextQuestionButton.disabled = true;

    optionOneEl.checked = false;
    optionTwoEl.checked = false;
    optionThreeEl.checked = false;
    optionFourEl.checked = false;

    optionOneEl.disabled = false;
    optionTwoEl.disabled = false;
    optionThreeEl.disabled = false;
    optionFourEl.disabled = false;

    let options = [
        question.correctAnswer,
        ...question.incorrectAnswers
    ];

    options.sort(() => Math.random() - 0.5);

    optionOneText.textContent = options[0];
    optionTwoText.textContent = options[1];
    optionThreeText.textContent = options[2];
    optionFourText.textContent = options[3];
}

function enableNext() {
    updateScore();
    nextQuestionButton.disabled = false;

    optionOneEl.disabled = true;
    optionTwoEl.disabled = true;
    optionThreeEl.disabled = true;
    optionFourEl.disabled = true;
}

function getSelectedAnswer() {
    let selectedAnswer;

    if (optionOneEl.checked) {
        selectedAnswer = optionOneText.textContent;
    } else if (optionTwoEl.checked) {
        selectedAnswer = optionTwoText.textContent;
    } else if (optionThreeEl.checked) {
        selectedAnswer = optionThreeText.textContent;
    } else if (optionFourEl.checked) {
        selectedAnswer = optionFourText.textContent;
    } else {
        selectedAnswer = null;
    }
    return selectedAnswer;
}

function updateScore() {
    const selectedAnswer = getSelectedAnswer();
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const difficulty = questions[currentQuestionIndex].difficulty;

    let points = 0;
    if (difficulty === "easy") {
        points = 10;
    } else if (difficulty === "medium") {
        points = 15;
    } else if (difficulty === "hard") {
        points = 20;
    }

    if (selectedAnswer === correctAnswer) {
        answerResultEl.textContent = "Correct";
        if (currentQuestionIndex % 2 === 0) {
            player1Score += points;
        } else {
            player2Score += points;
        }
    } else {
        answerResultEl.textContent = "Wrong";
    }

    optionOneEl.disabled = true;
    optionTwoEl.disabled = true;
    optionThreeEl.disabled = true;
    optionFourEl.disabled = true;

    player1ScoreEl.textContent = `${player1Name}: ${player1Score}`;
    player2ScoreEl.textContent = `${player2Name}: ${player2Score}`;
}

nextQuestionButton.addEventListener("click", function () {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        round++;
        showRoundSummaryScreen();
    }
});

function showRoundSummaryScreen() {
    questionGameplaySection.style.display = "none";
    roundSummarySection.style.display = "block";

    const categoryDropdown = document.getElementById("category-dropdown");

    if (categoryDropdown.options.length === 0) {
        nextRoundButton.disabled = true;
    } else {
        nextRoundButton.disabled = false;
    }
}

nextRoundButton.addEventListener("click", function () {
    roundSummarySection.style.display = "none";
    categorySelectionSection.style.display = "block";

    const roundNumberEl = document.getElementById("round-number");
    roundNumberEl.textContent = "Round " + round;

    currentQuestionIndex = 0;
});


function showFinalResultScreen() {
    const finalPlayer1ScoreEl = document.getElementById("final-player1-score");
    const finalPlayer2ScoreEl = document.getElementById("final-player2-score");
    const winnerTextEl = document.getElementById("winner-text");

    PlayerSetupSection.style.display = "none";
    categorySelectionSection.style.display = "none";
    questionGameplaySection.style.display = "none";
    roundSummarySection.style.display = "none";

    finalResultSection.style.display = "block";

    finalPlayer1ScoreEl.textContent =
        player1Name + " Final Score: " + player1Score;

    finalPlayer2ScoreEl.textContent =
        player2Name + " Final Score: " + player2Score;

    if (player1Score > player2Score) {
        winnerTextEl.textContent = "Winner: " + player1Name;
    } else if (player2Score > player1Score) {
        winnerTextEl.textContent = "Winner: " + player2Name;
    } else {
        winnerTextEl.textContent = "Match Draw!";
    }
}

endGameButton.addEventListener("click", function () {
    showFinalResultScreen();
});




