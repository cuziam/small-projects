function startNewGame() {
  if (players.some((player) => player.name.length === 0)) {
    alert("Please set custom player names for both players!");
    return;
  }
  resetGameStatus();
  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  isGameOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won! <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";
  gameData.forEach((row) => row.fill(0));
  for (let i = 0; i < 9; i++) {
    const gameBoardItemElement = gameBoardElement.children[i];
    gameBoardItemElement.textContent = "";
    gameBoardItemElement.classList.remove("disabled");
  }
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || isGameOver === true) {
    return;
  }
  const selectedField = event.target;

  const selectedCol = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedCol] > 0) {
    alert("Please select an empty field");
    return;
  }
  event.target.textContent = players[activePlayer].symbol; //initial: players[0]
  event.target.classList.add("disabled");
  gameData[selectedRow][selectedCol] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  //same row
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  //same col
  for (let j = 0; j < 3; j++) {
    if (
      gameData[0][j] > 0 &&
      gameData[0][j] === gameData[1][j] &&
      gameData[1][j] === gameData[2][j]
    ) {
      return gameData[0][j];
    }
  }
  //same diagonal
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  )
    return gameData[0][0];
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  )
    return gameData[0][2];
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  isGameOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw";
  }
}
