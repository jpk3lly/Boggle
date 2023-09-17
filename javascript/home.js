const newGameBtn = document.getElementById('play-boggle');
const calculatorBtn = document.getElementById('use-calculator');
const quizBtn = document.getElementById('play-quiz');

playBoggle = () => {
    newGameBtn.addEventListener("click", e => {
        window.location.assign('boggle.html');
    });
}
playBoggle();

useCalculator = () => {
    calculatorBtn.addEventListener("click", e => { 
        window.location.assign('calculator.html');
    });
}
useCalculator();

playQuiz = () => {
    quizBtn.addEventListener("click", e => { 
        window.location.assign('quiz.html');
    });
}
playQuiz();