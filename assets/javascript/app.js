var seconds = 1000;
var currQuestion = 0;
var timerQuestion ;
var correct=0 ;
var incorrect=0 ;

var arrQuestions = [
    {
        question: "I am a: ",played: false,answers: [
            {answer:"fat old slob.",correct: true},
            {answer:"jelly donut.",correct:false},
            {answer:"a disease and you're the cure.",correct:false},
            {answer:"loser baby, so why don't you kill me.",correct:false},
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
    correct++
    setTimeout(initQuestion,7*seconds);
}

function incorrect(incorrectAnswer){
    $("#question").addClass("bg-danger").html("<h2>Incorrect.</h2>");
    incorrectAnswer.addClass("bg-danger")
    $("li").filter("[data-correct=true]").addClass("bg-success");
    incorrect++
    setTimeout(initQuestion,7*seconds);
}

function noAnswer(){
    $("#question").addClass("bg-danger").html("<h2>No answer.</h2>");
    $("li").filter("[data-correct=true]").addClass("bg-success");
    incorrect++
    setTimeout(initQuestion,7*seconds);
}