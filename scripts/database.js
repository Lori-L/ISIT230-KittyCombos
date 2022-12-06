// get the top scores (up to 16 scores) from the database and display
// the values on the leaderboard
function getTopScores() {
  axios.get("/score").then((response) => {
    // loop through each index of the response and if there is a value display it on the database
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
  return axios.get("/score").then((response) => {
    const dataLength = response.data.length;

    if (dataLength < 16) {
      return 0;
    }

    return parseInt(response.data[15][1]);
  });
}

// posts score to db
function addScoreToLeaderboard() {
  axios.post("/score", {
    name: player.name,
    score: player.score,
  });
}
