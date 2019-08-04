var seconds = 1000;
var currQuestion = 0;
var questionTimer;
var questionCountdown;
var answerSelected = true
var setQuestionTime = 26;
var setResponseTime = 5;
var decrement = setQuestionTime
var countCorrect = 0;
var countIncorrect = 0;
var questionsPerGame = 20

var arrLetterAssignment = ["A. ", "B. ", "C. ", "D. ", "E. ", "F. ", "G. "];

function initQuestion() {
    var loadQuestNum = currQuestion
    var buildAnswer = ""
    currQuestion++
    if (currQuestion > questionsPerGame) {
        endGame();
    }
    else {
        let quest = arrQuestions[loadQuestNum];
        $("#answers .answerRow").remove();
        var addTimer = "<h5 id='countdown' class='text-center'>" + setQuestionTime + "</h5>"
        $("#question").removeClass("bg-success bg-danger").html("<h5 class='text-center'>" + currQuestion + ". " + quest.question + "</h5>" + addTimer);
        decrement = setQuestionTime;
        questionCountdown = setInterval(countdown, 1 * seconds)
        shuffleArray(quest.answers);
        for (i = 0; i < quest.answers.length; i++) {
            var answ = quest.answers[i];
            var answLetter = arrLetterAssignment[i];
            var eleAnswerIdColumn = "<div class='col-sm-1 p-0 m-0'>"
            var eleAnswerID = "<h5 class='my-2 ml-2 mr-0' mx-1>" + answLetter + "</h5>";
            var eleAnswerColumn = "<div class='col-sm-11 p-0 m-0'>";
            var eleAnswer = "<h5 class='mx-1 my-2'>" + answ.answer + "</h5>";
            var buildAnswer = eleAnswerIdColumn + eleAnswerID + "</div>" + eleAnswerColumn + eleAnswer + "</div>";
            $("<div class='row my-2 rounded answerRow'>")
                .html(buildAnswer)
                .attr("data-correct", answ.correct)
                .click(generateResponse(answ.correct))
                .appendTo("#answers");
        }
        answerSelected = false
        questionTimer = setTimeout(noAnswer, setQuestionTime * seconds);
    }
}
function generateResponse(boolCorrect) {
    return function () {
        if (!answerSelected) {
            answerSelected = true
            clearTimeout(questionTimer);
            clearInterval(questionCountdown);
            setTimeout(initQuestion, setResponseTime * seconds);
            if (boolCorrect) {
                correct($(this));
            }
            else {
                incorrect($(this));
            }
        }
    }
}

function correct(correctAnswer) {
    $("#question").addClass("bg-success").html("<h2 class='text-center'>CORRECT!</h2>")
    correctAnswer.addClass("bg-success").removeClass("bg-light");
    countCorrect++
    $("#correctAnswers").html(countCorrect)
}

function incorrect(incorrectAnswer) {
    $("#question").addClass("bg-danger").html("<h2 class='text-center'>Incorrect.</h2>");
    incorrectAnswer.addClass("bg-danger").removeClass("bg-light")
    $(".answerRow").filter("[data-correct=true]").addClass("bg-success").removeClass("bg-light");
    countIncorrect++;
    $("#incorrectAnswers").html(countIncorrect);
}

function noAnswer() {
    answerSelected = true
    clearInterval(questionCountdown)
    setTimeout(initQuestion, setResponseTime * seconds);
    countIncorrect++;
    $("#question").addClass("bg-danger").html("<h2>No answer.</h2>");
    $(".answerRow").filter("[data-correct=true]").addClass("bg-success").removeClass("bg-light");
    $("#incorrectAnswers").html(countIncorrect);
}

function countdown() {
    decrement--
    if (decrement > 5) {
        $("#countdown").html(decrement);
    }
    else {
        $("#countdown").addClass("text-danger").html(decrement);
    }
}

function endGame() {
    clearInterval(questionCountdown);
    clearTimeout(questionTimer);
    $("#answers .answerRow").remove();
    let score = Math.floor((countCorrect / questionsPerGame) * 100);
    let wizLevel = "";
    let wizLevelImg = ""
    switch (true) {
        case score < 21:
            wizLevel = "Dursleys";
            wizLevelImg = "dursleys.jpg"
            break;
        case score < 41:
            wizLevel = "Squib";
            wizLevelImg = "squib.jpg";
            break;
        case score < 71:
            wizLevel = "Hogwarts Student";
            wizLevelImg = "hogwartsStudent.jpg";
            break;
        case score < 91:
            wizLevel = "Auror";
            wizLevelImg = "auror.jpg"
            break;
        default:
            wizLevel = "Headmaster";
            wizLevelImg = "headmaster.jpg"
    }
    let endGameResults01 = "<div id=wizardLevelCard class='card'>"
    let endGameResults02 = "<img id='wizardLevelImg' src='assets/images/" + wizLevelImg + "'" + " class='card-img-top' alt='...'>"
    let endGameResults03 = "<div class='card-body'>"
    let endGameResults04 = "<h5 class='card-title'>Score: " + score + "</h5>"
    let endGameResults05 = "<h5 class='card-title'>Wizarding Level: " + wizLevel + "</h5>"
    let endGameResults06 = "</div></div>"
    let endGameResultsBuild = endGameResults01 
            + endGameResults02 
            + endGameResults03 
            + endGameResults04 
            + endGameResults05 
            + endGameResults06
    $("#question").removeClass("bg-success bg-danger").html(endGameResultsBuild)
}

function initGame() {
    shuffleArray(arrQuestions);
    currQuestion = 0
    $("#question").removeClass("bg-primary bg-success bg-danger");
    var introDiv = "<div id='gameIntro' class='container p-0 m-0 justify-content-center'>";
    var intro1 = "<h2 class='text-center mb-3'>Harry Potter Trivia</h2>";
    var intro2 = "<h5 class='text-center mb-3'>Questions and answers are taken from on details from the seven volume Harry Potter novel series by J.K. Rowling.</h5>";
    var intro3 = "<h5 class='text-center mb-3'>Most questions are not found within the movies. So if you haven't read the novels, this may be a challenge.</h5>";
    var beginGame = $("<button type='button' id='begin' class='btn-block btn-dark m-auto'>Click to begin</button>").click(initQuestion);
    $("#question").html(introDiv + intro1 + intro2 + intro3);
    $("#gameIntro").append(beginGame);
}

function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
$(document).ready(function() {    

	var theWindow = $(window),
	    $bg = $("#bg"),
	    aspectRatio = $bg.width() / $bg.height();
	    			    		
	function resizeBg() {
		
		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		    $bg
		    	.removeClass()
		    	.addClass('bgheight');
		} else {
		    $bg
		    	.removeClass()
		    	.addClass('bgwidth');
		}
					
	}
	                   			
	theWindow.resize(resizeBg).trigger("resize");
    initGame();
});



