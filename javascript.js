var isPlay = false;
var score;
var timeLeft;
var rightAnswer;
var rightAnswer1;
var rightAnswer2;
var types;

var images = [ "q1", "q2", "q3", "q4", "q5", "q6"];
let rightAnsPopUp = document.getElementById("rightAns");
let wrongAnsPopUp = document.getElementById("wrongAns");
let img = document.getElementById("question-img");
img.innerHTML = '<img id="question-img" src="./images/q0.jpg" width="200" height="200">';

// On clicking the Start/Restart button
document.getElementById("start").onclick = function(){

    // Checking if the user is playing/not
    if (isPlay){
        // Restart button - Reload page
        location.reload();
    }else{
        // Start button
        isPlay = true;

        // Hiding Game Over display box
        document.getElementById("gameOver").style.display = "none";        

        // Initializing the value of score
        score = 0;
        document.getElementById("score_value").innerHTML = score;

        // Displaying the countdown box
        document.getElementById("timeLeft").style.display = "block";
        
        // Initializing the value of time left
        timeLeft = 20;
        document.getElementById("time").innerHTML = timeLeft;

        // Start -> Restart
        document.getElementById("start").innerHTML = "Restart";

        // Countdown Counter
        countdown();

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

                console.log(rightAnswer)
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
                wrongAnsPopUp.style.display = "block";
                rightAnsPopUp.style.display = "none";
                setTimeout(function(){
                    wrongAnsPopUp.style.display = "none";
                }, 1000);
            }
        }
    };
}


function countdown(){

    output = setInterval(function(){

        timeLeft -=1;
        document.getElementById("time").innerHTML = timeLeft;

        if(timeLeft == 0){
            gameOver();
        }
    }, 1000);
}

function gameOver(){

    // Stopping the countdown
    clearInterval(output)

    // Game Over message
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("gameOver").innerHTML = "<p>Game Over!!</p><p>Final Score: " + score + "</p>"

    document.getElementById("timeLeft").style.display = "none";
    rightAnsPopUp.style.display = "none";
    wrongAnsPopUp.style.display = "none";

    isPlay = false;
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
