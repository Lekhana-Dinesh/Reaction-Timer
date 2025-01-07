const gameSetup = document.getElementById('game-setup');
const gameArea = document.getElementById('game-area');
const gameOverScreen = document.getElementById('game-over');
const target = document.getElementById('target');
const playAgainBtn = document.getElementById('play-again-btn');
const nextGameBtn = document.getElementById('next-game-btn');
const resultText = document.getElementById('result');
const playerTurn = document.getElementById('player-turn');

let isTwoPlayer = false;
let player1Score = 0;
let player2Score = 0;
let reactionTimes = [];
let startTime;
let currentPlayer = 1;
let player1TotalPoints = 0;
let player2TotalPoints = 0;
let gameDuration = 30000;  
let maxClicks = 90; // 90 possible clicks per 30 seconds
let player1AvgReactionTime = 0;
let player2AvgReactionTime = 0;
let gameInterval;

// function to help randomize target position
function randomPosition() {
  const boardWidth = 400;
  const boardHeight = 400;
  const size = 50;
  const x = Math.random() * (boardWidth - size);
  const y = Math.random() * (boardHeight - size);
  return { x, y };
}

// Start the game
function startGame() {
  gameSetup.classList.add('hidden');
  gameArea.classList.remove('hidden');
  target.classList.remove('hidden');
  startTime = Date.now();
  reactionTimes = [];
  player1Score = 0;
  player2Score = 0;
  updateTurn();
  gameInterval = setTimeout(endGame, gameDuration); // 30-second timer
}

// to handle target click
target.addEventListener('click', () => {
  const clickTime = Date.now();
  reactionTimes.push(clickTime - startTime);
  startTime = clickTime;

  if (currentPlayer === 1) player1Score++;
  else player2Score++;

  nextTarget();
  updateTurn();
});

// to update the current player's turn message
function updateTurn() {
  playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
}

// to move the target to a random position
function nextTarget() {
  const { x, y } = randomPosition();
  target.style.transform = `translate(${x}px, ${y}px)`;
}

// to End the game
function endGame() {
  clearInterval(gameInterval);
  target.classList.add('hidden');
  gameArea.classList.add('hidden');
  gameOverScreen.classList.remove('hidden');

  const feedback = getFeedback();
  resultText.textContent = `Player ${currentPlayer === 1 ? 1 : 2}, your score was ${
    currentPlayer === 1 ? player1Score : player2Score
  } clicks in 30 seconds. Your average reaction time was ${
    currentPlayer === 1 ? (reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length).toFixed(2) : 0
  } ms. ${feedback}`;

  if (isTwoPlayer) {
    if (currentPlayer === 1) {
      currentPlayer = 2;
      playerTurn.textContent = "Player 2's Turn";
    } else {
      compareScores();
    }
  }
}

// to provide feedback based on score
function getFeedback() {
  if (currentPlayer === 1 && player1Score >= 50) {
    return 'Awesome! You are among the top players. Your reaction time, speed, and agility are legendary!';
  } else if (currentPlayer === 1 && player1Score >= 20) {
    return 'Great job! Your reaction time is good, and you’re on your way to becoming legendary!';
  } else if (currentPlayer === 2 && player2Score >= 50) {
    return 'Awesome! You are among the top players. Your reaction time, speed, and agility are legendary!';
  } else if (currentPlayer === 2 && player2Score >= 20) {
    return 'Great job! Your reaction time is good, and you’re on your way to becoming legendary!';
  } else {
    return 'Keep practicing! Your reaction time needs improvement, but you can always get better!';
  }
}

// to compare scores after every two turns
function compareScores() {
  if (player1Score > player2Score) {
    resultText.textContent = 'Player 1 wins this round!';
  } else if (player2Score > player1Score) {
    resultText.textContent = 'Player 2 wins this round!';
  } else {
    resultText.textContent = 'It\'s a tie!';
  }

  // to refresh after both players finish their game
  refreshGame();
}

// refresh the game for a new round
function refreshGame() {
  setTimeout(() => {
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    gameOverScreen.classList.add('hidden');
    gameSetup.classList.remove('hidden');
  }, 2000); // 2 seconds wait time before resetting
}

// Starting of next game
nextGameBtn.addEventListener('click', () => {
  playerTurn.textContent = "Player 1's Turn";
  gameOverScreen.classList.add('hidden');
  gameArea.classList.remove('hidden');
  startGame();
});

// Restart game
playAgainBtn.addEventListener('click', () => {
  gameOverScreen.classList.add('hidden');
  gameSetup.classList.remove('hidden');
  player1TotalPoints = 0;
  player2TotalPoints = 0;
});

document.getElementById('single-player-btn').addEventListener('click', () => {
  isTwoPlayer = false;
  startGame();
});

document.getElementById('two-player-btn').addEventListener('click', () => {
  isTwoPlayer = true;
  startGame();
});






