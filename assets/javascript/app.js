var seconds = 1000;
var currQ = 0;
var timerQ ;
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
    let quest = arrQuestions[currQ];
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
    timerQ = setTimeout(incorrect,31*seconds);
}

function generateResponse(boolCorrect){
    return function () {
        clearTimeout(timerQ)
        if(boolCorrect){
            correct($(this));
        }
        else{
            incorrect();
        }
    }

}

function correct(correctAnswer){
    
    $("#question").addClass("bg-success").html("<h2>CORRECT!</h2>")
    correctAnswer.addClass("bg-warning");
    setTimeout(initQuestion,5*seconds);
}

function incorrect(){
    //TODO create incorrect display that includes the correct answer. 
    //   This will be some sort of html element created by Jquery.
    //TODO create timer to display answer for five seconds.
    $("#question").addClass("bg-danger").html("<h2>Incorrect.</h2>");
    $("li").filter("[data-correct=true]").addClass("bg-warning");
    setTimeout(initQuestion,5*seconds);
}
   