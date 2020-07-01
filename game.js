
$("h1").css("color","red");
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

var started = false;

var level = 0;



   $(document).keypress(function(event) {
     /* Act on the event */
     if (!started) {

       //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
       $("#level-title").text("Level " + level);
        nextSequence();
       started = true;
     }

   });



function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(chosenColor)
{
  $("#"+chosenColor).addClass('pressed');
  setTimeout(function() {
	$("#"+chosenColor).removeClass('pressed');
}, 101);
}

$(".btn").click(function() {
  /* Act on the event */
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);

  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("Success");

    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else
  {
    console.log("Failed");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass('game-over');

    setTimeout(function()
    {
      $("body").removeClass('game-over');
    },200);

    startOver();
  }

}


function nextSequence(){

  userClickedPattern = [];

    level++;

    $("#level-title").text("Level "+level);

  var randomNumber = Math.floor( Math.random() *4);

  var randomChosenColour = buttonColours[randomNumber];
  // console.log(randomChosenColour); //To verify that randomNumber is generated correctly
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  audio.play();
}


function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}
