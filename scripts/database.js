
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

// get the 16th score or the lowest score from the database
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
function isNewHighScore(score) {
  const scoreToCompare = getLowestHighScore();

  if (score > scoreToCompare) {
    // prompt the user to type in a name
    // create a user with the name and the score
    // add the use data to the db
    // call getTopScores function and reload the db
    // congratulate player
  }

  // if check if players score is greater than their previous high score
  // if it is update their high score and congratulate player
}
