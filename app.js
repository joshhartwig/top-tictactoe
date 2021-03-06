//TODO: branch code and change functionality of play to be a button click
//TODO: the button click can capture name from form if needed. 
//TODO: the click should trigger picking a zone, checking for winner then ai picking a zone
//TODO: can we make the ai easy or hard based on slider? easy should pick open spots based on random, hard should always try to choose next number from list of win strats
//TODO: computer ai = easy ? random pick, hard should be a pick from known win patterns or else random
//TODO: change the layout to have the winner details on the right side of the grid and who is currently playing on the left
//TODO: fix the draw mechanism. It does not currently exist
//TODO: clicking play sets global boolean to true game is in play and adds the handlers via draw

// object manages state of the gameboard
let gameBoard = (() => {
  let gameBoard = {};
  let zones = Array(9).fill('');
  function setZoneSymbol(num,symbol){
    if(zones[num] === ''){
      zones[num] = symbol;
      return true;
    }
    return false;
  }
  function freeZones(){
    let results = [];
    for (i = 0; i < zones.length; i++){
      if(zones[i] === ''){
        results.push(i);
      }
    }
    return results;
  }
  function draw() {
    // hook the container and draw the grid zones
    const container = document.getElementById('tt-gameboard');
    container.innerHTML = ''; // clear the elements and recreate them
    for (i = 0; i < zones.length; i++) {
      const zone = document.createElement('div');
      zone.className = 'grid-item';
      zone.setAttribute('data-id', `${i}`);
      zone.innerHTML = `<span class='grid-text'>${zones[i]}</span>`;

      // if zone has no symbol set, add an onclick so it can be set
      // will keep track of current player in global scope
      if (zones[i] === '') {
        zone.setAttribute('onclick', `game.play(${i})`);
      }

      container.appendChild(zone);
    }
  }
  function debug() {
    let debugString = '';
    if (zones.length === 0) {
      console.log('zones = 0. Not initialized.');
      return;
    } else {
      for (i = 0; i < zones.length; i++) {
        if (i % 3 === 0) {
          debugString += '\n';
        }
        if (zones[i] === '') {
          debugString += '*'; // an asterik will represent empty cell
        } else {
          debugString += zones[i]; // if not empty draw symbol
        }
      }
      console.log('An Empty Cell = *...');
      console.log(debugString);
    }
  }
  function reset() {
    zones.fill('');
  }
  return {
    gameBoard,
    freeZones,
    setZoneSymbol,
    draw,
    debug,
    reset,
    zones,
  };
})();

// our players, each should have a name (ex player and computer) and a symbox (ex X O)
const createPlayer = (name, symbol, score) => {
  const describe = () => console.log(`${name} ${symbol} ${score}`);
  return { name, symbol, score, describe };
};

// controls the overall game flow
let game = (() => {
  let game = {};
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // create our players
  const player1 = createPlayer('player', 'X', 0);
  const player2 = createPlayer('computer', 'O', 0);

  // add them to an array, we will alternate between them to take turns and track player with currentPlayer
  let players = [];
  players.push(player1);
  players.push(player2);
  let currentPlayer = 0;

  // draw the gameboard
  gameBoard.draw();

  // checks for win
  function checkForWin() {
    let result = false;
    winningCombos.forEach((item, index) => {
      if (
        gameBoard.zones[item[0]] === players[currentPlayer].symbol &&
        gameBoard.zones[item[1]] === players[currentPlayer].symbol &&
        gameBoard.zones[item[2]] === players[currentPlayer].symbol
      ) {
        console.log(`winner is ${players[currentPlayer].name}`);
        result = true;
      }
    });
    return result;
  }

  // set our winner text to hidden after 2 seconds and reset the gameboard
  function reset() {
    setTimeout(() => {
      document.getElementById('tt-winner').style.display = 'none';
    }, 2000);
    currentPlayer = 0;
  }

  // update's the results
  function updateResults() {
    const results = document.getElementById('tt-results');
    results.innerHTML = ''; // clear out previous results
    results.style.display = 'block';
    results.classList.add('tt-results-info');
    results.innerHTML = `<ul class='tt-results-info'>
            <li>player's score is ${player1.score}</li>
            <li>computer's score is ${player2.score}</li>
        </ul>
        `;
  }

  // show our winner text
  function displayWinner(player) {
    const winnerText = document.getElementById('tt-winner');
    winnerText.style.display = 'block';
    winnerText.classList.add('tt-winner-info');
    winnerText.innerText = `${player.name} has won the match!`;
  }

  // play function
  function play(num) {
    // check if num is valid. It should be as it is added to onclicks at runtime but just in case
    if (num < 0 || num > 9) {
      console.log(`error ${num} is an invalid number`);
    } else {
      // num is valid
      //TODO: move set zone to gameboard as method (ex gameboard.setZone(num,symbox) returns true)
      if (gameBoard.zones[num] === '') {
        // zone is empty
        gameBoard.zones[num] = players[currentPlayer].symbol; // set to current players symbol
        gameBoard.draw(); // update display

        // if a win is detected
        if (checkForWin()) {
          setTimeout(() => {
            players[currentPlayer].score++; // increment our winner's score
            displayWinner(players[currentPlayer]); // display winner text
            updateResults();
            reset(); // remove winner text
            gameBoard.reset(); //reset gameboard
            gameBoard.draw();
            return;
          }, 1000); 
        }
        // else computer picks open number
        currentPlayer === 1 ? (currentPlayer = 0) : (currentPlayer = 1); // if current player is equal to 1, set it back to 0, else set it to 1
        computerPlay();
      }
    }
  }
  function computerPlay(){
      let rnd = getRandomInt(0,gameBoard.freeZones().length); // generate a random number between 0 and the size of the avail zones
      let availZones = gameBoard.freeZones();
      const num = availZones[rnd]; // pick a number from one of the free zones
      gameBoard.setZoneSymbol(num,players[currentPlayer].symbol); // grab a free zone with that number 
      gameBoard.draw();

      if (checkForWin()) {
        setTimeout(() => {
          players[currentPlayer].score++; // increment our winner's score
          displayWinner(players[currentPlayer]); // display winner text
          updateResults();
          reset(); // remove winner text
          gameBoard.reset(); //reset gameboard
          gameBoard.draw();
        }, 1000); 
      }
    currentPlayer === 1 ? (currentPlayer = 0) : (currentPlayer = 1);
  }
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  console.log('invoked game function');
  return {
    game,
    play,
    players,
    currentPlayer,
  };
})();
