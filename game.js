var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){

      var userChosenColour=$(this).attr("id"); //storing id of the clicked button using "attr" and"this".
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  //Checking whether the last user chosen colour is same as the game pattern.
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    //Checking whether the user has finished their sequence.
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
}
  else{
      playSound("wrong");
      $("#level-title").text("Game Over, Press any key to restart")
    $("body").addClass("game-over").delay(200).queue(function(){
      $("body").removeClass("game-over").dequeue();
    });
    startOver();

  }
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+level);
  var randomNumber=Math.floor(Math.random()*(4-0)+0);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed").delay(100).queue(function(){
    $("#"+currentColour).removeClass("pressed").dequeue();
  });
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function startOver(){
  started=false;
  level=0;
  gamePattern=[];
  $(document).keydown(function(){
    if(!started){
      nextSequence();
      started=true;
    }
  });

}
