var seconds = 1000;
var currQuestion = 0;
var questionTimer;
var questionCountdown;
var setQuestionTime = 20;
var setResponseTime = 4;
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
        //$("#answers li").remove();
        $("#question").removeClass("bg-success bg-danger").html("<h5 class='text-center'>" + quest.question + "</h5>");
        $("<h3></h3>").attr("id", "countdown").appendTo("#question");
        decrement = setQuestionTime;
        shuffleArray(quest.answers);
        for (i = 0; i < quest.answers.length; i++) {
            var answ = quest.answers[i];
            var answLetter = arrLetterAssignment[i];
            var eleDivClose = "</div>"
            var eleRow = "<div class='row my-2 bg-light border border-dark rounded'>"
            var eleAnswerIdColumn = "<div class='col-sm-1 p-0 m-0'>"
            var eleAnswerLetter = "<h5 class='my-2 ml-2 mr-0' mx-1>" + answLetter + "</h5>";
            var eleAnswerColumn = "<div class='col-sm-11 p-0 m-0'>";
            var eleAnswer = "<h5 class='mx-1 my-2'>" + answ.answer + "</h5>" ;
            buildAnswer += eleRow + eleAnswerIdColumn  + eleAnswerLetter + eleDivClose + eleAnswerColumn + eleAnswer + eleDivClose + eleDivClose
        }
        $("#answers").html(buildAnswer)
            //let answID = answLetter.substr(0, answLetter.length - 2);
            // let eleAnswer = $("div class='col-sm-11'").html("<span id=" + answID + ">" + answLetter + ": </span>" + "<span>"+ answ.answer + "</span>")
            //     .click(generateResponse(answ.correct))
            //     .append("<br>")
            //     .appendTo("#answers");
        //}
        //questionTimer = setTimeout(noAnswer, setQuestionTime * seconds);
        //questionCountdown = setInterval(countdown, 1 * seconds)
    }
}
function generateResponse(boolCorrect) {
    return function () {
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

function correct(correctAnswer) {
    $("#question").addClass("bg-success").html("<h2>CORRECT!</h2>")
    correctAnswer.addClass("bg-success");
    countCorrect++
    $("#correctAnswers").html(countCorrect)
}

function incorrect(incorrectAnswer) {
    $("#question").addClass("bg-danger").html("<h2>Incorrect.</h2>");
    incorrectAnswer.addClass("bg-danger")
    $("li").filter("[data-correct=true]").addClass("bg-success");
    countIncorrect++;
    $("#incorrectAnswers").html(countIncorrect);
}

function noAnswer() {
    clearInterval(questionCountdown)
    setTimeout(initQuestion, setResponseTime * seconds);
    countIncorrect++;
    $("#question").addClass("bg-danger").html("<h2>No answer.</h2>");
    $("li").filter("[data-correct=true]").addClass("bg-success");
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
    $("#question").removeClass("bg-success bg-danger").addClass("bg-primary").html("Game Over");
    $("#answers li").remove();
    let score = Math.floor((countCorrect / questionsPerGame)*100);
    let wizLevel = "";
    switch (true) {
        case score < 21:
            wizLevel = "Dursleys";
            break;
        case score < 41:
            wizLevel = "muggle";
            break;
        case score < 71:
            wizLevel = "squib";
            break;
        case score < 91:
            wizLevel = "Hogwarts Student";
            break;
        default:
            wizLevel = "Headmaster";
    }
    $("<li>")
        .html("Score: " + score + "%")
        .appendTo("#answers");
    $("<li>")
        .addClass("list-group mb-2")
        .html("Wizarding Level: " + wizLevel)
        .appendTo("#answers");
}

function initGame(){
    shuffleArray(arrQuestions);
    var intro1 = $("<h2>Harry Potter Trivia</h2>");
    var intro2 = $("<h5>Questions are based on details from the seven volume Harry Potter novel series by J.K. Rowling.</h5>");
    var intro3 = $("<h5>You can play multiple rounds of 10 questions each from a collection of over 200 questions.</h5>");
    var begin = $("<button type='button' id='begin' class='btn-sm btn-dark'>Click to begin</button>").click(initQuestion);
    $("#question").append(intro1,intro2,intro3,begin);
    
}

function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

