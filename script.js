// Jamie Liu
// Shraddha Hedge

// DOM specifiers for each button
let box1 = document.getElementById("button1");
let box2 = document.getElementById("button2");
let box3 = document.getElementById("button3");
let box4 = document.getElementById("button4");

// Specifiers for operation
let addButton = document.getElementById("addButton");
let subButton = document.getElementById("subButton");
let multButton = document.getElementById("multButton");

// Instruction box
let instructBox = document.getElementById("instructBox");

// New Game button
let newGameButton = document.getElementById("newGameButton");

// Event listeners
box1.addEventListener("click", ButtonClickHandler);
box2.addEventListener("click", ButtonClickHandler);
box3.addEventListener("click", ButtonClickHandler);
box4.addEventListener("click", ButtonClickHandler);

//new game event listener
newGameButton.addEventListener("click", newGame);

//operation event listeners
addButton.addEventListener("click", ButtonClickHandler);
subButton.addEventListener("click", ButtonClickHandler);
multButton.addEventListener("click", ButtonClickHandler);


//generates numbers between 1 and 10
function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

/* 
Generates and places random numbers and pushes it into the given buttons
*/
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

/* Ensures goal is veritable */
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

    //iterates through the numbers array and adds random operations
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
    goalElement.innerHTML = "<h2> Goal: "  + goalNum + "</h2>";

    return goalNum;
}

/* Sets up appeding to work container */
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

//contains all the user inputs, appends later
let clickedStuff = [];

//how many times the user clicks a button successfully
let numClicks = 0;

//how many times a full equation is finished
let eqCounter = 0;

//global var to store final user calculated
let bruhFinal = 0;

//butten event handler. this handles a lot.
function ButtonClickHandler() {

// button clicked input goes into cllicked stuff
    let input = this.innerText;
    clickedStuff.push(input);

    /* if button is a number, then it disables 
    another number being clicked */ 

    //if the previous onclick was an operation
    if (lastClickedButtonType !== "number") {

        //add input to the workspace, set prev to number
        let input = this.innerText;
        addToWorkSpace(input);
        lastClickedButtonType = "number";

        //disable buttons, enable operations
        disableNumberButtons();
        enableOperatorButtons();

        instructBox.innerText = "Now select an operator";

        //if this was the first number selected, grey out and remove the number
        if(clickedStuff.length === 1){
            this.style.backgroundColor = "lightgray";
            //this.innerText = "";
        }

    } else {

        /* if button is an operator, then it disables 
        another operator being clicked */

        if (lastClickedButtonType !== "operator") {

            //add operator to workspace, set prev to operator
            let input = this.innerText;
            addToWorkSpace(input);
            lastClickedButtonType = "operator";
            
            //enable all buttons, then disable prev clicked ones 
            enableNumberButtons();
            if(box1.style.backgroundColor === "lightgray"){
                box1.disabled = true;
            }  if (box2.style.backgroundColor === "lightgray"){
                box2.disabled = true;
            }  if(box3.style.backgroundColor === "lightgray"){
                box3.disabled = true;
            } if(box4.style.backgroundColor === "lightgray"){
                box4.disabled = true;
            }
            
            //disable all the operator buttons
            disableOperatorButtons();

            //change instructions
            instructBox.innerText = "Now select a number";
        }

    }

    //increase number of clicks
    numClicks ++;
    
    //first check if 3 buttons have been clicked
    if(numClicks === 3){
        //print result
        doResult();
        // add to the current button
        parseInt(this.innerText = result);

        //single equation has passed
        eqCounter ++;
    }

    //if the math array is equal to 3 (yes this is the same thing as checkingnum clicks)
    if(clickedStuff.length === 3){

        //if 3 equations have been calculated
        if(eqCounter === 3){
            //recieve final into global var
            bruhFinal = clickedStuff[2];

            //run win calculation
            winLoss();

            //exit event
            return;
        }
        //otherwise:

        //clear the current array for next equation
        clickedStuff = [];
        //reset to the original function
        lastClickedButtonType = null;

        //enable numbers, check for previously clicked numbers
        enableNumberButtons();
        if(box1.style.backgroundColor === "lightgray"){
            box1.disabled = true;
        }  if (box2.style.backgroundColor === "lightgray"){
            box2.disabled = true;
        }  if(box3.style.backgroundColor === "lightgray"){
            box3.disabled = true;
        } if(box4.style.backgroundColor === "lightgray"){
            box4.disabled = true;
        }
        
        //disable operations
        disableOperatorButtons();

        //update instructions
        instructBox.innerText = "Now select a number";

        //update number clicked
        numClicks = 0;
    }
}



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

//store result global
let result = 0;

function doResult() {

    for (let i = numClicks - 2; i < numClicks; i = i + 2) {
        if (clickedStuff[i] === "+") {
            result = parseInt(clickedStuff[i - 1]) + parseInt(clickedStuff[i + 1]);
            clickedStuff[i + 1] = result;
            addToWorkSpace("= " + result + "<br>");
        } else if (clickedStuff[i] === "-") {
            result = parseInt(clickedStuff[i - 1]) - parseInt(clickedStuff[i + 1]);
            clickedStuff[i + 1] = result;
            addToWorkSpace("= " + result + "<br>");
        } else {
            result = parseInt(clickedStuff[i - 1]) * parseInt(clickedStuff[i + 1]);
            clickedStuff[i + 1] = result;
            addToWorkSpace("= " + result + "<br>");
        }

    }
}

let winCounter = document.getElementById("winCounter");
let lossCounter = document.getElementById("lossCounter");
let gameCount = 0;

function winLoss (){
    let lastResult = clickedStuff[2];
    if (bruhFinal === goalNum){
        winCounter.innerText = parseInt(winCounter.innerText)+1;
        instructBox.innerText = "Yay you won!";
        gameCount ++;
    } else {
        lossCounter.innerText = parseInt (lossCounter.innerText)+1;
        instructBox.innerText = "Oops you lost!";
        gameCount ++;
    }

    disableNumberButtons();
    disableOperatorButtons();
}


function newGame() {
    clickedStuff = [];
    numClicks = 0;
    eqCounter = 0;
    bruhFinal = 0;

    instructBox.innerText = "Let's Play!";

    let workContainer = document.getElementById ("workContainer");
    workContainer.innerHTML = "<h2>Work Space</h2>";

    numbers = generateAndPlaceNumbers();
    goal = calculateGoal(numbers);
    
    lastClickedButtonType = null;

    box1.style.backgroundColor = "";
    box2.style.backgroundColor = "";
    box3.style.backgroundColor = "";
    box4.style.backgroundColor = "";

    if (gameCount % 2 === 0){
        enableNumberButtons();
        disableOperatorButtons();

    } else {
        disableOperatorButtons();
        enableNumberButtons();
    }

}