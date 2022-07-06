


// gameboard
let gameBoard = (() => {
    let zones = Array(9).fill('');
    function draw(){
        // hook the container and draw the grid zones
        const container = document.getElementById('tt-gameboard');
        container.innerHTML = ''; // clear the elements and recreate them
        for (i = 0; i < zones.length; i++){
            const zone = document.createElement('div');
            zone.className = 'grid-item';
            zone.setAttribute('data-id',`${i}`);
            zone.innerText = zones[i];
            
            // if zone has no symbol set, add an onclick so it can be set
            // will keep track of current player in global scope
            if(zones[i] === ''){
                zone.setAttribute('onclick',`game.play(${i})`);
            }

            container.appendChild(zone);
        }
    };
    function debug(){
        let debugString = '';
        if (zones.length === 0){
            console.log('zones = 0. Not initialized.');
            return;
        } else {
            for (i = 0; i < zones.length; i++){
                if (i % 3 === 0){
                    debugString += '\n'
                }
                if(zones[i] === ''){
                    debugString += '*'  // an asterik will represent empty cell
                } else {
                    debugString += zones[i];    // if not empty draw symbol
                }
                
            };
            console.log('An Empty Cell = *...');
            console.log(debugString);
        }
    };
    function reset(){
        zones = Array(9).fill('');
    }
    return {
        draw, debug, reset, zones
    }
})();

// our players, each should have a name (ex player and computer) and a symbox (ex X O)
const createPlayer = (name, symbol, score) => {
    const describe = () => console.log(`${name} ${symbol} ${score}`);
    return {name, symbol, score, describe}
  }

let game = (() => {
    let game = {};
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // create our players
    const player1 = createPlayer('player','X',0);
    const player2 = createPlayer('computer','O',0);
    
    // add them to an array, we will alternate between them to take turns and track player with currentPlayer
    let players = [];
    players.push(player1);
    players.push(player2);
    let currentPlayer = 0;

    // draw the gameboard
    gameBoard.draw();

    // checks for win
    function checkForWin(){
        let result = false;
        winningCombos.forEach((item,index) => {
            if (gameBoard.zones[item[0]] === players[currentPlayer].symbol && gameBoard.zones[item[1]] === players[currentPlayer].symbol && gameBoard.zones[item[2]] === players[currentPlayer].symbol){
                console.log(`winner is ${players[currentPlayer].name}`);
                result = true;
            }
        });
        return result;
    }

    // set our winner text to hidden after 2 seconds and reset the gameboard
    function reset(){
        setTimeout(() => {
            document.getElementById('tt-winner').style.display = 'none';
        }, 2000);
        gameBoard.reset();
    }

    // update's the results
    function updateResults(){
        
        const results = document.getElementById('tt-results');
        results.innerHTML = ''; // clear out previous results
        results.style.display = 'block';
        results.innerHTML = 
        `<ul>
            <li>player's score is ${player1.score}</li>
            <li>computer's score is ${player2.score}</li>
        </ul>
        `;
    }

    // show our winner text
    function displayWinner(player){
        const winnerText = document.getElementById('tt-winner');
        winnerText.style.display = "block";
        winnerText.innerText = `${player.name} has won the match!`
    }

    function play(num){
        // check if num is valid. It should be as it is added to onclicks at runtime but just in case
        if(num < 0 || num > 9){
            console.log(`error ${num} is an invalid number`);
        } else {    // num is valid
            if (gameBoard.zones[num] === '') {  // zone is empty
                gameBoard.zones[num] = players[currentPlayer].symbol;   // set to current players symbol
                gameBoard.draw(); // update display
                
                // if a win is detected
                if(checkForWin()){
                    players[currentPlayer].score++; // increment our winner's score
                    displayWinner(players[currentPlayer]);  // display winner text
                    updateResults();
                    reset();    // reset the board and remove winner text
                    return;
                }
                currentPlayer === 1 ? currentPlayer = 0 : currentPlayer = 1; // if current player is equal to 1, set it back to 0, else set it to 1
            }
        }
    }

    //let _privateMethod = function(){}

    //Game.PublicMethod = function(){}
    console.log('invoked game function');
    return {
        game, play, players, currentPlayer
    }
})();




