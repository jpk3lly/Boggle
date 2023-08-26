/* CONSTANTS & VARIABLES */

const buttons = Array.from(document.getElementsByClassName('answer-btn'));
const functionButtons = Array.from(document.getElementsByClassName('function-btn'));
const submitButton = document.getElementById('submit-btn');
const clearButton = document.getElementById('clear-btn');
const answerWindow = document.getElementById('answer-window');
const calculationWindow = document.getElementById('calculation-window');
const acceptedAnswers = document.getElementById('accepted-answers');


let currentNumber;
let currentFunction;
let selectedFunction;
let currentCalculation;
let submittedNumbers = [];
let wordDefinition = [];
let wordScore = 0;
let totalScore = 0;


/* READING THE BUTTON PUSHES TO MAKE TO ANSWERS */

userAnswer = () => {


    buttons.forEach(button => {
        button.addEventListener('click', e => {
            const selectedDigit = e.target;
            let selectedNumber = selectedDigit.id;
            if(currentNumber === undefined){
                currentNumber = selectedNumber;
            }
            else{
                currentNumber = currentNumber + selectedNumber;
            }
            answerWindow.innerText = currentNumber
        });
    });
};

userAnswer();

userFunction = () => {
    functionButtons.forEach(functionButton => {
        functionButton.addEventListener('click', e => {
            selectedFunction = e.target;
            submittedNumbers = currentNumber;
            currentNumber = '';
            currentFunction = selectedFunction;
        });
    });
};
userFunction();

/* SETTING THE SUBMIT ACTION TO SAVE THE WORD AND THEN LET THE USER FIND ANOTHER WORD*/
submitAnswer = () => {

    submitButton.addEventListener("click", e => {
        calculateAnswer();
    });
}

submitAnswer();

calculateAnswer = () => {
    if(currentFunction.id === '+'){
        answer = Number(submittedNumbers) + Number(currentNumber)
        currentCalculation = `${submittedNumbers} ${currentFunction.id} ${currentNumber}`;
        submittedNumbers = currentNumber;
        currentNumber = answer;
    }
    else if(currentFunction.id === '-'){
        answer = Number(submittedNumbers) - Number(currentNumber)
        currentCalculation = `${submittedNumbers} ${currentFunction.id} ${currentNumber}`;
        submittedNumbers = currentNumber;
        currentNumber = answer;
    }
    else if(currentFunction.id === '*'){
        answer = Number(submittedNumbers) * Number(currentNumber)
        currentCalculation = `${submittedNumbers} ${currentFunction.id} ${currentNumber}`;
        submittedNumbers = currentNumber;
        currentNumber = answer;
    }
    else if(currentFunction.id === '/'){
        answer = Number(submittedNumbers) / Number(currentNumber)
        currentCalculation = `${submittedNumbers} ${currentFunction.id} ${currentNumber}`;
        submittedNumbers = currentNumber;
        currentNumber = answer;
    }
    // TODO TRY TO FIGURE OUT HOW TO GET THE PERCENTAGE AND PARENTHESIS BUTTONS TO WORK.
    /*
        else if(currentFunction.id === '%'){
        answer = answer * (1 / Number(currentNumber))
        currentCalculation = `${submittedNumbers} ${currentFunction.id} ${currentNumber}%`;
        console.log((1 / Number(currentNumber)));
        submittedNumbers = currentNumber;
        currentNumber = answer;
    }*/
    calculationWindow.innerText = currentCalculation;
    answerWindow.innerText = answer;    
};

/* SETTING THE CLEAR ACTION*/
resetButton = () => {
    clearButton.addEventListener("click", e => {
        console.log(e);
        currentNumber = '';
        calculationWindow.innerText = 0
        answerWindow.innerText = 0;
    });
}

resetButton();


// TODO - SORT THE STYLING ON THE ANSWER WINDOW SO IT LOOKS LIKE 1 WINDOW
// TODO - SORT THE STYLING IN GENERAL