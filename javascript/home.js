const newGameBtn = document.getElementById('play-boggle');
const scoreboardBtn = document.getElementById('use-calculator');

playBoggle = () => {
    newGameBtn.addEventListener("click", e => {
        console.log(e); 
        window.location.assign('boggle.html');
    });
}

useCalculator = () => {
    scoreboardBtn.addEventListener("click", e => { 
        window.location.assign('calculator.html');
    });
}

playBoggle();
useCalculator();