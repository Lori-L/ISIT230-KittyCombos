// get the top scores (up to 16 scores) from the database and display
// the values on the leaderboard
function getTopScores() {
  axios.get("/score").then((response) => {
    console.log(response);
    for (let i = 0; i < 16; i++) {
      if (!response.data[i]) {
        document.getElementById("u" + i).textContent = "--";
      } else {
        document.getElementById(
          "u" + i
        ).textContent = `${response.data[i][0]}:  ${response.data[i][1]}`;
      }
    }
  });
}

// gets the 16th score or the lowest score from the database
function getLowestHighScore() {
  axios.get("/score").then((response) => {
    const dataLength = response.data.length;
    const lowestScoreToCompare = parseInt(response.data[dataLength - 1][1]);
    console.log(response.data[dataLength - 1]);
    console.log(lowestScoreToCompare);

    return lowestScoreToCompare;
  });
}

// checks if the player has a high score
function isNewHighScore(player) {
  const scoreToCompare = getLowestHighScore();

  if (player.score > scoreToCompare) {
    // prompt the user to type in a name

    // save the user input as the player name

    addScoreToLeaderboard(player);
    // call getTopScores function and reload the db
    // getTopScores();


    // congratulate player

  }


  // may need to change parameter to accept a player object's highscore attribute
  if (player.score > player.highScore) {

    player.highScore = player.score;
    // congratulate the player
  }
}
