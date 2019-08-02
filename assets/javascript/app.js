var seconds = 1000;
var currQuestion = 0;
var questionTimer;
var questionCountdown;
var answerSelected = true
var setQuestionTime = 21;
var setResponseTime = 1;
var decrement = setQuestionTime
var countCorrect = 0;
var countIncorrect = 0;
var questionsPerGame = 5
var arrQuestions = [
    {
        question: "How many staircases are there at Hogwarts?", played: false, answers: [
            { answer: "142", correct: true },
            { answer: "734", correct: false },
            { answer: "286", correct: false },
            { answer: "88", correct: false },
        ]
    },
    {
        question: "What need of Dumbledore's was fulfilled by the Room of Requirement?", played: false, answers: [
            { answer: "Need to urinate.", correct: true },
            { answer: "Need to people from  Voldemort.", correct: false },
            { answer: "Need to train students secretly.", correct: false },
            { answer: "Need to store the Pensive. ", correct: false },
        ]
    },
    {
        question: "Which character responded to being fired by getting intoxicated?", played: false, answers: [
            { answer: "Winky.", correct: true },
            { answer: "Hagrid.", correct: false },
            { answer: "Cornelius Fudge.", correct: false },
            { answer: "Vernon Dursley.", correct: false },
        ]
    },
    {
        question: "What do Harry Potter and Neville Longbottom have in common?", played: false, answers: [
            { answer: "They share the same birthday.", correct: true },
            { answer: "Both of their parents were killed when they were young.", correct: false },
            { answer: "They are the same height.", correct: false },
            { answer: "Both were marked for death by Voldemort.", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT true about a Patronous?", played: false, answers: [
            { answer: "The animal it produces determines its strength.", correct: true },
            { answer: "They can be used to communicate.", correct: false },
            { answer: "Producing one is very difficult.", correct: false },
            { answer: "They can change to a different animal in certain circumstances.", correct: false },
        ]
    },
]
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
        var addTimer = "<h3 id='countdown' class='text-center'>" + setQuestionTime + "</h3>"
        $("#question").removeClass("bg-success bg-danger").html("<h5 class='text-center'>" + quest.question + "</h5>" + addTimer);
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
    $("#question").addClass("bg-success").html("<h2>CORRECT!</h2>")
    correctAnswer.addClass("bg-success").removeClass("bg-light");
    countCorrect++
    $("#correctAnswers").html(countCorrect)
}

function incorrect(incorrectAnswer) {
    $("#question").addClass("bg-danger").html("<h2>Incorrect.</h2>");
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
            wizLevelImg = "auror.img"
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
    var intro2 = "<h5 class='text-center mb-3'>Questions are based on details from the seven volume Harry Potter novel series by J.K. Rowling.</h5>";
    var intro3 = "<h5 class='text-center mb-3'>You can play multiple rounds of " + questionsPerGame + " questions each from a collection of over " + arrQuestions.length + " questions.</h5>";
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
initGame();

