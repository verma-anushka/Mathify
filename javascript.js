let body = document.getElementsByTagName("body")[0];

// Variables
var isPlay = false;
var score;
var types;
var rightAnswer;
var totalOptions = 4;
var images = [ "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16"]; // images
let img = document.getElementById("question-img");
img.innerHTML = '<img id="question-img" src="./images/q0.jpg" width="400" height="200">';

// HTML elements
let rightAnsPopUp = document.getElementById("rightAns");
let wrongAnsPopUp = document.getElementById("wrongAns");
var allOptions = document.getElementsByClassName("option");
var scoreContainer = document.getElementById("score");
var gameOverContainer = document.getElementById("gameOver");

// Countdown
var initialCount = 60,
 	count = initialCount,
    timerPause = false,
    timeInterval;
var timerContainer = document.getElementById("timer");
var value = document.getElementById("count");
var pause = document.getElementById("pause");
var lt = document.getElementById("timer-lt");
var rt = document.getElementById("timer-rt");

// Sounds
// var ticking = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/174721__drminky__watch-tick.wav');
// var gameOverSound = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/Elevator_Ding-SoundBible.com-685385892.mp3');
var ticking = new Audio('sounds/tick-tock.mp3');
var correct = new Audio('sounds/correct.mp3');
var incorrect = new Audio('sounds/incorrect.mp3');
var gameOverSound = new Audio('sounds/gameOver.mp3');


// Start Game
document.getElementById("start").onclick = function(){

    gameOverContainer.classList.add("no-show");
    if (isPlay){
        location.reload(); // Restart button - Reload page
    }else{
        isPlay = true;
        score = 0;
        document.getElementById("score-value").innerHTML = score;
        document.getElementById("start").innerHTML = "Restart"; // Start -> Restart
        scoreContainer.classList.remove("no-show");

        // Countdown Counter
        timerContainer.classList.remove("no-show");
        ticking.play(); // Sound
        timer();
        timeInterval = setInterval(timer, 1000);
        lt.style.animationPlayState = "paused";
        rt.style.animationPlayState = "paused";

        generateMCQs();
    }

}
// Countdown
function timer() {	    

    if (!timerPause) {
        ticking.play(); // Sound
        
        body.style.opacity = "1";
        document.getElementById("pausedMsg").classList.add("no-show");
        document.getElementById("question").classList.remove("no-show");
        document.getElementById("options").style.opacity = "1";

        lt.style.animationPlayState = "running";
        rt.style.animationPlayState = "running";
	  	count = count - 1;
	  	if (count <= -1) {
	  		count = initialCount;
            // var el = document.getElementById("circle-timer");
	        // el.before( el.cloneNode(true) ).remove();
	  	} 
        value.innerHTML = count;
  	}else{
        document.getElementById("question").classList.add("no-show");
        document.getElementById("options").style.opacity = "0.05";
        document.getElementById("pausedMsg").classList.remove("no-show");

        lt.style.animationPlayState = "paused";
        rt.style.animationPlayState = "paused";
    }
    if(count === 0){
        gameOver();
    }
}
pause.addEventListener("click", function(){
  	pause.classList.toggle('paused');
    if (pause.classList.contains('paused')) {
		timerPause = true;
	} else {
		timerPause = false;
	}
});


// Answer check
for(var i=1; i<=totalOptions; i++){

    document.getElementById("option" + i).onclick = function(){
        if(isPlay){

            // Right answer 
            if(this.innerHTML == rightAnswer){
                correct.play(); // Sound
                // Update score
                score += 2; 
                document.getElementById("score-value").innerHTML = score;
                // Showing popup message (1 sec)
                rightAnsPopUp.style.display = "block";
                wrongAnsPopUp.style.display = "none";
                setTimeout(function(){
                    rightAnsPopUp.style.display = "none";
                }, 1000);
                generateMCQs();
            }
            // Wrong answer
            else{
                incorrect.play(); // Sound
                // Update score
                score--;
                document.getElementById("score-value").innerHTML = score;
                // Showing popup message (1 sec)
                wrongAnsPopUp.style.display = "block";
                rightAnsPopUp.style.display = "none";
                setTimeout(function(){
                    wrongAnsPopUp.style.display = "none";
                }, 1000);
            }
        }
    };
}

