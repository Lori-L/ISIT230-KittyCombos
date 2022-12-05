// Game canvas class
class GameCanvas {
  constructor() {
    this.grid = document.getElementById("grid");
    this.boardLength = 8;
    this.boardArray = [];
    this.currTile;
    this.otherTile;
    this.image = [];
  }

  // Fills an empty board with random tiles
  populateBoard() {
    for (let i = 0; i < this.boardLength; i++) {
      let row = [];
      for (let j = 0; j < this.boardLength; j++) {
        let tile = document.createElement("img");

        // Gives each tile img element an id value that can be used for later comparisons.
        tile.id = i.toString() + "-" + j.toString();

        // Randomly determines the image displayed.
        tile.src = this.image[Math.floor(Math.random() * 5)];

        // Adds tile drag functionality
        tile.addEventListener("dragstart", dragStart); // For the initial click that starts the tile dragging
        tile.addEventListener("dragover", dragOver); // Moving the mouse after the initial click
        tile.addEventListener("dragenter", dragEnter); // When a tile is dragged onto another tile
        tile.addEventListener("dragleave", dragLeave); // When a tile is held over another tile
        tile.addEventListener("drop", dragDrop); // When the mouse is released, and the tile is dropped
        tile.addEventListener("dragend", dragEnd); // What happens after the tile dragging process has ended (tile swap)

        grid.append(tile);
        row.push(tile);
      }
      this.boardArray.push(row);
    }

    console.log(this.boardArray);
  }

  // Finds blank tiles and assigns them a random image so they can be used in the game again.
  repopulateBoard() {
    for (let c = 0; c < this.boardLength; c++) {
      for (let r = 0; r < this.boardLength; r++) {
        if (this.boardArray[r][c].src.includes("lightblue")) {
          this.boardArray[r][c].src = this.image[Math.floor(Math.random() * 5)];
        }
      }
    }
  }

  //Checks for matches in descending order. This is so the highest possible matches are found first.
  checkForMatches() {
    this.checkTileMatchSize(5);
    this.checkTileMatchSize(4);
    this.checkTileMatchSize(3);
  }

  //Checks the board for matches of the specified size.
  checkTileMatchSize(num) {
    let tempNum;
    let tempArray;

    //Checking for matches along the rows
    for (let r = 0; r < this.boardLength; r++) {
      for (let c = 0; c < this.boardLength - (num - 1); c++) {
        tempNum = num;
        tempArray = [];

        for (let i = 0; tempNum > 0; i++) {
          tempArray.push(this.boardArray[r][c + i]);
          tempNum -= 1;
        }

        // If tiles match, remove the tile images, repopulate the board,
        // and give the player points. Planning on making this into its
        // own function to decrease redundant code.
        if (
          tempArray.every(this.checkMatchArray) &&
          !tempArray[0].src.includes("lightblue")
        ) {
          tempArray.forEach(this.removeMatchedTiles);
          this.tileFall();

          console.log("Match found of size " + num.toString());

          // Makes sure the player doesn't get points for matches found while the board is generating.
          if (player.gameStarted) {
            // Give the player points.
            this.addScore(num);
          }
        }
      }
    }

    //Checking for matches along the columns
    for (let c = 0; c < this.boardLength; c++) {
      for (let r = 0; r < this.boardLength - (num - 1); r++) {
        tempNum = num;
        tempArray = [];

        for (let i = 0; tempNum > 0; i++) {
          tempArray.push(this.boardArray[r + i][c]);
          tempNum -= 1;
        }

        // If tiles match, remove the tile images, repopulate the board,
        // and give the player points. Planning on making this into its
        // own function to decrease redundant code.
        if (
          tempArray.every(this.checkMatchArray) &&
          !tempArray[0].src.includes("lightblue")
        ) {
          tempArray.forEach(this.removeMatchedTiles);
          this.tileFall();

          console.log("Match found of size " + num.toString());

          // Makes sure the player doesn't get points for matches found while the board is generating.
          if (player.gameStarted) {
            // Give the player points.
            this.addScore(num);
          }
        }
      }
    }
  }

  addScore(num) {
    // Switch statement to determine how many points the player should receive based on how large their match was
    switch (num) {
      case 5:
        // Gives 15 points and two extra turns when the player matches 5 tiles.
        player.score += 15;
        player.turnsLeft += 2;
        document.getElementById("turns").innerHTML =
          "Turns Left: " + player.turnsLeft.toString();
        break;
      case 4:
        // Gives 10 points and one extra turn when the player matches 4 tiles.
        player.score += 10;
        player.turnsLeft += 1;
        document.getElementById("turns").innerHTML =
          "Turns Left: " + player.turnsLeft.toString();
        break;
      default:
        // Gives 5 points when the player matches 3 tiles.
        player.score += 5;
    }
    console.log("Score: " + player.score);
    document.getElementById("score").innerHTML =
      "Score: " + player.score.toString();
  }

  // Checks to see if all tiles have the same image.
  checkMatchArray(element, index, array) {
    return array[0].src == element.src;
  }

