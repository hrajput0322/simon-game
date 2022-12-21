var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];

var started=false;
var level=0;

$(document).keydown(function(){
    if (!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function(){
    userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    buttonAnimation(userChosenColor);
    makeSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        makeSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = (Math.floor(Math.random()*4));
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColor);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

function makeSound(color){
    var audio=new Audio(color+".mp3");
    audio.play();
}

function buttonAnimation(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100);
}