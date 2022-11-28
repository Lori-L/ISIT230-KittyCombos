// Player class
class Player {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.turnsLeft = 0;
        this.letAnim = true; // Used to remember the user's animation preference.
        this.gameActive = true; // Used to prevent the player from making matches after the game has ended.
        this.gameStarted = false; // Used to prevent the player from getting unearned matches while the board is initially being generated.
    }
};