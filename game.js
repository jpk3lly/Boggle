/* CONSTANTS & VARIABLES */ 

const letterBlocks = Array.from(document.getElementsByClassName('btn btn-outline-secondary'));
const answerWindow = document.getElementById('answer');
const acceptedAnswers = document.getElementById('accepted-answers');
const submitButton = document.getElementById('submit-btn');
const clearButton = document.getElementById('clear-btn');
const timer = document.getElementById('timer');
const score = document.getElementById('score-view');
const answerDefinition = document.getElementById('answer-definition');
const onePoint = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'S', 'T', 'R'];
const twoPoints = ['D', 'G'];
const threePoints = ['B', 'C', 'M', 'P'];
const fourPoints = ['F', 'H', 'V', 'W', 'Y'];
const fivePoints = ['K'];
const eightPoints = ['J', 'X'];
const tenPoints = ['Q', 'Z'];


let selectedWord = '';
let submittedAnswers = [];
let timeRemaining = 120;
let wordDefinition = [];
let wordScore = 0;
let totalScore = 0;



/* CREATING THE NEW GAME BOARD */ 

// function to generate a random letter
generateRandomLetters = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    let charLength = letters.length;
    let randomLetter = Math.floor(Math.random()* charLength);
    let result = letters.charAt(randomLetter);
    return result;
}

//loop that creates a new board of random letters
letterBlocks.forEach( letterBlock  => {
    letterBlock.dataset['newLetter'];
    letterBlock.innerText = generateRandomLetters();
})

//set initial score on screen to 0
updateScore = () => {
    score.innerText = totalScore;
}


/* READING THE BUTTON PUSHES TO MAKE TO ANSWERS */

userAnswer = () => {
    letterBlocks.forEach( letterBlock  => {
        letterBlock.addEventListener("click", e => {
            if(letterBlock.classList.contains('btn-success')){
                letterBlock.classList.add('btn-warning')
                console.log(letterBlock.classList)
                setTimeout( () => {
                    letterBlock.classList.remove('btn-warning');
                }, 500);            
            }
            else{
            const selectedChoice = e.target;  
            let selectedLetter = selectedChoice.innerText;
            selectedWord = selectedWord + selectedLetter;
            answerWindow.innerText = selectedWord;
            letterBlock.classList.remove('btn-outline-secondary')
            letterBlock.classList.add('btn-success')
            }
        });
    });
}

userAnswer();

/* SETTING THE SUBMIT ACTION TO SAVE THE WORD AND THEN LET THE USER FIND ANOTHER WORD*/
submitAnswer = () => {

    submitButton.addEventListener("click", e => { 
        letterBlocks.forEach( letterBlock  => {
            letterBlock.classList.remove('btn-success')
            letterBlock.classList.add('btn-outline-secondary')
        });
        validateWord();
    });
}


/* SETTING THE CLEAR ACTION*/
resetButton = () => {
    clearButton.addEventListener("click", e => { 
        console.log(e);
        clearAnswer();
    });
}

resetButton();


clearAnswer = () => {
    letterBlocks.forEach( letterBlock  => {
        letterBlock.classList.remove('btn-success');
        letterBlock.classList.add('btn-outline-secondary');
        answerWindow.classList.remove('text-bg-danger');
        answerWindow.classList.remove('text-bg-success');
        answerWindow.classList.remove('text-bg-warning');
        });
    selectedWord = '';
    answerWindow.innerText = selectedWord;
    answerDefinition.innerText = '';
}

/* USE DICTIONARY API TO VALIDATE ANSWERS*/ 


validateWord = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`)
    .then((response) => response.json())
    .then((data) => {
        if(data.title === 'No Definitions Found'){
            notAWord();
        }
        else if(submittedAnswers.includes(selectedWord)){
            console.log(submittedAnswers);
            console.log(selectedWord);
            alreadyUsedWord();
        } 
        else{
            wordDefinition = `${data[0].word} - ${data[0].meanings[0].definitions[0].definition}`;
            answerDefinition.innerText = `${data[0].meanings[0].definitions[0].definition}`;
            submittedAnswers.push(selectedWord); 
            acceptedAnswers.innerHTML = submittedAnswers.map(answer => {                    
                return `<li class="list-group-item">${answer}</li>`
            }).join("");
            answerWindow.classList.add('text-bg-success')
            answerWindow.innerText = selectedWord;
            individualWordScore();
            setTimeout( () => {
                clearAnswer();
            }, 200);
        };
    });
}

notAWord = () =>{
    answerWindow.classList.add('text-bg-danger')
    answerWindow.innerText = 'Not A Word!!';
    setTimeout( () => {
        clearAnswer();
    }, 200);
}

alreadyUsedWord = () =>{
        answerWindow.classList.add('text-bg-warning')
        answerWindow.innerText = 'Had that one already!!';
        setTimeout( () => {
            clearAnswer();
        }, 200);
}

/* GAME TIMER */

countDown = () => {
    let countdownTimer = setInterval(function(){
        if(timeRemaining <= 0){
            saveScores();
            clearInterval(timeRemaining);
            window.location.assign('end.html');
        } 
        else {
            timer.innerText = timeRemaining;
        }
        timeRemaining--
    }, 1000);
};

/* KEEPING SCORE */
individualWordScore = () =>{
    for (var i = 0; i < selectedWord.length; i++){
        if(twoPoints.includes(selectedWord.charAt(i))){
            totalScore = totalScore + 2;
            updateScore();
        }
        else if(threePoints.includes(selectedWord.charAt(i))){
            totalScore = totalScore + 3;
            updateScore();
        }
        else if(fourPoints.includes(selectedWord.charAt(i))){
            totalScore = totalScore + 4;
            updateScore();
        }
        else if(fivePoints.includes(selectedWord.charAt(i))){
            totalScore = totalScore + 5;
            updateScore();
        }
        else if(eightPoints.includes(selectedWord.charAt(i))){
            totalScore = totalScore + 8;
            updateScore();
        }
        else if(tenPoints.includes(selectedWord.charAt(i))){
            totalScore = totalScore + 10;
            updateScore();
        }
        else{
        totalScore = totalScore + 1;
        updateScore();
        }        
    }
}

/* SAVING SCORE TO LOCAL STORAGE FOR SCOREBOARD */
saveScores = () =>{
    localStorage.setItem('mostRecentScore', totalScore, 'wordCount', submittedAnswers.length);
    localStorage.setItem('words', submittedAnswers);
    localStorage.setItem('wordCount', submittedAnswers.length);
}


countDown();
submitAnswer();

// TODO - see if we can find out how to only let users select letters that are touching each other
// TODO - Get the list of selected words to show on the game over screen
// TODO - sort some cool styling
// TODO - Finish the other pages off.

