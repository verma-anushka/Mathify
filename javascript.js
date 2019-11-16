let body = document.getElementsByTagName("body")[0];

var isPlay = false;
var score;
// var timeLeft;
var rightAnswer;
var rightAnswer1;
var rightAnswer2;
var types;

var images = [ "q1", "q2", "q3", "q4", "q5", "q6"];
let rightAnsPopUp = document.getElementById("rightAns");
let wrongAnsPopUp = document.getElementById("wrongAns");
var gameOverContainer = document.getElementById("gameOver");

let img = document.getElementById("question-img");
img.innerHTML = '<img id="question-img" src="./images/q0.jpg" width="200" height="200">';

var initialCount = 60,
 	count = initialCount,
    timerPause = false;
var timerContainer = document.getElementById("timer");
var value = document.getElementById("count");
var pause = document.getElementById("pause");
var lt = document.getElementById("timer-lt");
var rt = document.getElementById("timer-rt");
var timeInterval;

// 
// var ticking = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/174721__drminky__watch-tick.wav');
// var gameOverSound = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/231853/Elevator_Ding-SoundBible.com-685385892.mp3');
var ticking = new Audio('sounds/tick-tock.mp3');
var correct = new Audio('sounds/correct.mp3');
var incorrect = new Audio('sounds/incorrect.mp3');
var gameOverSound = new Audio('sounds/gameOver.mp3');

function timer() {	    

    if (!timerPause) {
        ticking.play();
        lt.style.animationPlayState = "running";
        rt.style.animationPlayState = "running";
	  	count = count - 1;
	  	if (count <= -1) {
	  		count = initialCount;
        var el = document.getElementById("circle-timer");
	        el.before( el.cloneNode(true) ).remove();
	  	} 
    value.innerHTML = count;
  	}else{
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

// On clicking the Start/Restart button
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
        document.getElementById("score_value").innerHTML = score;

        // Displaying the countdown box
        // document.getElementById("timeLeft").style.display = "block";
        
        // Initializing the value of time left
        // timeLeft = 20;
        // document.getElementById("time").innerHTML = timeLeft;

        // Start -> Restart
        document.getElementById("start").innerHTML = "Restart";

        ticking.play();

        // Countdown Counter
        timerContainer.classList.remove("no-show");
        timer();
        timeInterval = setInterval(timer, 1000);
        lt.style.animationPlayState = "paused";
        rt.style.animationPlayState = "paused";
        // Generating MCQs
        generateMCQs();
    }

}

for(var i=1; i<=4; i++){
    document.getElementById("option" + i).onclick = function(){

        // If playing
        if(isPlay){

            // Right answer 
            if(this.innerHTML == rightAnswer){

                console.log(rightAnswer);
                correct.play();

                // Update score
                score++;
                document.getElementById("score").innerHTML = "Score:" + score;

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
    gameOverContainer.classList.remove("no-show");

    body.style.opacity = '0.7';
    gameOverContainer.style.opacity = "1";

    document.getElementById("finalScore").innerHTML = score;

    document.getElementById("timer").style.display = "none";
    rightAnsPopUp.style.display = "none";
    wrongAnsPopUp.style.display = "none";

    document.getElementById("start").innerHTML = "Start";
    
}

function generateAnswers(no1,no2,typesIndex){

    var ans;
    var a = parseInt(no1);
    var b = parseInt(no2);

    // typesIndex = Math.round((types.length-1)*Math.random());

    switch(typesIndex){
        case 0: ans = a + b;
                // console.log("ans: " + ans);
                break;
        case 1: ans = a - b;
                // console.log("ans: " + ans);
                break;
        case 2: ans = a * b;
                // console.log("ans: " + ans);
                break;
        case 3: ans = a * b;
                // console.log("ans: " + ans);
                break;
        case 4: ans = (a / b).toFixed(2);
                // console.log("ans: " + ans);
                break;
        // case 5: ans = Math.pow(a,b);
        //         console.log("power: " + Math.pow(a,b));
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
    
    // var types = ['+','-','*','*','/','^'];
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

    console.log(img);
    
    img.innerHTML = '<img id="question-img" src="./images/'+images[imgIndex]+'.jpg" width="200" height="200">';
    console.log(img.innerHTML);
    
    
    document.getElementById("question").innerHTML = "( " + x + types[typesIndex] + y + " )";
    rightIndex = Math.round(3*Math.random()) + 1;
    
    // Assign the right answer to one of the options
    document.getElementById("option" + rightIndex).innerHTML = rightAnswer;

    var wrongAnswer = [];
    var flag = false;
    var i=1;
    // Assign wrong answer to the remaining options
    while (i<=4){

        if( i != rightIndex){

            console.log("diff");
            var w;
            var w1 = x + Math.round(4*Math.random()) + 1;
            var w2 = y - Math.round(4*Math.random()) + 1;

            // rightAnswer = generateAnswers(x,y,typesIndex);

            console.log(types[typesIndex]);

            console.log("w1: " + w1);
            console.log("w2: " + w2);
            console.log("rightAns: " + rightAnswer);

            w = generateAnswers(w1,w2,typesIndex);
            wrongAnswer.push(w);
            console.log("wrongAns: " + w);
            console.log(wrongAnswer);
            // for(j=0; j<wrongAnswer.length; j++){
            //     console.log("in");
            //     if(wrongAnswer[j] === w){
            //         flag = true;
            //         break;
            //     }
            // }
            // if(flag){
            //     document.getElementById("option" + i).innerHTML = w;
            //     i++;
            // }
            document.getElementById("option" + i).innerHTML = w;
            i++;
        }else{
            console.log("same");
            i++;

            continue;
        }
        
    }
}
