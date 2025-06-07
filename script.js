//Gameboard object
const gameBoard = () => {
    squares: [];
    // a function to reset the 9 squares to blanks that perhaps only Game Flow can access

    const startGame = () => {
        this.squares = [];
        
        
    }

}

//Players object
//Wrap this in an annonymous function
function Player(name, marker) {
    this.name = name;
    this.marker = marker;

    // a function that creates players from user input, assignig the correct marker
}


//Game Flow object
function game() {

    // a function to create a gameboard for this instance

    // a function to render the current gameboard

    // a function that updates the squares based on player input

    // a prompt requiring 2 players

    // a function that determines if a winner has been achieved or if there is a draw
    // probably a switch statement that can handle all of the 3-in-a-row possibilities

}