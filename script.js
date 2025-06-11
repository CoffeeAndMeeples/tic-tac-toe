//Gameboard object
const gameBoard = (function () {
    let squares = ['','','','','','','','','']; 
    
    const reset = () => squares = ['','','','','','','','',''];
    const render = () => {
        const spaces = document.querySelectorAll(".board-wrapper > *");
        for (let i = 0; i < squares.length; i++) {
            spaces[i].textContent = squares[i];
        };
        return;
    };
    const getArray = () => {
        return squares;
    }   
    //the function to alter the squares variable probably needs to live in here!
    const updateSquares = (i, marker) => squares[i] = marker;
    const checkForWinner = () => {
        //switch statement with all of the potential winning combos
        let winner = "";
        switch(true) {
            //X winner conditions
            case (squares[0] === squares[1] && squares[1] === squares[2] && squares[2] === "X"):
            case (squares[3] === squares[4] && squares[4] === squares[5] && squares[5] === "X"):
            case (squares[6] === squares[7] && squares[7] === squares[8] && squares[8] === "X"):
            case (squares[0] === squares[3] && squares[3] === squares[6] && squares[6] === "X"):
            case (squares[1] === squares[4] && squares[4] === squares[7] && squares[7] === "X"):
            case (squares[2] === squares[5] && squares[5] === squares[8] && squares[8] === "X"):
            case (squares[0] === squares[4] && squares[4] === squares[8] && squares[8] === "X"):
            case (squares[2] === squares[4] && squares[4] === squares[6] && squares[6] === "X"):
                winner = "playerX";
                break;
                
                
            //O winner conditions
            case (squares[0] === squares[1] && squares[1] === squares[2] && squares[2] === "O"):
            case (squares[3] === squares[4] && squares[4] === squares[5] && squares[5] === "O"):
            case (squares[6] === squares[7] && squares[7] === squares[8] && squares[8] === "O"):
            case (squares[0] === squares[3] && squares[3] === squares[6] && squares[6] === "O"):
            case (squares[1] === squares[4] && squares[4] === squares[7] && squares[7] === "O"):
            case (squares[2] === squares[5] && squares[5] === squares[8] && squares[8] === "O"):
            case (squares[0] === squares[4] && squares[4] === squares[8] && squares[8] === "O"):
            case (squares[2] === squares[4] && squares[4] === squares[6] && squares[6] === "O"):
                winner = "playerO";
                break;
                
            default:
                break;
        }
        //check for draw
        let draw = "yes";
        for (const element of squares) {
            if (element === '') {
                draw = "no";
            }
        }
        if (draw === "yes" && winner === "") {
            winner = "draw";
        }
        return winner;
        
    }

    
    return (squares, {reset, render, getArray, updateSquares, checkForWinner});
})();

//Players object
function createPlayer(playerName, playerMarker) {
    const name = playerName;
    const marker = playerMarker;
    return {name, marker};
    
}
//Game Flow object
//this should probably be an IIFE so it calls itself 
const game = (function () {
    //create a gameboard for this instance
    let activeBoard = gameBoard;
    activeBoard.render();
    let activePlayer = playerX;

    // function that runs the game
    function runGame(playerX, playerO) {
        let activePlayer = playerX;
        const reset = document.querySelector(".reset");
        reset.addEventListener("click", () => {
            activeBoard.reset();
            activeBoard.render();
            if (activePlayer = playerO) {
                activePlayerSwitch();
            }
        })
        activeBoard.reset();
        activeBoard.render();
  
        //active Player toggle function
        function activePlayerSwitch() {
            if (activePlayer === playerX) {
                activePlayer = playerO;
            }
            else {
                activePlayer = playerX;
            }
        }
        //declare winner function
        function declareWinner(player) {
            if (player === "draw") {
                alert("It's a Draw!");
            }
            else {
                alert(player.name + " Wins!");
            }
            activeBoard.reset();
            if (activePlayer === playerO) {
                activePlayerSwitch();
            }
            squares = ['','','','','','','','',''];
            return;
        }

        //make the grid Active
        const spaces = document.querySelectorAll(".board-wrapper > *");
        
        for (let i = 0; i < 9; i++) {
            spaces[i].addEventListener("click", function(event) {

                if (spaces[i].textContent === "X" || spaces[i].textContent === "O") {
                    //do nothing
                }
                else {
                    spaces[i].textContent = activePlayer.marker;
                    activeBoard.updateSquares(i, activePlayer.marker);
                    const winnerCheck = activeBoard.checkForWinner();
                    switch(winnerCheck) {
                        case "playerX":
                            declareWinner(playerX);
                            activePlayerSwitch();
                            break;
                        case "playerO":
                            declareWinner(playerO);
                            activePlayerSwitch();
                            break;
                        case "draw": 
                            declareWinner("draw");
                            activePlayerSwitch();
                            break;
                        default: 
                            break;
                    }
                    activePlayerSwitch();
                    
                }

            })
        }
    }

    //Listener on the Start Game button
    const btn = document.querySelector("form");
    btn.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(btn);
        //require both players to have been entered
        if (!formData.get("playerX") || !formData.get("playerO")) {
            alert("Must have 2 Players");
            return
        }
        const playerX = createPlayer(formData.get("playerX"), "X");
        const playerO = createPlayer(formData.get("playerO"), "O");
        
        return runGame(playerX, playerO);
    })
})();