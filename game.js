const buttonColors = ["red", "blue", "green", "yellow"];
var randomChoosenColour;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isGameStarted = false;
var clickCounter = 0;


$(".btn").on("click", function() {

  clickCounter++;
  var userChoosenColour = this.id;
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer()
});


$(document).on('keydown', function() {

  if(!isGameStarted) {
    randomChoosenColour = buttonColors[nextSequence()];
    gamePattern.push(randomChoosenColour);
    isGameStarted = true;
    playSound(randomChoosenColour);
    animatePress(randomChoosenColour);
  }
});

function checkAnswer() {

  if(gamePattern[clickCounter-1]!= userClickedPattern[clickCounter-1]){
    clickCounter = 0;
    gamePattern = [];
    userClickedPattern = [];
    isGameStarted = false;
    level = 0;
    setTimeout(function() {
      $('h1').text("Game Over, Press Any Key to Restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
    }, 200);
    return false;
  } else if (clickCounter == level) {
    userClickedPattern = [];
    clickCounter = 0;
    randomChoosenColour = buttonColors[nextSequence()];
    gamePattern.push(randomChoosenColour);
    setTimeout(function() {
      animatePress(randomChoosenColour);
      playSound(randomChoosenColour);
    }, 1000);
    return true;
  }
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 200);
}


function nextSequence() {

  var randomNumber = getRandInteger(0, 3);
  level++;
  $("h1").text("Level "+level);
  return randomNumber;
}

function getRandInteger(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
