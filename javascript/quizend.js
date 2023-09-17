const username = document.getElementById('username');               // saving the user's input in the username field into a variable
const saveScoreBtn = document.getElementById('saveScoreBtn');       // adding the save button to a variable so we can dynamically enable and disable it
const finalScore = document.getElementById('finalScore');           // adding the finalscore elemant to a variable so we can push the user's total score to it at the end
const mostRecentScore = localStorage.getItem('mostRecentScore');    // pulling the total score from local storage

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];  // creates an array of scores.
const MAX_HIGH_SCORES = 10;


finalScore.innerText = mostRecentScore;                             // setting the final score element to the total score from local storage 
username.addEventListener('keyup', () => {                          // function has an event listener for when the username field is filled in, if there is a value in there it enables the save button, if not it disables it. 
saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) =>{                                             // this function stops the form from sending the data to a new page which is it's default action.
    e.preventDefault();

const score = {
    score: mostRecentScore,
    name: username.value
};

highScores.push(score);                                             // this adds the current score to the array of scores

highScores.sort((a,b) => {                                          // this function sorts the scores from highest to lowest
    return b.score - a.score;
});
highScores.splice(10);                                               // this removes the lowest scores from the array if there are more than 10 in there.

localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign('/');
};