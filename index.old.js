
// module pattern for game
let Game = (function (){
    let Game = {};

    const gameboard = document.getElementById('tt-gameboard');
    const gridPixelHeight = 10;
    const gridPixelWidth = 10;
    const gridSize = 3;

    

    let _resetDivs = function (){
      gameboard.innerHTML = '';
    }
    //let _privateMethod = function(){}

    //Game.PublicMethod = function(){}
    
    return Game;
})();


// factory pattern
  const Player = (name) => {
    const describe = () => console.log('described');
    return {describe}
  }

  const player1 = new Player('bob');
  player1.describe();



  const display = document.getElementById('tt-gameboard');
const button = document.getElementById('tt-form-button');
let results = [];
let currentPlayer = '';
let gameboard = [];
const gridHeight = 3;
const gridWidth = 3;

function startGame(name){
    disableButton();    // disable button so you can start game mid game
    currentPlayer = name; // capture player's name
    let gridSize = gridHeight * gridWidth; // set gameboard size and create it

    // populate array and update display
    for (i = 1; i < gridSize + 1; i++){
        gameboard.push(createZoneFactory(i,'empty'));
    }
    updateDisplay();
}

function disableButton(){
    document.getElementById('tt-form-button').disabled = true;
}

function enableButton(){
    document.getElementById('tt-form-button').disabled = false;
}

function removeOnClickFromGrids(){
    let grids = document.querySelectorAll('.grid-item');
    for (let i = 0; i < grids.length; i++) {
        grids[i].onclick = "";
    }
}

function addOnClickToGrids(){
    let grids = document.querySelectorAll('.grid-item');
    for (let i = 0; i < grids.length; i++) {
        let x = grids[i];
        let num = x.dataset.id;
        grids[i].onclick = selectZone(`${num},player`);
    }
}

// this is called when user clicks zone, checks if value is correct, then checks if zone is 'owned'
function selectZone(num,player){
    if(num > 9 || num < 0){
        console.log(`${num} is not allowed`);
        return false;
    }
    if(gameboard[num].owner == ''){
        gameboard[num].owner = player;
        updateDisplay();
        return true;
    } else {
        console.log(`${num} by ${player} is not a valid and currently in play by ${gameboard[num].owner}`);
        return false;
    }
}

function createZoneFactory(area, owner){
    return {
        area: area,
        owner: owner,
        display() {
            console.log(`${area} ${owner}`);
        },
    };
}

function updateDisplay(){
    //loop through gameboard update inner html, player = x, computer = o, nothing = 0
    for (i = 0; i < (gridHeight * gridWidth); i++){
        if(gameboard[i].owner === 'player') {
            document.getElementById(`grid${i}`).innerText = 'X';
        }
        else if(gameboard[i].owner === 'computer') {
            document.getElementById(`grid${i}`).innerText = 'O';
        }
        else {
            document.getElementById(`grid${i}`).innerText = '';
        }
    }
}



//begin game captures name, disables button and waits for select
//selectZone gets called with a numeric value for the zone, if zone is open, take it
//update display to show entry
//check for win
//next computer makes a select zone random call

//TODO: Check if Winner
//TODO: If not Computer plays (for now pick random)
//TODO: Check if Winner

