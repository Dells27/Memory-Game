var started = false;
var level = 0;

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];


function startOver() {
  level=0;
  gamePattern=[];
  started=false
  console.log("wrong");
  var audio2 = new Audio("sounds/wrong.mp3");
  audio2.play();

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");
}



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  // $(currentColour).addClass("pressed"); aqui usamos "#" debido a que el parametro no va a recibir el id como tal, solo el nombre
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $(currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  // switch ("#" + randomChosenColour) {
  //   case "#green":
  //     var audio = new Audio("sounds/green.mp3");
  //     audio.play();
  //     break;
  //   case "#blue":
  //     var audio = new Audio("sounds/blue.mp3");
  //     audio.play();
  //     break;

  //   case "#red":
  //     var audio = new Audio("sounds/red.mp3");
  //     audio.play();
  //     break;
  //   case "#yellow":
  //     var audio = new Audio("sounds/yellow.mp3");
  //     audio.play();
  //     break;

  //   default:
  //     var audio = new Audio("sounds/wrong.mp3");
  //     audio.play();
  //     break;
  // } Lo cometamos porque vamos usar function playSound!!!!!!!!!!!!!!!!

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  //var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  //audio.play();
  //Recordar que podemos jugar con la linea de string en los comandos

  playSound(randomChosenColour);
  level++;
  $("#level-tittle").text("Level " + level);
}

$(".btn").on("click", function () {
  // var userChosenColour = this.attr('id'); ChatGPT:The problem is that this in your function is a native DOM
  // element,not a jQuery object. Since .attr() is a jQuery method, you need to wrap this in a jQuery object to use it.
  // In vanilla JavaScript, the equivalent of jQuery's .attr() for getting, setting, or removing attributes is achieved using the native DOM methods:

  // getAttribute(): To get the value of an attribute.
  // setAttribute(): To set the value of an attribute.
  // removeAttribute(): To remove an attribute.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function () {
  if (!started) {
    $("#level-tittle").text("Level " + level);
    nextSequence();
    started = true;
  }
});
