let body = document.getElementsByTagName("body")[0];

var isPlay = false;
var score;
var rightAnswer;
var rightAnswer1;
var rightAnswer2;
var types;
var totalOptions = 4;
var images = [ "q1", "q2", "q3", "q4", "q5", "q6"];
let rightAnsPopUp = document.getElementById("rightAns");
let wrongAnsPopUp = document.getElementById("wrongAns");
var gameOverContainer = document.getElementById("gameOver");
var allOptions = document.getElementsByClassName("option");
        
let img = document.getElementById("question-img");
img.innerHTML = '<img id="question-img" src="./images/q0.jpg" width="400" height="200">';

var initialCount = 60,
 	count = initialCount,
    timerPause = false;
var timerContainer = document.getElementById("timer");
var value = document.getElementById("count");
var pause = document.getElementById("pause");
var lt = document.getElementById("timer-lt");
var rt = document.getElementById("timer-rt");

var scoreContainer = document.getElementById("score");
var timeInterval;

// var ticking = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/174721__drminky__watch-tick.wav');
// var gameOverSound = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/Elevator_Ding-SoundBible.com-685385892.mp3');
var ticking = new Audio('sounds/tick-tock.mp3');
var correct = new Audio('sounds/correct.mp3');
var incorrect = new Audio('sounds/incorrect.mp3');
var gameOverSound = new Audio('sounds/gameOver.mp3');

function timer() {	    

    if (!timerPause) {
        ticking.play();
        body.style.opacity = "1";
        document.getElementById("pausedMsg").classList.add("no-show");

        document.getElementById("question").classList.remove("no-show");
        document.getElementById("options").classList.remove("no-show");
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
        // document.getElementById("options").classList.add("no-show");
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

document.getElementById("start").onclick = function(){

    // Checking if the user is playing/not
    if (isPlay){
        // Restart button - Reload page
        location.reload();
    }else{
        // Start button
        isPlay = true;

        // Initializing the value of score
        score = 0;
        document.getElementById("score-value").innerHTML = score;

        // Start -> Restart
        document.getElementById("start").innerHTML = "Restart";

        // Countdown Counter
        timerContainer.classList.remove("no-show");
        ticking.play();
        timer();
        timeInterval = setInterval(timer, 1000);
        lt.style.animationPlayState = "paused";
        rt.style.animationPlayState = "paused";

        scoreContainer.classList.remove("no-show");

        // Generating MCQs
        generateMCQs();
    }

}

for(var i=1; i<=4; i++){
    document.getElementById("option" + i).onclick = function(){

        if(isPlay){

            // Right answer 
            if(this.innerHTML == rightAnswer){

                console.log(rightAnswer);
                correct.play();

                // Update score
                score++;
                document.getElementById("score-value").innerHTML = score;

                // Showing popup message for a sec
                rightAnsPopUp.style.display = "block";
                wrongAnsPopUp.style.display = "none";

                setTimeout(function(){
                    rightAnsPopUp.style.display = "none";
                }, 1000);

                // Generate new question
                generateMCQs();
            }
            // Wrong answer
            else{
                incorrect.play();
                wrongAnsPopUp.style.display = "block";
                rightAnsPopUp.style.display = "none";
                setTimeout(function(){
                    wrongAnsPopUp.style.display = "none";
                }, 1000);
            }
        }
    };
}

function gameOver(){
    isPlay = false;
    gameOverSound.play();
    console.log("game over");
    // Stopping the countdown
    clearInterval(timeInterval);
    timerContainer.classList.add("no-show");
    scoreContainer.classList.add("no-show");
    gameOverContainer.classList.remove("no-show");
    body.style.opacity = '0.7';
    gameOverContainer.style.opacity = "1";
    document.getElementById("finalScore").innerHTML = score;
    rightAnsPopUp.style.display = "none";
    wrongAnsPopUp.style.display = "none";

    document.getElementById("start").innerHTML = "Start";
}

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
        case 4: ans = (a / b).toFixed(2);
                break;
        // case 5: ans = Math.pow(a,b);
        //         break;
    }
    return ans;
}

function generateMCQs(){

    var answers = [];
    types = ['+','-','*','*','/'];

    // Random numbers between 10 and 20
    var x = Math.round(9*Math.random()) + 10;
    // Random numbers between 5 and 15
    var y = Math.round(9*Math.random()) + 5;
    
    typesIndex = Math.round((types.length-1)*Math.random());
    imgIndex = Math.round((images.length-1)*Math.random());

    // For power
    if(typesIndex == 5){
        // Random numbers between 5 and 10
        var w = Math.round(4*Math.random()) + 5;
        // Random numbers between 1 and 5
        var z = Math.round(4*Math.random()) + 1;
        rightAnswer = generateAnswers(rightAnswer1,z,typesIndex);
    }else{
        rightAnswer = generateAnswers(x,y,typesIndex);
    }
    answers.push(rightAnswer)
    
    img.innerHTML = '<img id="question-img" src="./images/'+images[imgIndex]+'.jpg" width="400" height="200">';
    
    document.getElementById("question").innerHTML = "( " + x + types[typesIndex] + y + " )";
    rightIndex = Math.round(3*Math.random()) + 1;
    
    // Assign the right answer to one of the options
    document.getElementById("option" + rightIndex).innerHTML = rightAnswer;

    var i=1;
    // Assign wrong answer to the remaining options
    while (i <= totalOptions){

        if( i != rightIndex){
            // var w;
            var wrongAnswer;

            do{
                var w1 = x + Math.round(4*Math.random() + 1);
                var w2 = y - Math.round(4*Math.random() + 1);
                console.log("w1: " + w1);
                console.log("w2: " + w2);
                console.log("rightAns: " + rightAnswer);
                wrongAnswer = generateAnswers(w1,w2,typesIndex);
                console.log("wrongAns: " + wrongAnswer);
            }while( answers.indexOf(wrongAnswer) > -1 )
            
            document.getElementById("option" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
            console.log(answers);
            i++;
        }else{
            i++;
            continue;
        }
        
    }
}
