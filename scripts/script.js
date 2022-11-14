// VARIABLES

// Gameplay and Leaderboard forms
let gameplay = document.getElementById("gameplay");
let leaderboard = document.getElementById("leaderboard");
// This array will be filled with server data on run
let recordHolders = new Array(16).fill("---");
let anim = true;

// phrases to be said on matches
let phrase = ["Cat Related Phrase", "Meow-velous Combo", "Purrrfect Match"];

// EVENT LISTENERS

// Listens for the redirect buttons to be pressed and reacts accordingly
document.getElementById("btn_redirect-leaderboard").addEventListener("click", () => { gameplay.style.display = "none"; leaderboard.style.display = "block"; changePhrase(); });
document.getElementById("btn_redirect-gameplay").addEventListener("click", () => { leaderboard.style.display = "none"; gameplay.style.display = "block"; changePhrase(); } );

// Listens for start button press and reformats the page accordingly
document.getElementById("btn_start").addEventListener("click", () => { loadCanvas(); document.getElementById("btn_start").style.display="none"; document.getElementById("btn_redirect-leaderboard").style.display="none"; changePhrase(); document.getElementById("animation").style.display="none"; document.getElementById("btn_restart").style.display="block"; });

// Listens for reset button and refreshes the page from cache
document.getElementById("btn_restart").addEventListener("click", () => { window.location.reload(false); });

// FUNCTIONS

function pageLoad() {
    changePhrase();
    // loadImages();
}

function changePhrase() {
    document.getElementById("phrase").innerHTML = phrase[Math.floor(Math.random() * 3)];
}

function toggleAnimations() {
    anim = !anim;
    if (anim == true) {
        document.getElementById("phrase").style.animationIterationCount="infinite";
    } else {
        document.getElementById("phrase").style.animationIterationCount="0";
    }
}

function loadCanvas() {
    const board = new GameCanvas();

    // !!! When adding writing to user's files, will include a portion for finding and setting the player's high score. !!!
    const player = new Player();
    player.turnsLeft = 15;

    board.populateBoard();

    // Will check for matches ten times per second.
    window.setInterval(function() {
        board.checkForMatches();
    }, 100);
}