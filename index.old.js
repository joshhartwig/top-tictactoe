
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