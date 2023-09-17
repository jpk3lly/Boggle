/*  the question variable locates the tag with the id of question so that it can
    push the relevant question text into it later on.
    
    the choices variable does the same thing with the options for an answer, as there
    are a number of different answers available, instead of using getElementById we
    are using getElementByClassName to return all the choice-text elements.
    */

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const quitButton = document.getElementById('quit-btn');

let currentQuestion = {};       // variable to count what question the user is on
let acceptingAnswers = true;    // bool variable to set when we can select the answers
let score = 0;                  // score variable does what it says on the tin
let questionCounter = 0;        // questionCounter counts the total number of questions
let availableQuestions = [];    // availableQuestions is an array of unanswered questions
let questions = [];

fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
.then(res => {
    return res.json();
}).then( loadedQuestions => {
    questions = loadedQuestions.results.map( loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        const answerChoices =[... loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*3) +1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index +1)] = choice;
        })
        return formattedQuestion;
    })
    startGame();
})
.catch(err => {
    console.error(err);
});

// CONSTANTS

const CORRECT_BONUS = 10;                               // sets the score for getting a question correct
const MAX_QUESTIONS = 10;                                // sets the number of questions asked during the game

startGame = () => {                                     // The function that is called to start the game
    questionCounter = 0;                                // sets score and question counter to 0 
    score = 0;
    availableQuestions = [...questions];                // applies the questions
    getNewQuestion();                                   // runs the getNewQuestion function
    game.classList.remove('hidden');                    // unhides the game when a new question has loaded
    loader.classList.add('hidden');                     // hides the loader animation when a new question has loaded              
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        
        return window.location.assign('quizend.html');
    }                                                   // If all questions have been answered user transported to the game over page.

    questionCounter++;                                  // iterates the question count up by 1
    progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;  //dynamically updates the question score in the HUD
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;  // dynamically updates the size of the progress bar based on how many questions you've got through.
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length); // selecting a random question from the list of available questions, the Math Floor and * availableQuestions.length either side of the Math.random, sets the random number to be bound by the total number of avalable questions. 
    currentQuestion = availableQuestions[questionIndex];        // selects the available questions based on the random number generated above.
    question.innerHTML = currentQuestion.question;              // updates the question on screen

    choices.forEach( choice => {                                // This loops through each choice on screen
        const number = choice.dataset['number'];                
        choice.innerHTML = currentQuestion['choice'+ number];    // and adds a possible answer to each.
    })

    availableQuestions.splice(questionIndex, 1);         // removes the question just answered from the available questions list

    acceptingAnswers = true;                             // sets acceptingAnswers to true            
}

choices.forEach(choice => {                             // this loops through each option on screen and then if one of them is clicked:
    choice.addEventListener("click", e => { 
        if(!acceptingAnswers) return;                   // if accepting answers is set to false, it ignore is

        acceptingAnswers = false;                       // if accepting answers is set to true, it sets accepting answers to false
        const selectedChoice = e.target;                // and accepts the users answer and gets another question.
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'   // this is a shortform version of an if statement so if the selected is the correct answer the classToApply variable is set to correct otherwise it's set to incorrect
        
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);                                 // this adds the classToApply variable to the element on the page so we can control the styling dependent on whether the question is answered correctly or not

        setTimeout( () => {                                                                       // this then removes that class after 1000 miliseconds and gets the next question.
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

forfeitGameButton = () => {
    quitButton.addEventListener("click", e => { 
        console.log(e);
        const response = confirm('Are you sure you want to quit? Your progress will be lost');

        if(response){
            window.location.assign('quiz.html');
        }
    });
}

forfeitGameButton();