function startInstructions() {
  $("#gameSelection_Page").fadeOut(function() {
    $("#gameInstruction_Page").fadeIn();
  })
}

function startGuessGame() {
  hide_weather_feed();
  hide_footer();
  
  $("#gameInstruction_Page").fadeOut(function() {

    $("#game_Page").fadeIn();
    $(".guessingGameWrapper").guessingGame();

  })
}

