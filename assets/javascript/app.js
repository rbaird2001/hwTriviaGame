var seconds = 1000;
var currQuestion = 0;
var timerQuestion ;
var countCorrect=0 ;
var countIncorrect=0 ;

var arrQuestions = [
    {
        question: "How many staircases are there at Hogwarts",played: false,answers: [
            {answer:"142",correct: true},
            {answer:"734",correct:false},
            {answer:"286",correct:false},
            {answer:"88",correct:false},
        ]
    },
    {
        question: "What need of Dumbledore's was fulfilled by the Room of Requirement",played: false,answers: [
            {answer:"Need to urinate.",correct: true},
            {answer:"Need to people from  Voldemort.",correct:false},
            {answer:"Need to train students secretly.",correct:false},
            {answer:"Need to store the Pensive. ",correct:false},
        ]
    },
    {
        question: "Which character responded to being fired by getting intoxicated",played: false,answers: [
            {answer:"Winky.",correct: true},
            {answer:"Hagrid.",correct:false},
            {answer:"Cornelius Fudge.",correct:false},
            {answer:"Vernon Dursley.",correct:false},
        ]
    },
    {
        question: "What do Harry Potter and Neville Longbottom have in common",played: false,answers: [
            {answer:"They share the same birthday.",correct: true},
            {answer:"Both of their parents were killed when they were young.",correct:false},
            {answer:"They are the same height.",correct:false},
            {answer:"Both were marked for death by Voldemort.",correct:false},
        ]
    },
    {
        question: "Which of the following is NOT true about a Patronous",played: false,answers: [
            {answer:"The animal it produces determines its strength.",correct: true},
            {answer:"They can be used to communicate.",correct:false},
            {answer:"Producing one is very difficult.",correct:false},
            {answer:"They can change to a different animal in certain circumstances.",correct:false},
        ]
    },
]
var arrLetterAssignment = ["A. ","B. ","C. ","D. ", "E. ","F. ","G. "];

function initQuestion(){
    //TODO add command to remove response banner if exists.
    let quest = arrQuestions[currQuestion];
    $("#answers li").remove();
    $("#question").removeClass("bg-success bg-danger").html("<p>" + quest.question + "</p>");
    for(i=0;i<quest.answers.length;i++){
        let answ = quest.answers[i]
        let answLetter = arrLetterAssignment[i]
        let answID = answLetter.substr(0,answLetter.length - 2 );
        let insertAnswer = $("<li></li>")
            .addClass("list-group mb-2")
            .attr("id",(answID))
            .html(answLetter + answ.answer)
            .attr("data-correct",answ.correct)
            .click(generateResponse(answ.correct))
            .append("<br>")
            .appendTo("#answers");
    }
    timerQuestion = setTimeout(noAnswer,31*seconds);
}

function generateResponse(boolCorrect){
    return function () {
        clearTimeout(timerQuestion);
        if(boolCorrect){
            correct($(this));
        }
        else{
            incorrect($(this));
        }
    }
}

function correct(correctAnswer){ 
    $("#question").addClass("bg-success").html("<h2>CORRECT!</h2>")
    correctAnswer.addClass("bg-success");
    countCorrect++
    $("#correctAnswers").html(countCorrect)
    setTimeout(initQuestion,7*seconds);
}

function incorrect(incorrectAnswer){
    $("#question").addClass("bg-danger").html("<h2>Incorrect.</h2>");
    incorrectAnswer.addClass("bg-danger")
    $("li").filter("[data-correct=true]").addClass("bg-success");
    countIncorrect++;
    $("#incorrectAnswers").html(countIncorrect);
    setTimeout(initQuestion,7*seconds);
}

function noAnswer(){
    $("#question").addClass("bg-danger").html("<h2>No answer.</h2>");
    $("li").filter("[data-correct=true]").addClass("bg-success");
    countIncorrect++;
    $("#incorrectAnswers").html(countIncorrect);
    setTimeout(initQuestion,7*seconds);
}