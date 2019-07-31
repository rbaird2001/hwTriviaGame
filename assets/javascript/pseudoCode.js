/** TODO: Provide a sample set of questions to test first. 
 *      But be prepared to load a large set of questions.
 *      required: Questions must have the question, with four or more answers. 
 *      required; All but one answer must be marked as false.
 *      required: All questions must have an indicator of being played so not played again.
 *      stretch: Provide 3x questions as will be played in single game so
 *          game can be played multiple times without repeats.
*/

/**
 * TODO: Determine method for locating and loading each question individually. 
 *      Stretch: randomize list.
 */

 /** 
  * TODO: Player selects button to start game.
  *     required: loads first question with answer and sets timer for question.
  *     stretch determine best timer length. start with 30 secs.
  *     stretch: animation to show timeout progression.
  *     required: answer selected by clicking on it. 
  *     required: selection must stop timeout.
  *     each loaded question must be marked as played so as not to be played again.
  *     
 */

 /**
  * TODO: Determine true or false answer 
  *     required: if true display correct banner
  *     required: if false display incorrect banner
  *     stretch: after selection correct answer will be shown.
  *     required: banners on a timer to hide after 5 seconds.
  *     required: after banner hides, next question loads.
  */

  /** 
   * TODO: Each correct answer will include a point value assigned to player.
   *    required: simple score will be count of correct answers or percentage of questions guessed right.
   *    required: correct answer points will be stored and added to existing points assigned to player.
   * 
   *    
   */

  /**
   * TODO: game consists of 10 questions. completion of 10 questions will end game.
   *    required: end of game will provide total score.
   *    required: end will present button to play again.
   *    required: play again must reset game. but not score.
   *    stretch: at end of game. present banner commenting on performance.
   *  
   */

/****************************************************************************/

/* use nested array>objects>array>objects */
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

var currQ = 0;
var currScore = 0
var correct = 0
var wrong = 0
var round = 0

/* base set of functions */

function initGame(){
    //TODO code to reset all scores and question logs.
    //Also randomize questions for the rounds.
    //1 get first question from game add to DOM
    let q = arrQuestions[currQ];
    $("question").innerHTML("<p>" + q.question + "</p>");
    //2 get answers and add to DOM
    for(i=0;i<q.answers.length;i++){
        let a = q.answers[i]
        $("answers").append("li").html(a.answer).data("correct",a.correct)
    }
    q.played=true
    $()

    
}

function initQ(){
    //TODO code to add question
    //TODO code to init timer
    //TODO code to establish Q number

}

function setupQTimer(){
    //TODO code to setup Q timer
    //TODO code to setup results timer

}


function stopTimer(){
    //TODO code to setup stop timer

}

function showResult() {
    //TODO code to display results


}

function endGame(){
    //TODO code to indicate end of round and end of game.

}


