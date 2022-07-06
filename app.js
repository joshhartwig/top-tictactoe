


// gameboard
let gameBoard = (() => {
    const zones = [];
    for (i = 0; i < 9; i++){
        zones.push('');
    }
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
    }
    return {
        draw, debug, zones
    }
})();

// our players, each should have a name (ex player and computer) and a symbox (ex X O)
const createPlayer = (name, symbol) => {
    const describe = () => console.log(`${name} ${symbol}`);
    return {name, symbol, describe}
  }

let game = (() => {
    let game = {};

    // create our players
    const player1 = createPlayer('player','X');
    const player2 = createPlayer('computer','O');
    
    // add them to an array, we will alternate between them to take turns and track player with currentPlayer
    let players = [];
    players.push(player1);
    players.push(player2);
    let currentPlayer = 0;

    // draw the gameboard
    gameBoard.draw();
    function play(num){
        // check if num is valid. It should be as it is added to onclicks at runtime but just in case
        if(num < 0 || num > 9){
            console.log(`error ${num} is an invalid number`);
        } else {    // num is valid
            if (gameBoard.zones[num] === '') {  // zone is empty
                gameBoard.zones[num] = players[currentPlayer].symbol;   // set to current players symbol
                gameBoard.draw(); // update display
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