  // Makes all tiles in a successful match blank.
  removeMatchedTiles(element, index, array) {
    element.src = "./images/lightblue.JPG";
  }

  // Checks to see if a tile swap is valid by checking that at least one match is created.
  // Only checks for matches of three, because that is the minimum match size.
  checkValid() {
    // Checking for matches along the rows
    for (let r = 0; r < this.boardLength; r++) {
      for (let c = 0; c < this.boardLength - 2; c++) {
        let tile1 = this.boardArray[r][c];
        let tile2 = this.boardArray[r][c + 1];
        let tile3 = this.boardArray[r][c + 2];

        // If a match is found, return true so the game knows to allow the move.
        if (
          tile1.src === tile2.src &&
          tile1.src === tile3.src &&
          !tile1.src.includes("lightblue")
        ) {
          return true;
        }
      }
    }

    // Checking for matches along the columns
    for (let c = 0; c < this.boardLength; c++) {
      for (let r = 0; r < this.boardLength - 2; r++) {
        let tile1 = this.boardArray[r][c];
        let tile2 = this.boardArray[r + 1][c];
        let tile3 = this.boardArray[r + 2][c];

        // If a match is found, return true so the game knows to allow the move.
        if (
          tile1.src === tile2.src &&
          tile1.src === tile3.src &&
          !tile1.src.includes("lightblue")
        ) {
          return true;
        }
      }
    }

    // If no match is found, return false so the game knows not to allow the move.
    return false;
  }

  // Makes non-blank tiles "fall" through blank ones, to add a sense of gravity to the game board.
  tileFall() {
    for (let c = 0; c < this.boardLength; c++) {
      let blankCounter = this.boardLength - 1;

      // Works from the bottom to the top of each column.
      // Moves all non-blank tiles down. Keeps track of how many blank tiles there were with blankCounter.
      for (let r = this.boardLength - 1; r >= 0; r--) {
        if (!this.boardArray[r][c].src.includes("lightblue")) {
          this.boardArray[blankCounter][c].src = this.boardArray[r][c].src;

          blankCounter -= 1;
        }
      }

      // Places the number of blank tiles encountered previously at the top of the column.
      // This is how the blank tiles are "moved" up.
      for (let r = blankCounter; r >= 0; r--) {
        this.boardArray[r][c].src = "./images/lightblue.JPG";
      }
    }
  }
}

// For the initial click that starts the tile dragging
function dragStart() {
  // The current tile is the one that was clicked on for the drag
  currTile = this;

  // Sets the game as having started once the player clicks on any tile for the first time. The player can now earn points for matches found.
  if (!player.gameStarted) {
    player.gameStarted = true;
  }
}

// Moving the mouse after the initial click. Not currently used, but left for possible later additions.
function dragOver(e) {
  e.preventDefault();
}

// When a tile is dragged onto another tile. Not currently used, but left for possible later additions.
function dragEnter(e) {
  e.preventDefault();
}

// When a tile is held over another tile. Not currently used, but left for possible later additions.
function dragLeave(e) {
  e.preventDefault();
}

// When the mouse is released, and the tile is dropped
function dragDrop() {
  //The other tile is the one that the dragged (current) tile is dropped onto
  otherTile = this;
}

// What happens after the tile dragging process has ended (tile swap)
function dragEnd() {
  // Validity check start:

  // Does not allow the player to swap with a blank tile.
  if (
    currTile.src.includes("lightblue") ||
    otherTile.src.includes("lightblue")
  ) {
    return;
  }

  // tile id set in populateBoard(). id="1-7" -> [1, 7] for easy comparison between the current and other tiles
  let currCoords = currTile.id.split("-");
  let r1 = parseInt(currCoords[0]);
  let c1 = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  // Establishes all possible valid moves
  let moveLeft = c2 == c1 - 1 && r2 == r1;
  let moveRight = c2 == c1 + 1 && r2 == r1;
  let moveUp = c2 == c1 && r2 == r1 - 1;
  let moveDown = c2 == c1 && r2 == r1 + 1;

  // Determines if the current move is valid
  let isAdjacent = moveLeft || moveRight || moveUp || moveDown; // Ensures both tiles are adjacent.

  if (isAdjacent) {
    // Tile swap - in reality, it just swaps the images displayed in both tiles.
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    // Decrease the player's turn count when they make a move.
    player.turnsLeft -= 1;
    document.getElementById("turns").innerHTML =
      "Turns Left: " + player.turnsLeft.toString();

    // Returns the tiles back to their original locations if the swap did not result in a match.
    if (!board.checkValid()) {
      console.log("Invalid swap - does not create a match");

      let currImg = currTile.src;
      let otherImg = otherTile.src;

      currTile.src = otherImg;
      otherTile.src = currImg;

      // Reset the player's turn count if their move was not valid.
      player.turnsLeft += 1;
      document.getElementById("turns").innerHTML =
        "Turns Left: " + player.turnsLeft.toString();
    }
  }
}
