(function($) {
  
  // initialize audio

  var winAudio = document.createElement("audio");
  winAudio.src = "../lib/audio/play_win/guess/Win.mp3";

  var loseAudio = document.createElement("audio");
  loseAudio.src = "../lib/audio/play_win/guess/GameOver.mp3";

  var correctAudio = document.createElement("audio");
  correctAudio.src = "../lib/audio/play_win/guess/Funny Button.wav";
  
  show_navigation_footer();

  $.fn.guessingGame = function() {

    var base = this;

    var _spliceNumber;

    var timerInterval;
    var _timer = 60;

    var QUESTION_NUMBER = 0;
    const _MAX_QUESTION = 5;

    const _videoArray = ["sketch1", "sketch2", "sketch3", "sketch4", "sketch5"];
    const _answerPack = ["KidzAmaze", "Concierge", "Pavilion", "Wayfinder", "Gym"];

    base.init = function(options) {
      base._startTimer(); 
      base._generate(1); 
    }

    base._generate = function(flag) {

		if(flag == 1)
		{
	      this.timer = document.createElement("span");
	      this.timer.id = "timer"
	      this.timer.className = "timer"
	      document.getElementById("game_Page").appendChild(this.timer);
	      this.timer.innerHTML = 60;
		}

      this.video = document.createElement("video");
      this.video.id = "doodleVideo";
      document.getElementById("game_Page").appendChild(this.video);

      this.answerWrapper = document.createElement("div");
      this.answerWrapper.className = "answerWrapper";
      document.getElementById("game_Page").appendChild(this.answerWrapper);

      this.choice1 = document.createElement("img");
      this.choice1.id= "Choice_1";
      this.choice1.className = "Choice img";

      this.choice2 = document.createElement("img");
      this.choice2.id= "Choice_2";
      this.choice2.className = "Choice img";

      this.choice3 = document.createElement("img");
      this.choice3.id= "Choice_3";
      this.choice3.className = "Choice img";

      this.choice4 = document.createElement("img");
      this.choice4.id= "Choice_4";
      this.choice4.className = "Choice img";

      this.answerWrapper.appendChild(this.choice1);
      this.answerWrapper.appendChild(this.choice2);
      this.answerWrapper.appendChild(this.choice3);
      this.answerWrapper.appendChild(this.choice4);

      base._randomNumber();
    }

    base._setup = function(number) {
      var answer = base._setAnswer(number); 
      var video  = base._setVideo(number); 
    }

    base._randomNumber = function() {
      var rand = Math.floor(Math.random() * _videoArray.length );  
      _spliceNumber = rand;
      base._setup(rand);
    }

    base._setAnswer = function(number) {
      var folderName = _answerPack[number];
      var orderedArray = [1, 2, 3, 4];
      var shuffledArray = shuffle(orderedArray); 
      var choices = document.querySelectorAll(".Choice");

      for (var i = 0; i <= 3; i++) {
        var Choice = choices[i];
        Choice.src = "../lib/image/play_win/guess/Answer/" + folderName + "/" + folderName + "_0" + shuffledArray[i] + ".png";

        if (shuffledArray[i] == 1) {
          $(Choice).addClass("Correct");
        }

        base._renderAnswer(Choice);
      }
    }

    base._renderAnswer = function(choice) {
      var self = this;
      choice.addEventListener("click", function(e) {
        if (this.classList.contains("Correct")) {
          base._correctAnswer();
        }
        else {
          base._lose();
        }
      })
    }

    base._setVideo = function(number) {
      var videoName = _videoArray[number];
      var video = document.getElementById("doodleVideo");
      video.src = "../lib/video/play_win/guess/" + videoName + ".mp4";
      video.load();
      video.play();
    }

    base._nextQuestion = function() {
      base._reset();
      base._generate(2);
    }

    base._startTimer = function() {

      var self = this;

      timerInterval = setTimeout(function() {

        _timer--; 
        $("#timer").text(_timer);


        base._startTimer();
      }, 1000)

        if(_timer == 0) {
          base._lose();
        }
    }

    base._reset = function() {
      $("img[id^='Choice_']" ).remove();
      $("#doodleVideo").remove();
    }

    base._correctAnswer = function() {

      QUESTION_NUMBER++;
      correctAudio.play();
       _videoArray.splice(_spliceNumber, 1);     
       _answerPack.splice(_spliceNumber, 1);

      if (QUESTION_NUMBER < 3) {
        base._nextQuestion(); 
      }
      else {
        base._endGame(); 
      }
    }

    base._lose = function() {

      clearTimeout(timerInterval);
	  
	  var video = document.getElementById("doodleVideo");
	  video.pause();
      loseAudio.play();
	  
	  show_navigation_footer();
	  
	  stopIdleCounter = false;
	  idleTime = 2;
	  
      $("#game_Page").fadeOut(function() {
        $("#Lose_Page").fadeIn(); 
      })
    }

    base._endGame = function() {
      clearTimeout(timerInterval);
	  
	  var video = document.getElementById("doodleVideo");
	  video.pause();
      winAudio.play();
	  
	  show_navigation_footer();
	  
	  stopIdleCounter = false;
	  idleTime = 2;
	  
      $("#game_Page").fadeOut(function() {
        $("#Results_Page").fadeIn(); 
      })
    }

    base.init(); 

  }

  /**
   *  * Randomize array element order in-place.
   *   * Using Durstenfeld shuffle algorithm.
   *    */
   function shuffle(array) {
       for (var i = array.length - 1; i > 0; i--) {
               var j = Math.floor(Math.random() * (i + 1));
               var temp = array[i];
               array[i] = array[j];
               array[j] = temp;
           }
       return array;
   } 

})(jQuery);

