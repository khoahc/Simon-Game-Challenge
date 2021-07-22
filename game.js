const buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
var lastTime = 0;

//Start by key
$(document).keydown(function () {
  if (!started) {
    started = true;
    $(".box.game").show();
    $("#level-title").text("Level " + level);
    $(".box.start").hide();
    nextSequence();
  }
});

//Start by button
$(".btn-start").click(function () {
  if (!started) {
    started = true;
    $(".box.game").show();
    $("#level-title").text("Level " + level);
    $(".box.start").hide();
    nextSequence();
  }
});

//Click button in game
$(".btn").click(
  (function () {
    var history = [],
      last = +new Date();

    return function (e) {
      console.log(lastTime);
      console.log(e.timeStamp);
      console.log(e.timeStamp - lastTime);
      if (e.timeStamp - lastTime > 300) {
        lastTime = e.timeStamp;
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        animatePress(userChosenColour);
        playSound(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
      } else {
        lastTime = e.timeStamp;
        alert("Click slowly!!!");
      }

      last = e.timeStamp;
    };
  })()
);

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      $("#level-title").text("Correct");
      setTimeout(function () {
        nextSequence();
      }, 800);
    }
  } else {
    $(".box.game").hide();
    $(".btn").prop("disabled", true);
    startOver();
    $(".box.start").show();
    $("body").addClass("game-over");
    $("#level-title").text(
      "Game Over, Press Any Key or Click Start to Restart"
    );

    playSound("wrong");
  }

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(150)
    .fadeIn(150)
    .fadeOut(150)
    .fadeIn(150);

  playSound(randomChosenColour);
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
  $(".btn").prop("disabled", false);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
