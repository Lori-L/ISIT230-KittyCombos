// VARIABLES
let isUnstable = false;
const board = new GameCanvas();
const player = new Player();

// Gameplay and Leaderboard forms
let gameplay = document.getElementById("gameplay");
let leaderboard = document.getElementById("leaderboard");
// This array will be filled with server data on run
let recordHolders = new Array(16).fill("---");

// phrases to be said on matches
let phrase = [
  "Cat Related Phrase",
  "Meow-velous Combo!",
  "Purrrfect Match!",
  "Endless Paws-ibilities!",
  "It's Feeline Like a Good One!",
  "Fun Fur Everyone!",
  "No Dogs Allowed!",
];

// EVENT LISTENERS

// Listens for the redirect buttons to be pressed and reacts accordingly
document
  .getElementById("btn_redirect-leaderboard")
  .addEventListener("click", () => {
    gameplay.style.display = "none";
    leaderboard.style.display = "block";
    changePhrase();
  });
document
  .getElementById("btn_redirect-gameplay")
  .addEventListener("click", () => {
    leaderboard.style.display = "none";
    gameplay.style.display = "block";
    changePhrase();
  });
document
  .getElementById("btn_endGame-leaderboard")
  .addEventListener("click", () => {
    document.getElementById("gameover").style.display = "none";
    leaderboard.style.display = "block";
    changePhrase();
  });

// Listens for start button press and reformats the page accordingly
document.getElementById("btn_start").addEventListener("click", () => {
  loadCanvas();
  document.getElementById("btn_start").style.display = "none";
  document.getElementById("btn_redirect-leaderboard").style.display = "none";
  changePhrase();
  document.getElementById("animation").style.display = "none";
  document.getElementById("btn_restart").style.display = "block";
  document.getElementById("ui").style.color = "white";
});

// Listens for reset and retry buttons and refreshes the page from cache
document.getElementById("btn_restart").addEventListener("click", () => {
  window.location.reload(false);
});
document.getElementById("btn_retry").addEventListener("click", () => {
  window.location.reload(false);
});

// Listens for player name submission
document
  .getElementById("btn_submit-playerName")
  .addEventListener("click", () => {
    console.log("test");
    player.name = document.getElementById("name").value;
    addScoreToLeaderboard(player)();
  });

// FUNCTIONS

function pageLoad() {
  changePhrase();
}

function changePhrase() {
  document.getElementById("phrase").innerHTML =
    phrase[Math.floor(Math.random() * phrase.length)];
  if (isUnstable == true) {
    unstable();
  }
}

// Sets HTML phrases to indicate unstable build
function unstable() {
  document.getElementById("phrase").innerHTML = "UNSTABLE!";
  document.getElementById("phrase").style.color = "red";
}

function toggleAnimations() {
  player.letAnim = !player.letAnim;
  if (player.letAnim == true) {
    document.getElementById("phrase").style.animationIterationCount =
      "infinite";
    setCookie("letAnim", "true");
    console.log("letAnim cookie: " + getCookie("letAnim"));
  } else {
    document.getElementById("phrase").style.animationIterationCount = "0";
    setCookie("letAnim", "false");
    console.log("letAnim cookie: " + getCookie("letAnim"));
  }
}

function useCookies() {
  //Sets the player's highScore value to the cookie highScore value if it already exists. If it doesn't, sets it to 0 by default
  if (checkCookie("highScore", "0")) {
    player.highScore = Number(getCookie("highScore"));
    console.log("highScore cookie: " + getCookie("highScore"));
  }

  //Sets the player's animation preference value to the saved cookie preference if it exists. If it doesn't sets it to true by default.
  if (checkCookie("letAnim", "true")) {
    //Used to interpret if the cookie value is true or false, since the cookie is a string
    let isTrue = getCookie("letAnim") === "true";

    //Sets the player's letAnim value to the saved cookie value
    player.letAnim = isTrue;
    console.log("letAnim cookie: " + getCookie("letAnim"));

    //Sets the animation setting accordingly
    if (player.letAnim) {
      document.getElementById("phrase").style.animationIterationCount =
        "infinite";
    } else {
      document.getElementById("phrase").style.animationIterationCount = "0";
      document.getElementById("animCheckbox").checked = false;
    }
  }
}

//Instantly deletes all cookies by setting a negative expiration timer. Debugging tool.
function delCookies() {
  document.cookie =
    "highScore=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "letAnim=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

//OCCURS WHEN THE GAME ENDS
function gameOver() {
  document.getElementById("gameplay").style.display = "none";
  document.getElementById("gameover").style.display = "block";
  if (player.score > player.highScore) {
    //If the player got a high score, the highscore message will display and their highScore cookie will be updated.
    document.getElementById("newScore").style.display = "block";
    setCookie("highScore", player.score.toString());
  }

  // !!! PLACEHOLDER !!! MEANT TO SHOW IF THE PLAYER GOT A TOP SCORE, NOT A HIGH SCORE
  if (player.score > player.highScore) {
    //If the player got a top score, the name collection field will display.
    document.getElementById("highScore").style.display = "block";
    setCookie("highScore", player.score.toString());
  } else {
    //Buttons that appear when the player's score is not a high score
    document.getElementById("gameoverRedirects").style.display = "block";
  }
  document.getElementById("finalScore").innerHTML =
    "Score: " + player.score.toString();
}

async function loadCanvas() {
  // Awaits JSON and images
  var obj = await fetchJSON("https://cataas.com/cat?json=true&type=sq");

  // Sets the value of each image in the object to the board array
  for (let n = 0; n < 5; n++) {
    switch (n) {
      case 0:
        board.image[0] = obj.img0;
        break;
      case 1:
        board.image[1] = obj.img1;
        break;
      case 2:
        board.image[2] = obj.img2;
        break;
      case 3:
        board.image[3] = obj.img3;
        break;
      case 4:
        board.image[4] = obj.img4;
        break;
    }
  }

  // Resets the player's turn and score counters. Move to the play game button event handler. Occurs when the player finishes a game, then retries.

  // !!! When adding writing to user's files, will include a portion for finding and setting the player's high score. !!!
  player.turnsLeft = 3;
  player.score = 0;
  player.gameActive = true;
  player.gameStarted = false;
  document.getElementById("turns").innerHTML =
    "Turns Left: " + player.turnsLeft.toString();

  board.populateBoard();

  // Will check for matches four times per second.
  window.setInterval(function () {
    if (player.gameActive) {
      board.checkForMatches();
      board.tileFall();
      board.repopulateBoard();

      if (player.turnsLeft <= 0) {
        player.gameActive = false;
        gameOver();
      }
    }
  }, 250);
}

useCookies();

//Only use for debugging
//delCookies();
