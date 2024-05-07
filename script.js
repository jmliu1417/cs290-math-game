let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");



function generateNumbers(currentButton){
    let randNum = Math.floor(Math.random()*21);
    currentButton.innerText = randNum;

    return randNum;
}

function calcGoal(){
    
    for(let i=0; i < 4; i++){
        
    }
}