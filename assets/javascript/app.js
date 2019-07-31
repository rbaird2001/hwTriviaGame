var currQ = 0
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

function initGame(){
    let quest = arrQuestions[currQ];
    $("#question").html("<p>" + quest.question + "</p>");
    for(i=0;i<quest.answers.length;i++){
        let answ = quest.answers[i]
        let answLetter = arrLetterAssignment[i]
        let answID = answLetter.substr(0,answLetter.length - 2 );
        let insertAnswer = $("<li></li>")
            .addClass("list-group mb-2")
            .data("correct",answ.correct)
            .attr("id",(answID))
            .html(answLetter + answ.answer)
            .append("<br>");
        $("#answers").append(insertAnswer);
        console.log(answ.answer);
    }
}
   