// Generate answers
function generateAnswers(no1,no2,typesIndex){

    var ans;
    var a = parseInt(no1);
    var b = parseInt(no2);

    switch(typesIndex){
        case 0: ans = a + b;
                break;
        case 1: ans = a - b;
                break;
        case 2: ans = a * b;
                break;
        case 3: ans = a * b;
                break;
        case 4: ans = (a / b).toFixed(1);
                break;
        // case 5: ans = Math.pow(a,b);
        //         break;
    }
    return ans;
}

// Generate questions 
function generateMCQs(){

    var answers = [];
    types = ['+','-','*','*','/'];
    typesIndex = Math.round((types.length-1)*Math.random());

    // Generate question
    var x = Math.round(9*Math.random()) + 10; // Random numbers between 10 and 20
    var y = Math.round(9*Math.random()) + 5; // Random numbers between 5 and 15
    document.getElementById("question").innerHTML = "( " + x + types[typesIndex] + y + " )";
    
    // For power
    // if(typesIndex == 5){
    //     // Random numbers between 5 and 10
    //     var w = Math.round(4*Math.random()) + 5;
    //     // Random numbers between 1 and 5
    //     var z = Math.round(4*Math.random()) + 1;
    //     rightAnswer = generateAnswers(rightAnswer1,z,typesIndex);
    // }

    // Assign right answer
    rightAnswer = generateAnswers(x,y,typesIndex);
    answers.push(rightAnswer)
    
    rightIndex = Math.round(3*Math.random()) + 1;
    document.getElementById("option" + rightIndex).innerHTML = rightAnswer; // Assign the right answer to one of the options

    // Assign wrong answer
    for ( var i=1; i <= totalOptions; i++){

        if( i != rightIndex){
            var wrongAnswer, w1, w2;
            do{
                if(typesIndex == '0' ){ // Add
                    w1 = x + Math.round(5*Math.random() + 2);
                    w2 = y - Math.round(4*Math.random() + 1);
                }else if(typesIndex == '1' ){ // Subtract
                    w1 = x + Math.round(4*Math.random() + 2);
                    w2 = y + Math.round(5*Math.random() + 2);
                }else if(typesIndex == '2' || typesIndex == '3'){ // Multiply
                    w1 = x - Math.round(5*Math.random() + 1);
                    w2 = y + Math.round(3*Math.random() + 2);
                }else if(typesIndex == '4'){ // Divide
                    w1 = x + Math.round(3*Math.random() + 1);
                    w2 = y + Math.round(2*Math.random() + 1);
                }
                wrongAnswer = generateAnswers(w1,w2,typesIndex);
            }while( answers.indexOf(wrongAnswer) > -1 )
            
            document.getElementById("option" + i).innerHTML = wrongAnswer; // Assign wrong answer to the remaining options
            answers.push(wrongAnswer);
            // console.log(answers);
        }else{
            continue;
        }
    }

    // Display a random image
    imgIndex = Math.round((images.length-1)*Math.random());
    img.innerHTML = '<img id="question-img" src="./images/'+images[imgIndex]+'.jpg" width="400" height="200">';

}

// Game Over
function gameOver(){

    console.log("game over");    
    isPlay = false;
    gameOverSound.play(); // Sound
    clearInterval(timeInterval); // Stopping the countdown
    document.getElementById("finalScore").innerHTML = score;
    body.style.opacity = '0.7';
    gameOverContainer.style.opacity = "1";
    timerContainer.classList.add("no-show");
    scoreContainer.classList.add("no-show");
    gameOverContainer.classList.remove("no-show");
    rightAnsPopUp.style.display = "none";
    wrongAnsPopUp.style.display = "none";
    document.getElementById("start").innerHTML = "Start";

}
