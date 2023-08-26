const newGameBtn = document.getElementById('new-game');
const scoreboardBtn = document.getElementById('scoreboard');

newGame = () => {
    newGameBtn.addEventListener("click", e => {
        console.log(e); 
        window.location.assign('game.html');
    });
}

scoreBoard = () => {
    scoreboardBtn.addEventListener("click", e => { 
        window.location.assign('scoreboard.html');
    });
}

newGame();
scoreBoard();