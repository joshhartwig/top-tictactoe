




// module pattern for game
let Game = (function (){
    let Game = {};
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