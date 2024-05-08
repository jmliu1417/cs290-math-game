let box1 = document.getElementById("button1");
let box2 = document.getElementById("button2");
let box3 = document.getElementById("button3");
let box4 = document.getElementById("button4");

let addButton = document.getElementById("addButton");
let subButton = document.getElementById("subButton");
let multButton = document.getElementById("multButton");

let instructBox = document.getElementById("instructBox");

let newGameButton = document.getElementById("newGameButton");

box1.addEventListener("click", ButtonClickHandler);
box2.addEventListener("click", ButtonClickHandler);
box3.addEventListener("click", ButtonClickHandler);
box4.addEventListener("click", ButtonClickHandler);

newGameButton.addEventListener("click", newGame);

addButton.addEventListener("click", ButtonClickHandler);
subButton.addEventListener("click", ButtonClickHandler);
multButton.addEventListener("click", ButtonClickHandler);


//generates numbers between 1 and 10
function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function generateAndPlaceNumbers() {
    let numbers = [];

    //converts the string to an int using parse and adds to number array

    numbers.push(parseInt(box1.innerText = generateRandomNumber()));
    numbers.push(parseInt(box2.innerText = generateRandomNumber()));
    numbers.push(parseInt(box3.innerText = generateRandomNumber()));
    numbers.push(parseInt(box4.innerText = generateRandomNumber()));

    return numbers;
}

let goalNum = 0;

function calculateGoal(numbers) {
    let operators = ['+', '-', '*'];

    //array to store operators in random order
    let randomOperators = [];

    //initial array with first number picked
    let equation = numbers[0];

    for (let i = 0; i < 3; i++) {
        //calculates a random number between 1 and 3
        let randomIndex = Math.floor(Math.random() * operators.length);

        //selects the operator in the random index
        let operator = operators[randomIndex];

        randomOperators.push(operator);

        //update equation (i+1 accesses next number in number array)
        equation += " " + operator + " " + numbers[i + 1];
    }

    goalNum = numbers[0];
    for (let i = 0; i < 3; i++) {
        let operator = randomOperators[i];
        let nextNumber = numbers[i + 1];

        //solve for the result depending on operator
        if (operator === '+') {
            goalNum += nextNumber;
        } else if (operator === '-') {
            goalNum -= nextNumber;
        } else if (operator === '*') {
            goalNum *= nextNumber;
        }
    }

    let goalElement = document.getElementById("goalNum");

    //print it
    goalElement.innerHTML = "<h2> Goal: " + equation + " = " + goalNum + "</h2>";

    return goalNum;
}

function addToWorkSpace (input) {
    let workContainer = document.getElementById ("workContainer");

    //prints user clicked button to work container
    workContainer.innerHTML += input + " ";
}

//function calls
//number arr
let numbers = generateAndPlaceNumbers();
let goal = calculateGoal(numbers);

//contains the type of the button clicked
let lastClickedButtonType = null;

let clickedStuff = [];

numClicks = 0;

function ButtonClickHandler() {

    let input = this.innerText;
    clickedStuff.push(input);

    /* if button is a number, then it disables 
    another number being clicked */ 

    if (lastClickedButtonType !== "number") {
        let input = this.innerText;
        addToWorkSpace(input);
        lastClickedButtonType = "number";
        disableNumberButtons();
        enableOperatorButtons();

        instructBox.innerText = "Now select an operator";

    } else {

        /* if button is an operator, then it disables 
        another operator being clicked */

        if (lastClickedButtonType !== "operator") {
            let input = this.innerText;
            addToWorkSpace(input);
            lastClickedButtonType = "operator";
            enableNumberButtons();
            disableOperatorButtons();

            instructBox.innerText = "Now select a number";
        }
    }

    numClicks ++;
    if(numClicks === 3 || numClicks === 5 || numClicks === 7){
        doResult();
    }
    if (numClicks === 7){
        winLoss();
    }

}

console.log(clickedStuff);

//disables the number buttons
function disableNumberButtons() {
    box1.disabled = true;
    box2.disabled = true;
    box3.disabled = true;
    box4.disabled = true;
}

//enables them 
function enableNumberButtons() {
    box1.disabled = false;
    box2.disabled = false;
    box3.disabled = false;
    box4.disabled = false;
}

function disableOperatorButtons() {
    addButton.disabled = true;
    subButton.disabled = true;
    multButton.disabled = true;
}

function enableOperatorButtons() {
    addButton.disabled = false;
    subButton.disabled = false;
    multButton.disabled = false;
}

enableNumberButtons();
disableOperatorButtons();


console.log(clickedStuff);
console.log(numClicks);

function doResult() {
    
    for (let i = numClicks-2; i < numClicks; i=i+2){
        let result = 0;
        if (clickedStuff[i] === "+"){
            result = parseInt(clickedStuff[i-1]) + parseInt(clickedStuff[i+1]);
            clickedStuff[i+1] = result;
            addToWorkSpace("= " + result + "<br>");
        } else if (clickedStuff[i] === "-"){
            result = parseInt(clickedStuff[i-1]) - parseInt(clickedStuff[i+1]);
            clickedStuff[i+1] = result;
            addToWorkSpace("= " + result + "<br>");
        } else {
            result = parseInt(clickedStuff[i-1]) * parseInt(clickedStuff[i+1]);
            clickedStuff[i+1] = result;
            addToWorkSpace("= " + result + "<br>");
        }
    }
}

let winCounter = document.getElementById("winCounter");
let lossCounter = document.getElementById("lossCounter");

function winLoss (){
    let lastResult = clickedStuff[6];
    if (lastResult == goalNum){
        winCounter.innerText = parseInt(winCounter.innerText)+1;
        instructBox.innerText = "Yay you won!";
    } else {
        lossCounter.innerText = parseInt (lossCounter.innerText)+1;
        instructBox.innerText = "Yay you lost!";
    }
}

function newGame() {
    clickedStuff = [];
    //numbers = [];
    numClicks = 0;

    instructBox.innerText = "Let's Play!";

    let workContainer = document.getElementById ("workContainer");
    workContainer.innerHTML = "<h2>Worlspace</h2>";

    numbers = generateAndPlaceNumbers();
    goal = calculateGoal(numbers);
    
    let lastClickedButtonType = null;
    // enableNumberButtons();
    // disableOperatorButtons();
    

}