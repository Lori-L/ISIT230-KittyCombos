// VARIABLES
let isUnstable = false;
const board = new GameCanvas();
const player = new Player();

// Gameplay and Leaderboard forms
let gameplay = document.getElementById("gameplay");
let leaderboard = document.getElementById("leaderboard");
// This array will be filled with server data on run
let recordHolders = new Array(16).fill("---");
let anim = true;

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

// Listens for start button press and reformats the page accordingly
document.getElementById("btn_start").addEventListener("click", () => {
  loadCanvas();
  document.getElementById("btn_start").style.display = "none";
  document.getElementById("btn_redirect-leaderboard").style.display = "none";
  changePhrase();
  document.getElementById("animation").style.display = "none";
  document.getElementById("btn_restart").style.display = "block";
});

// Listens for reset button and refreshes the page from cache
document.getElementById("btn_restart").addEventListener("click", () => {
  window.location.reload(false);
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

function unstable() {
  document.getElementById("phrase").innerHTML = "UNSTABLE!";
  document.getElementById("phrase").style.color = "red";
}

function toggleAnimations() {
  anim = !anim;
  if (anim == true) {
    document.getElementById("phrase").style.animationIterationCount =
      "infinite";
  } else {
    document.getElementById("phrase").style.animationIterationCount = "0";
  }
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

  // !!! When adding writing to user's files, will include a portion for finding and setting the player's high score. !!!
  player.turnsLeft = 15;

  board.populateBoard();

  // Will check for matches ten times per second.
  window.setInterval(function () {
    board.checkForMatches();
    board.tileFall();
    board.repopulateBoard();
  }, 250);
}
