//Global Variable
var count = 5, interval, CounterInterval;
//Method to enable star to decrease when 'tap' button is tapped
var counter = 0, timer = 15;
//To set bottom limit variable
var bottomStarLimit = 1210;

//Ernest Lee 26/11/2015: Fade-in notification countDown function

//Trigger to set GameStartTimer function: fade in notification counter
interval =  setInterval(function() {GameStartTimer()}, 2000);
function GameStartTimer(){
    if (count>0){
        $("#CountdownFadeInTimer").fadeOut('slow', function(){
//          To call src image out as fade in countdown counter        
            $("#GameCounter").attr("src", "lib/toysrus_cn_pek/image/tap_a_star/fadeInCount/"+count+".png")
            $("#CountdownFadeInTimer").fadeIn();
            count--;
            console.log(count);
        });
    }else if(count == 0){
        $("#CountdownFadeInTimer").fadeOut('slow', function(){
//        $("#CountdownFadeInTimer").text("Start!!");
            console.log("start");
        $("#GameCounter").attr("src", "lib/toysrus_cn_pek/image/tap_a_star/Start.png")
        $("#CountdownFadeInTimer").fadeIn();
        count--;
        //method call to Game function & Timer    
        initiateGameTimer();     
        //Remove the "disabled" attribute to allow user to tap on the image button when notification countdown is done    
        document.getElementById("TapText").removeAttribute("disabled");
        });
    }else {
        //fade out countdown text
        $("#CountdownFadeInTimer").fadeOut();
        clearInterval(interval);
    }
}


//Ernest Lee 27/11/2015: Tap the star down function
function GameStart(){
    console.log("GameStart");
    x = document.getElementById('GameStar').offsetTop;
    //check condition if star reach bottom page limit, else continue to move down
    if (x< bottomStarLimit){
        console.log("x:"+ x);
        x= x+step;
        //Set TapText to fadeIn and fadeOut when user clicks on the image
        $("#TapText").click(function(){
            var ThisIt = $(this);
            ThisIt.fadeOut(150 , function(){
                ThisIt.fadeIn(150);
            });
        });
        
    }
    document.getElementById('GameStar').style.top = x+"px";
}

//Ernest Lee 27/11/2015: Countdown Timer Function
function initiateGameTimer() {
	CounterInterval = setInterval(function(){
        counter = counter +1;
        timer = timer -1;
//        $('#GameTime').html(timer);
        $("#GameCounter").attr("src", "lib/toysrus_cn_pek/image/tap_a_star/countdownTimer/"+timer+".png")
		console.log(timer);
		// Gamce condition check when timer =0: position of the star < or > 2308(bottom page limit)
        //Check condition if timer is not equal to 0 & user finishes the game, user will win the game
		
		console.log("asx: " + x);
		
        if (timer !=0){
            if (x >=1210){
                var audioWon= document.getElementById("GameWon");
                audioWon.play();
				
				console.log("win_1");
				
				timer = 1;
				
				/*
                $("#GamePage").css("display", "none");
                $("#GameOver").css("display", "none");
                $("#Congratulations").css("display", "block");
				
				$("#jquery_jplayer_5").jPlayer("setMedia", {
                    m4v: "lib/toysrus_cn_pek/video/tap_a_star/Congratulations.mp4"
                }).jPlayer("play");
                $("#jquery_jplayer_5").show();
				
                //To log the number of game won by users
                ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=WIN&game=TAP_A_STAR&mediaURL=" + triggerVideoURL + "&projectID=" + triggerLibURL);
				*/
				
                //Set Congratulations Page to fade out automatically after 5 seconds
                setTimeout(function(){
                 audio1.muted = true;
                 audio2.muted = true;
                 audio3.muted = true;
                    $("#load_tapAStarGame").fadeOut(function(){
                        $("#menu").fadeIn();
                    })
                },5000);
            }
        }else if (timer == 0){
            clearInterval(CounterInterval);
            if (x >= 1210) {
                var audioWon= document.getElementById("GameWon");
                audioWon.play();
                $("#GamePage").css("display", "none");
                $("#GameOver").css("display", "none");
                $("#Congratulations").css("display", "block");
				
				console.log("win_2");
				
				$("#jquery_jplayer_5").jPlayer("setMedia", {
                    m4v: "lib/toysrus_cn_pek/video/tap_a_star/Congratulations.mp4"
                }).jPlayer("play");
                $("#jquery_jplayer_5").show();
				
                //To log the number of game won by users
                ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=WIN&game=TAP_A_STAR&mediaURL=" + triggerVideoURL + "&projectID=" + triggerLibURL);
				
                //Set Congratulations Page to fade out automatically after 5 seconds
                setTimeout(function(){
                 audio1.muted = true;
                 audio2.muted = true;
                 audio3.muted = true;
                    $("#load_tapAStarGame").fadeOut(function(){
                        $("#menu").fadeIn();
                    })
                },5000);
            }
            else if (x < 1210) {
                console.log("fail due to unable to satisfy condition");
                var audioLose= document.getElementById("GameLose");
                audioLose.play();
                $("#GamePage").css("display", "none");
                $("#GameOver").css("display", "block");
				
				$("#jquery_jplayer_6").jPlayer("setMedia", {
                    m4v: "lib/toysrus_cn_pek/video/tap_a_star/GameOver.mp4"
                }).jPlayer("play");
                $("#jquery_jplayer_6").show();
				
				//To log the number of game lost by users
                ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=LOST&game=TAP_A_STAR&mediaURL=" + triggerVideoURL + "&projectID=" + triggerLibURL);
				
                //Set GameOver Page to fade out automatically after 5 seconds
                setTimeout(function(){
                 audio1.muted = true;
                 audio2.muted = true;
                 audio3.muted = true;
                    console.log("setTimeOut:GameOver");
                    $("#load_tapAStarGame").fadeOut(function(){
                        $("#menu").fadeIn();
                    })
                },5000);
            }
            else{
                console.log("fail due to inactivity");
                var audioLose= document.getElementById("GameLose");
                audioLose.play();
                $("#GamePage").css("display", "none");
                $("#GameOver").css("display", "block");
				
				$("#jquery_jplayer_6").jPlayer("setMedia", {
                    m4v: "lib/toysrus_cn_pek/video/tap_a_star/GameOver.mp4"
                }).jPlayer("play");
                $("#jquery_jplayer_6").show();
				
                //To log the number of game lost by users
                ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=LOST&game=TAP_A_STAR&mediaURL=" + triggerVideoURL + "&projectID=" + triggerLibURL);
				
                //Set GameOver Page to fade out automatically after 5 seconds
                setTimeout(function(){
                    audio1.muted = true;
                    audio2.muted = true;
                    audio3.muted = true;
                    console.log("setTimeOut:GameOver due to inactivity");
                    $("#load_tapAStarGame").fadeOut(function(){
                        $("#menu").fadeIn();
                    })
                },5000);
            }
        }
    }, 1000)
}
