/*
 * Memory Game
 *
 * This is the wrapper function for my memory game! It contains all of the core
 * functionality for the game to run.
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Call Me Nick
 * http://callmenick.com
 */

;
(function (window) {

	'use strict';

	/**
	 * Extend object function
	 *
	 */

	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	/**
	 * Shuffle array function
	 *
	 */

	function shuffle(o) {
		for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

		//for (var j, z, x, i = o.length; i; z = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = o[z], o[z] = x);
		return o;
	};

	/**
	 * Memory constructor
	 *
	 */

	function Memory(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}

	/**
	 * Memory options
	 *
	 * Memory default options. Available options are:
	 *
	 * wrapperID: the element in which Memory gets built
	 * cards: the array of cards
	 * onGameStart: callback for when game starts
	 * onGameEnd: callback for when game ends
	 */

	Memory.prototype.options = {
		wrapperID: "container",
		cards: [
			{
				id: 1,
				img: "lib/image/MemoryGame/Card/Card_01.png"
      },
			{
				id: 2,
				img: "lib/image/MemoryGame/Card/Card_02.png"
      },
			{
				id: 3,
				img: "lib/image/MemoryGame/Card/Card_03.png"
      },
			{
				id: 4,
				img: "lib/image/MemoryGame/Card/Card_04.png"
      },
			{
				id: 5,
				img: "lib/image/MemoryGame/Card/Card_05.png"
      },
			{
				id: 6,
				img: "lib/image/MemoryGame/Card/Card_06.png"
      },
    ],
		onGameStart: function () {
			return false;
		},
		onGameEnd: function () {
			console.log("test");
			return false;
		}
	}

	/**
	 * Memory _init - initialise Memory
	 *
	 * Creates all the game content areas, adds the id's and classes, and gets
	 * ready for game setup.
	 */

	Memory.prototype._init = function () {
		this.game = document.createElement("div");
		this.game.id = "mg";
		this.game.className = "mg";
		document.getElementById(this.options.wrapperID).appendChild(this.game);

		this.gameNewBg = document.createElement("div");

		this.gameMeta = document.createElement("div");
		this.gameMeta.className = "mg__meta clearfix";

		this.gameStartScreen = document.createElement("div");
		this.gameStartScreen.id = "mg__start-screen";
		this.gameStartScreen.className = "mg__start-screen";

		this.gameWrapper = document.createElement("div");
		this.gameWrapper.id = "mg__wrapper";
		this.gameWrapper.className = "mg__wrapper";
		this.gameContents = document.createElement("div");
		this.gameContents.id = "mg__contents";
		this.gameWrapper.appendChild(this.gameContents);
		this.gameMessages = document.createElement("div");
		this.gameMessages.id = "mg__onend";
		this.gameMessages.className = "mg__onend";

		this._setupGame();
	};

	/**
	 * Memory _setupGame - Sets up the game
	 *
	 * We're caching all game related variables, and by default, displaying the
	 * meta info bar and start screen HTML.
	 *
	 * A NOTE ABOUT GAME STATES:
	 *
	 * There are 4 game states in total, governed by the variable this.gameState.
	 * Each game state allows for a certain series of functions to be performed.
	 * The gameStates are as follows:
	 *
	 * 1 : default, allows user to choose level
	 * 2 : set when user chooses level, and game is in play
	 * 3 : game is finished
	 */

	Memory.prototype._setupGame = function () {
		var self = this;
		this.gameState = 1;
		this.cards = shuffle(this.options.cards);
		this.card1 = "";
		this.card2 = "";
		this.card1id = "";
		this.card2id = "";
		this.card1flipped = false;
		this.card2flipped = false;
		this.flippedTiles = 0;
		this.chosenLevel = "";
		this.numMoves = 0;
		this.numTime = 20;
//<button id="home_button" class="button" onclick="game_GoTo_Home()" style="opacity: 0;top: 1675px; left: 387px; position: fixed;"><img src="./lib/breadtalk/image/home_button.png"></button>
		this.gameStartScreenHTML = '<ul class="mg__start-screen--level-select mg__button">\
									<li><button id="start_button" class="mg_button_class"><span data-level="2"><img src="lib/image/MemoryGame/BT_Memory_Start.png"/></span></button></li>\
									</ul>';
		this.gameStartScreen.innerHTML = this.gameStartScreenHTML;
		this.game.appendChild(this.gameStartScreen);


		this._startScreenEvents();
	}

	/*** Memory _startScreenEvents
	 *
	 * We're now listening for events on the start screen. That is, we're waiting
	 * for when a user chooses a level.
	 */

	Memory.prototype._startScreenEvents = function () {
		var levelsNodes = this.gameStartScreen.querySelectorAll("ul.mg__start-screen--level-select span");
		for (var i = 0, len = levelsNodes.length; i < len; i++) {
			var levelNode = levelsNodes[i];
			this._startScreenEventsHandler(levelNode);
		}
	};

	/**
	 * Memoery _startScreenEventsHandler
	 *$
	 * A helper function to handle the click of the level inside the events
	 * function.
	 */

	Memory.prototype._startScreenEventsHandler = function (levelNode) {
		var self = this;
		levelNode.addEventListener("click", function (e) {
            console.log("node click");
			if (self.gameState === 1) {
				self._setupGameWrapper(this);
			}
		});
        levelNode.click();
	}

	/**
	 * Memory _setupGameWrapper
	 *
	 * This function sets up the game wrapper, which is where the actual memory
	 * tiles will reside and where all the game play happens.
	 */

	Memory.prototype._setupGameWrapper = function (levelNode) {
		this.level = levelNode.getAttribute("data-level");
		this.gameStartScreen.parentNode.removeChild(this.gameStartScreen);
		this.gameContents.className = "mg__contents mg__level-" + this.level;
		this.game.appendChild(this.gameWrapper);

		this.chosenLevel = this.level;

		this._renderTiles();
	};


	/**
	 * Memory _renderTiles
	 *
	 * This renders the actual tiles with content. A few thing happen here:
	 *
	 * 1. Calculate grid X and Y based on user level selection
	 * 2. Calculate num tiles
	 * 3. Create new cards array based on level, and draw cards from original array
	 * 4. Shuffle the new cards array
	 * 5. Cards get distributed into tiles
	 * 6. gamePlay function gets triggered, taking care of all the game play action.
	 */


	Memory.prototype._renderTiles = function () {
		this.gridX = 4;
		this.gridY = 3;
		this.numTiles = this.gridX * this.gridY;
		console.log("numTiles:" + this.numTiles);
		this.halfNumTiles = this.numTiles / 2;

		console.log("this.halfNumTiles:" + this.halfNumTiles);
		this.newCards = [];

		this.gameMetaHTML = '<div class="mg__meta--left">\
      	<span class="mg__meta--level">\
      	</span>\
	  	<span id="mg__meta--level"></span>\
	  	<span class="mg__meta--time"><img id="countdown" style="position: fixed; top: 30px; left: 840px; background-color: transparent; border: none;" />\
      	<img id="mg__meta--time" style="position: relative; top: -810px; left: 1890px; background-color: transparent; border: none;"  src="lib/image/MemoryGame/20.png"/>\
      	</span>\
	  	</div>';

		this.gameMeta.innerHTML = this.gameMetaHTML;
		this.game.appendChild(this.gameMeta);

		for (var i = 0; i < this.halfNumTiles; i++) {
			this.newCards.push(this.cards[i], this.cards[i]);
		}
		this.newCards = shuffle(this.newCards);
		this.tilesHTML = '';
		for (var i = 0; i < this.numTiles; i++) {
			var n = i + 1;
			this.tilesHTML += '<div class="mg__tile mg__tile-' + n + '">\
	        <div class="mg__tile--inner" data-id="' + this.newCards[i]["id"] + '">\ <span class="mg__tile--outside"></span>\ <span class="mg__tile--inside"><img src="' + this.newCards[i]["img"] + '"></span>\
	        </div>\
	        </div>';

        	console.log("this.newCards:" + this.newCards);
		}
		this.gameContents.innerHTML = this.tilesHTML;
		this.gameState = 2;
		this.options.onGameStart();
		this._gamePlay();
	}

	/**
	 * Memory _gamePlay
	 *
	 * Now that all the HTML is set up, the game is ready to be played. In this
	 * function, we loop through all the tiles (goverend by the .mg__tile--inner)
	 * class, and for each tile, we run the _gamePlayEvents function.
	 */

	var countDownInterval;
	var countDown = 5;
	Memory.prototype._gamePlay = function () {
		var self = this;
		var padCountDownMinute, padCountDownSecond;
		var display = document.getElementById("mg__meta--time");
		var tiles = document.querySelectorAll(".mg__tile--inner");
		//display.textContent = "00:05";
		for (var i = 0, l = tiles.length; i < l; i++) {
			tiles[i].classList.add("flipped");
		}
		padCountDownMinute = self.pad(2);
		console.log(padCountDownMinute);
		countDownInterval = setInterval(function () {
			padCountDownMinute = self.pad(Math.floor(countDown / 60));
			padCountDownSecond = self.pad(countDown % 60);
			console.log(padCountDownMinute);

			countDown = countDown - 1;
			if(memoryGame_timeout  < 10)
            {
                $("#memoryGame_timer").html("0" + countDown);
            }
            else
            {
                $("#memoryGame_timer").html(countDown);
            }
			if (countDown == 0){
				$("#GO").show();
				$("#mg__meta--time").hide();
			}else if (countDown < 0) {
				clearInterval(countDownInterval);
				display.textContent = "00:20";
			}
			//clearInterval(countDownInterval);
		}, 1000);
		var self = this;
		setTimeout(function () {
			var countDown = document.getElementById("countdown");
			countDown.className += " countFlipped";
			for (var i = 0, l = tiles.length; i < l; i++) {
				tiles[i].classList.remove("flipped");
			}
//			display.textContent = 30;
			self._startTimer(20, display);
			for (var i = 0, len = tiles.length; i < len; i++) {
				var tile = tiles[i];
				self._gamePlayEvents(tile);
			};
		}, 5000);
	};

	/**
	 * Memory _gamePlayEvents
	 *
	 * This function takes care of the "events", which is basically the clicking
	 * of tiles. Tiles need to be checked if flipped or not, flipped if possible,
	 * and if zero, one, or two cards are flipped. When two cards are flipped, we
	 * have to check for matches and mismatches. The _gameCardsMatch and 
	 * _gameCardsMismatch functions perform two separate sets of functions, and are
	 * thus separated below.
	 */

	Memory.prototype._gamePlayEvents = function (tile) {
		var self = this;
		tile.addEventListener("click", function (e) {
			if (!this.classList.contains("flipped")) {
				if (self.card1flipped === false && self.card2flipped === false) {
					this.classList.add("flipped");
					self.card1 = this;
					self.card1id = this.getAttribute("data-id");
					self.card1flipped = true;
				} else if (self.card1flipped === true && self.card2flipped === false) {
					this.classList.add("flipped");
					self.card2 = this;
					self.card2id = this.getAttribute("data-id");
					self.card2flipped = true;
					if (self.card1id == self.card2id) {
						self._gameCardsMatch();
					} else {
						self._gameCardsMismatch();
					}
				}
			}
		});
	}

	/**
	 * Memory _gameCardsMatch
	 *
	 * This function runs if the cards match. The "correct" class is added briefly
	 * which fades in a background green colour. The times set on the two timeout
	 * functions are chosen based on transition values in the CSS. The "flip" has
	 * a 0.3s transition, so the "correct" class is added 0.3s later, shown for
	 * 1.2s, then removed. The cards remain flipped due to the activated "flip"
	 * class from the gamePlayEvents function.
	 */

	Memory.prototype._gameCardsMatch = function () {
		// cache this
		var self = this;

		document.getElementById("tap_correct").pause();
        document.getElementById("tap_correct").currentTime = 0;
        document.getElementById("tap_correct").play();

		// add correct class
		window.setTimeout(function () {
			self.card1.classList.add("correct");
			self.card2.classList.add("correct");
		}, 300);

		// remove correct class and reset vars
		window.setTimeout(function () {
			self.card1.classList.remove("correct");
			self.card2.classList.remove("correct");
			self._gameResetVars();
			self.flippedTiles = self.flippedTiles + 2;
			if (self.flippedTiles == self.numTiles) {
				self._winGame();
			}
		}, 1000);

		// plus one on the move counter
		this._gameCounterPlusOne();
	};

	/**
	 * Memory _gameCardsMismatch
	 *
	 * This function runs if the cards mismatch. If the cards mismatch, we leave
	 * them flipped for a little while so the user can see and remember what cards
	 * they actually are. Then after that slight delay, we removed the flipped
	 * class so they flip back over, and reset the vars.
	 */

	Memory.prototype._gameCardsMismatch = function () {
		// cache this
		var self = this;

		document.getElementById("tap_wrong").pause();
        document.getElementById("tap_wrong").currentTime = 0;
        document.getElementById("tap_wrong").play();

		// remove "flipped" class and reset vars
		window.setTimeout(function () {
			self.card1.classList.remove("flipped");
			self.card2.classList.remove("flipped");
			self._gameResetVars();
		}, 900);

		// plus one on the move counter
		this._gameCounterPlusOne();
	};

	/**
	 * Memory _gameResetVars
	 *
	 * For each turn, some variables are updated for reference. After the turn is
	 * over, we need to reset these variables and get ready for the next turn.
	 * This function handles all of that.
	 */

	Memory.prototype._gameResetVars = function () {
		this.card1 = "";
		this.card2 = "";
		this.card1id = "";
		this.card2id = "";
		this.card1flipped = false;
		this.card2flipped = false;
	}

	/**
	 * Memory _gameCounterPlusOne
	 *
	 * Each turn, the user completes 1 "move". The obective of memory is to
	 * complete the game in as few moves as possible. Users need to know how many
	 * moves they've had so far, so this function updates that number and updates
	 * the HTML also.
	 */

	Memory.prototype._gameCounterPlusOne = function () {
//		this.numMoves = this.numMoves + 1;
//		this.moveCounterUpdate = document.getElementById("mg__meta--moves").innerHTML = this.numMoves;
	};

	/**
	 * Memory _clearGame
	 *
	 * This function clears the game wrapper, by removing it from the game div. It
	 * allows us to rerun setupGame, and clears the air for other info like
	 * victory messages etc.
	 */

	Memory.prototype._clearGame = function () {
		if (this.gameMeta.parentNode !== null) this.game.removeChild(this.gameMeta);
		if (this.gameStartScreen.parentNode !== null) this.game.removeChild(this.gameStartScreen);
		if (this.gameWrapper.parentNode !== null) this.game.removeChild(this.gameWrapper);
		if (this.gameMessages.parentNode !== null) this.game.removeChild(this.gameMessages);
	}

	/**
	 * Memoray _winGame
	 *
	 * You won the game! This function runs the "onGameEnd" callback, which by
	 * default clears the game div entirely and shows a "play again" button.
	 */

	Memory.prototype._winGame = function () {
		clearInterval(setTimer);
		var self = this;
		if (this.options.onGameEnd() === false) {
			this._clearGame();
			// this.gameMessages.innerHTML = '<span class="end_game_message">CONGRATULATIONS!</h1>\
			// <span style="margin-right: 200px;" class="end_game_messagesub">YOU WON A</span> <img style="margin-left: 550px; margin-top: -26px; height: 36.5px; width: 250.5px;" src="./lib/breadtalk/image/30voucher.png"</p>\
			// <p class="mg__onend--message" style="color: #f69431" ><br><br>SCAN TO REDEEM</p>\
			// <img class="qr_class" src="./lib/breadtalk/image/qr_code.png"/>\
			// <p class="mg__onend--message"><br><br>OR</p>\
			// <button style="margin-top: 50px; background-color: transparent; border: 0; outline: 0;" class="endbutton_class" onclick="goTo_Email()"><img src="./lib/breadtalk/image/email_me_instead_button.png"/>\
			// <button onclick="goTo_Home()" style="top: 1700px; left: 25px; position: absolute; background-color: transparent; border: none; outline: none;"><img id="home_button" src="./lib/breadtalk/image/home.png"></button>';
			this.game.appendChild(this.gameMessages);
			document.getElementById("mg__onend--restart").addEventListener("click", function (e) {
				self.resetGame();
			});
		} else {
			// run callback
			this.options.onGameEnd();
		}
	}

	Memory.prototype._loseGame = function () {
		var self = this;
		this._clearGame();

	    document.getElementById("TryAgainAudio").pause();
        document.getElementById("TryAgainAudio").currentTime = 0;
        document.getElementById("TryAgainAudio").play();
      
        $("#my-memory-game").fadeOut(function() {
        	
	        $('#game_over').fadeIn(function() {
	        	//Page to stay for 5seconds before, page navigates to Thank you page
	    
		        setTimeout(function() {
                    location.reload();
                }, 5000); 
	    	});
    	});
	};

	Memory.prototype._testFunction = function () {
			alert("Test Function");
		}
		/*Down*
		 *
		 * Memory resetGame
		 *
		 * This function resets the game. It can run at the end of the game when the
		 * user is presented the option to play again, or at any time like a reset
		 * button. It is a public function, and can be used in whatever custom calls
		 * in your markup.
		 */

	Memory.prototype.resetGame = function () {
		this._clearGame();
		this._setupGame();
	};

	/**
	 * Button Function
	 */
	
	Memory.prototype.pad = function(number) {
		return (number < 10 ? '0' : '') + number
	}

	Memory.prototype.startGame = function () {
		this._renderTiles;
		alert("test");
	}

	/**
	 *   Timer Functions
	 */

	var setTimer;
	var memory_timeout = 20;
	var memoryGame_timeout = 20;
	Memory.prototype._startTimer = function () {
		var self = this;
		setTimer = setInterval(function() {
			memory_timeout--;
			$("#mg__meta--time").hide();
			$("#GO").hide();
			$("#memoryGame_timer").show();

			if(memoryGame_timeout < 10)
            {
                $("#memoryGame_timer").html("0" + memory_timeout);
            }
            else
            {
                $("#memoryGame_timer").html(memory_timeout);
            }
			
			if (memory_timeout == 5){
				document.getElementById("TimeUpAudio").pause();
	            document.getElementById("TimeUpAudio").currentTime = 0;
	            document.getElementById("TimeUpAudio").play();
			}else if (memory_timeout == 4){
                document.getElementById("TimeUpAudio").pause();
	            document.getElementById("TimeUpAudio").currentTime = 0;
	            document.getElementById("TimeUpAudio").play();
			}
			else if (memory_timeout == 3){
				document.getElementById("TimeUpAudio").pause();
	            document.getElementById("TimeUpAudio").currentTime = 0;
	            document.getElementById("TimeUpAudio").play();
			}
			else if (memory_timeout == 2){
				document.getElementById("TimeUpAudio").pause();
	            document.getElementById("TimeUpAudio").currentTime = 0;
	            document.getElementById("TimeUpAudio").play();
			}
			else if (memory_timeout == 1){
				document.getElementById("TimeUpAudio").pause();
	            document.getElementById("TimeUpAudio").currentTime = 0;
	            document.getElementById("TimeUpAudio").play();
			}
			else if (memory_timeout == 0){
				document.getElementById("TimeUpAudio").pause();
	            document.getElementById("TimeUpAudio").currentTime = 0;
	            document.getElementById("TimeUpAudio").play();
			}
			else if (memory_timeout <0){
				clearInterval(setTimer);
				self._loseGame();
			}
		},1000);
	}
	
	// Memory.prototype._startCountDownTimer = function (duration, display) {
	// 	var self = this;
	// 	var timer = duration,
	// 		minutes, seconds;
	// 	window.setTimer = setInterval(function () {
 //            display.textContent = timer;
 //            //display.src="./lib/breadtalk/image/"+timer+".png"
	// 		timeDown = timeDown - 1;
	// 		if (--timer < 0) {
	// 			clearInterval(window.setTimer);
	// 		}
	// 	}, 1000);
	// }

	/**
	 * Add Memory to global namespace
	 */

	window.Memory = Memory;

})(window);
