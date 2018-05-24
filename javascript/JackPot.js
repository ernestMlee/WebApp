var IMAGE_HEIGHT = 400;
var IMAGE_TOP_MARGIN = 0;
var IMAGE_BOTTOM_MARGIN = 0;
var SLOT_SEPARATOR_HEIGHT = 3;
var SLOT_HEIGHT = IMAGE_HEIGHT + IMAGE_TOP_MARGIN + IMAGE_BOTTOM_MARGIN + SLOT_SEPARATOR_HEIGHT; // how many pixels one slot image takes
var RUNTIME = 3000; // how long all slots spin before starting countdown
var SPINTIME = 1000; // how long each slot spins at minimum
var ITEM_COUNT = 6; // item count in slots
var SLOT_SPEED = 20; // how many pixels per second slots roll
var DRAW_OFFSET = 0; // how much draw offset in slot display from top

var BLURB_TBL = [
    'No win!',
    'Good!',
    'Excellent!',
    'JACKPOT!'
];

function shuffleArray( array ) {

    for (i = array.length - 1; i > 0; i--) {
		var j = parseInt(Math.random() * i)
		var tmp = array[i];
		array[i] = array[j]
		array[j] = tmp;
    }
}

// Images must be preloaded before they are used to draw into canvas
function preloadImages( images, callback ) {

    function _preload( asset ) {
		asset.img = new Image();
		asset.img.src = 'lib/image/jackpotassets/' + asset.id+'.png';

		asset.img.addEventListener("load", function() {
		    _check();
		}, false);

		asset.img.addEventListener("error", function(err) {
		    _check(err, asset.id);
		}, false);
    }

    var loadc = 0;
    function _check( err, id ) {
		if ( err ) {
		    alert('Failed to load ' + id );
		}
		loadc++;
		if ( images.length == loadc ) 
		    return callback()
    }

    images.forEach(function(asset) {
	_preload( asset );
    });
}

function copyArray( array ) {
    var copy = [];
    for( var i = 0 ; i < array.length; i++) {
		copy.push( array[i] );
    }
    return copy;
}

var nric = "";
var name = "";
var nationality = "";
var TotalAmountSpent ="";
var shop_1 ="";
var shop_2 ="";

function JackPotSlotGame() {
	
	// Get NRIC, Name, Nationality
	if(isClicked == true)
	{
		name = $("#NameField").val();
		nric = $("#NRICField").val();
		nationality = $("#dropDownCountries").val();
		TotalAmountSpent = $("#ReceiptField_1").val();	
		shop_1 = $("#dropDownShops_1").val();
		shop_2 = $("#dropDownShops_2").val();
	}
	else
	{
		var ID_First_Character = $("#NRICCodeField").val().slice(0, 1);
		
		if((ID_First_Character == 'S') || (ID_First_Character == 'T'))
		{
			nric = $("#NRICCodeField").val();
			TotalAmountSpent =$("#ReceiptField_1").val();
			shop_1 = $("#dropDownShops_1").val();
			shop_2 = $("#dropDownShops_2").val();
		}
		else if((ID_First_Character == 'G') || (ID_First_Character == 'F'))
		{
			nric =  $("#NRICCodeField").val().slice(0, 9);
			TotalAmountSpent = $("#ReceiptField_1").val();
			shop_1 = $("#dropDownShops_1").val();
			shop_2 = $("#dropDownShops_2").val();
		}
	}
	
    var game = new Game();

    var items = [ 
	{id: 'energy-64'},
	{id: 'staff-64'},
	{id: 'cash-64'},
	{id: 'build-64'},
	{id: 'goods-64'},
	{id: 'gold-64'}
    ];

    $('canvas').attr('height', IMAGE_HEIGHT * ITEM_COUNT * 2);
    $('canvas').css('height', IMAGE_HEIGHT * ITEM_COUNT * 2);

    game.items = items;

    // load assets and predraw the reel canvases
    preloadImages( items, function() {

	// images are preloaded

	// draws canvas strip
	function _fill_canvas( canvas, items ) {
	    ctx = canvas.getContext('2d');
	    //ctx.fillStyle = '#ddd';
	    ctx.fillStyle = '#ddd';

	    for (var i = 0 ; i < ITEM_COUNT ; i++) {
			var asset = items[i];
			ctx.save();
			ctx.shadowColor = "rgba(0,0,0,0.5)";
			ctx.shadowOffsetX = 1;
			ctx.shadowOffsetY = 1;
			ctx.shadowBlur = 1;
			ctx.drawImage(asset.img, 10, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
			ctx.drawImage(asset.img, 10, (i + ITEM_COUNT) * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
			ctx.restore();
			ctx.fillRect(15, i * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
			ctx.fillRect(15, (i + ITEM_COUNT)  * SLOT_HEIGHT, 70, SLOT_SEPARATOR_HEIGHT);
	    }
	}
	// Draw the canvases with shuffled arrays
	game.items1 = copyArray(items);
	shuffleArray(game.items1);
	_fill_canvas( game.c1[0], game.items1 );
	game.items2 = copyArray(items);
	shuffleArray(game.items2);
	_fill_canvas( game.c2[0], game.items2 );
	game.items3 = copyArray(items);
	shuffleArray(game.items3);
	_fill_canvas( game.c3[0], game.items3 );
	game.resetOffset =  (ITEM_COUNT + 3) * SLOT_HEIGHT;
	game.loop();
    });

    /***================= JACKPOT GAME METHOD: TRIGGER JACKPOT SPIN
    WHEN LEVER IS PULLED: special key to trigger is "*"" ==========================================
    ===============================================================
    ===========================================================***/
    

    $("#GamePlayCodeField").on("input",function(e){

    	document.getElementById("BackgroundAudio").pause();

        console.log("GamePlayCodeField:" + $("#GamePlayCodeField").val());

        // start game on Lever Pull
		game.restart();   

		//Disable further input of text into input fieldbox
		$("#GamePlayCodeField").prop("readOnly", true);  
		   
    });
}

function Game() {

    // reel canvases
    this.c1 = $('#canvas1');
    this.c2 = $('#canvas2');
    this.c3 = $('#canvas3');

    // set random canvas offsets
    this.offset1 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.offset2 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.offset3 = -parseInt(Math.random() * ITEM_COUNT ) * SLOT_HEIGHT;
    this.speed1 = this.speed2 = this.speed3 = 0;
    this.lastUpdate = new Date();

    // Needed for CSS translates
    this.vendor = 
	(/webkit/i).test(navigator.appVersion) ? '-webkit' :
    	(/firefox/i).test(navigator.userAgent) ? '-moz' :
	(/msie/i).test(navigator.userAgent) ? 'ms' :
    	'opera' in window ? '-o' : '';
    
    this.cssTransform = this.vendor + '-transform';
    this.has3d = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())  
    this.trnOpen       = 'translate' + (this.has3d ? '3d(' : '(');
    this.trnClose      = this.has3d ? ',0)' : ')';
    this.scaleOpen     = 'scale' + (this.has3d ? '3d(' : '(');
    this.scaleClose    = this.has3d ? ',0)' : ')';

    // draw the slots to initial locations
    this.draw( true );
}

// Restart the game and determine the stopping locations for reels
Game.prototype.restart = function() {

	//Play game audio
	document.getElementById("GameBackgroundAudio").pause();
    document.getElementById("GameBackgroundAudio").currentTime = 0;
    document.getElementById("GameBackgroundAudio").play();

    this.lastUpdate = new Date();
    this.speed1 = this.speed2 = this.speed3 = SLOT_SPEED

    // function locates id from items
    function _find( items, id ) {
		for ( var i=0; i < items.length; i++ ) {
		    if ( items[i].id == id ) return i;
		}
    }

    // uncomment to get always jackpot
    // this.result1 = _find( this.items1, 'staff-64' );
    // this.result2 = _find( this.items2, 'staff-64' );
    // this.result3 = _find( this.items3, 'staff-64' );

    // get random results
    this.result1 = parseInt(Math.random() * this.items1.length)
    this.result2 = parseInt(Math.random() * this.items2.length)
    this.result3 = parseInt(Math.random() * this.items3.length)

    // Clear stop locations
    this.stopped1 = false;
    this.stopped2 = false;
    this.stopped3 = false;

    // randomize reel locations
    this.offset1 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
    this.offset2 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;
    this.offset3 = -parseInt(Math.random( ITEM_COUNT )) * SLOT_HEIGHT;

    // $('#results').hide();

    this.state = 1;
}

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

Game.prototype.loop = function() {
    var that = this;
    that.running = true;
    (function gameLoop() {
		that.update();
		that.draw();
		if (that.running) {
		    requestAnimFrame( gameLoop );
		}
    })();
}

Game.prototype.update = function() {

    var now = new Date();
    var that = this;

    // Check slot status and if spun long enough stop it on result
    function _check_slot( offset, result ) {
	if ( now - that.lastUpdate > SPINTIME ) {
	    var c = parseInt(Math.abs( offset / SLOT_HEIGHT)) % ITEM_COUNT;
	    if ( c == result ) {
			if ( result == 0 ) {
			    if ( Math.abs(offset + (ITEM_COUNT * SLOT_HEIGHT)) < (SLOT_SPEED * 1.5)) {
					return true; // done
			    }
			} else if ( Math.abs(offset + (result * SLOT_HEIGHT)) < (SLOT_SPEED * 1.5)) {
			    return true; // done
			}
	    }
	}
	return false;
    }

    switch (this.state) {
	    case 1: // all slots spinning
		if (now - this.lastUpdate > RUNTIME) {
		    this.state = 2;
		    this.lastUpdate = now;
		}
		break;
	    case 2: // slot 1
		this.stopped1 = _check_slot( this.offset1, this.result1 );
		if ( this.stopped1 ) {
		    this.speed1 = 0;
		    this.state++;
		    this.lastUpdate = now;
		}
		break;
	    case 3: // slot 1 stopped, slot 2
		this.stopped2 = _check_slot( this.offset2, this.result2 );
		if ( this.stopped2 ) {
		    this.speed2 = 0;
		    this.state++;
		    this.lastUpdate = now;
		}
		break;
	    case 4: // slot 2 stopped, slot 3
		this.stopped3 = _check_slot( this.offset3, this.result3 );
		if ( this.stopped3 ) {
		    this.speed3 = 0;
		    this.state++;
		}
		break;
	    case 5: // slots stopped 
		if ( now - this.lastUpdate > 3000 ) {
		    this.state = 6;
		    
		    document.getElementById("GameBackgroundAudio").pause();
		}
		break;
	    case 6: //End of Game
		
		setTimeout(function() {
			
/*Check the slot result: depending on slot result will display the respective result page*/
/*            
if((that.items1[that.result1].id == 'goods-64') && (that.items2[that.result2].id == 'goods-64') && (that.items3[that.result3].id == 'gold-64') ){
	
	document.getElementById("CongratsAudio").pause();
    document.getElementById("CongratsAudio").currentTime = 0;
    document.getElementById("CongratsAudio").play();

    setTimeout(function() {

        document.getElementById("BackgroundAudio").pause();
    	document.getElementById("BackgroundAudio").currentTime = 0;
    	document.getElementById("BackgroundAudio").play();

    }, 6000); 

	//Randomise Winning - Prize 1
	var random_Winning_1 = Math.floor(Math.random() * Prize_1.length);
	var showPrize_1 = Prize_1[random_Winning_1];

	//Display Winning Prize: Prize 1
    $("#JackpotWinnings_Description").attr('src', showPrize_1).show();

	$('#VivoCity_JackPotGamePage').fadeOut({ duration: 1200, queue: false });
    $('#VivoCity_JackPotGamePage').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });


    $('#VivoCity_PrintVoucherPreview').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
    $('#VivoCity_PrintVoucherPreview').fadeIn({ duration: 1200, queue: false, complete:function(){


    	ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=" + showPrize_1 + "&game=JackPotSlotGame&name=" + nric + "&contact=" + name + "&email=" + nationality + "&mediaURL=1.mp4&projectID=VivoCity");

        setTimeout(function() {

        	location.reload();

        }, 8000); 
    }});

} else if((that.items1[that.result1].id == 'energy-64') && (that.items2[that.result2].id == 'energy-64') && (that.items3[that.result3].id == 'cash-64') ){
	
	document.getElementById("CongratsAudio").pause();
    document.getElementById("CongratsAudio").currentTime = 0;
    document.getElementById("CongratsAudio").play();
    
    setTimeout(function() {

        document.getElementById("BackgroundAudio").pause();
    	document.getElementById("BackgroundAudio").currentTime = 0;
    	document.getElementById("BackgroundAudio").play();

    }, 6000); 

	//Randomise Winning - Prize 2
	var random_Winning_2 = Math.floor(Math.random() * Prize_2.length);
	var showPrize_2 = Prize_2[random_Winning_2];

	//Display Winning Prize: Prize 2
	$("#JackpotWinnings_Description").attr('src', showPrize_2).show();

	$('#VivoCity_JackPotGamePage').fadeOut({ duration: 1200, queue: false });
    $('#VivoCity_JackPotGamePage').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });


    $('#VivoCity_PrintVoucherPreview').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
    $('#VivoCity_PrintVoucherPreview').fadeIn({ duration: 1200, queue: false, complete:function(){

    	ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=" + showPrize_2 + "&game=JackPotSlotGame&name=" + nric + "&contact=" + name + "&email=" + nationality + "&mediaURL=1.mp4&projectID=VivoCity");

        setTimeout(function() {

        	location.reload();

        }, 8000); 
    }});

} else if((that.items1[that.result1].id == 'cash-64') && (that.items2[that.result2].id == 'cash-64') && (that.items3[that.result3].id == 'build-64') ){
	
	document.getElementById("CongratsAudio").pause();
    document.getElementById("CongratsAudio").currentTime = 0;
    document.getElementById("CongratsAudio").play();
    
    setTimeout(function() {

        document.getElementById("BackgroundAudio").pause();
    	document.getElementById("BackgroundAudio").currentTime = 0;
    	document.getElementById("BackgroundAudio").play();

    }, 6000); 

	//Randomise Winning - Prize 3
	var random_Winning_3 = Math.floor(Math.random() * Prize_3.length);
	var showPrize_3 = Prize_3[random_Winning_3];

	//Display Winning Prize: Prize 3
	$("#JackpotWinnings_Description").attr('src', showPrize_3).show();

	$('#VivoCity_JackPotGamePage').fadeOut({ duration: 1200, queue: false });
    $('#VivoCity_JackPotGamePage').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });


    $('#VivoCity_PrintVoucherPreview').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
    $('#VivoCity_PrintVoucherPreview').fadeIn({ duration: 1200, queue: false, complete:function(){

    	ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=" + showPrize_3 + "&game=JackPotSlotGame&name=" + nric + "&contact=" + name + "&email=" + nationality + "&mediaURL=1.mp4&projectID=VivoCity");

        setTimeout(function() {

        	location.reload();

        }, 8000); 
    }});

} else if((that.items1[that.result1].id == 'build-64') && (that.items2[that.result2].id == 'build-64') && (that.items3[that.result3].id == 'build-64') ){
	
	document.getElementById("CongratsAudio").pause();
    document.getElementById("CongratsAudio").currentTime = 0;
    document.getElementById("CongratsAudio").play();
    
    setTimeout(function() {

        document.getElementById("BackgroundAudio").pause();
    	document.getElementById("BackgroundAudio").currentTime = 0;
    	document.getElementById("BackgroundAudio").play();

    }, 6000); 

	//Display GAP as Prize Winning

	//Display Winning Prize: GAP
    $("#JackpotWinnings_Description").attr('src', "lib/image/Prize/Gap.png").show();

	$('#VivoCity_JackPotGamePage').fadeOut({ duration: 1200, queue: false });
    $('#VivoCity_JackPotGamePage').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });


    $('#VivoCity_PrintVoucherPreview').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
    $('#VivoCity_PrintVoucherPreview').fadeIn({ duration: 1200, queue: false, complete:function(){

    	ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=lib/image/Prize/Gap.png&game=JackPotSlotGame&name=" + nric + "&contact=" + name + "&email=" + nationality + "&mediaURL=1.mp4&projectID=VivoCity");

        setTimeout(function() {

        	location.reload();

        }, 8000); 
    }});

} else if((that.items1[that.result1].id == 'staff-64') && (that.items2[that.result2].id == 'staff-64') && (that.items3[that.result3].id == 'staff-64') ){
	
	document.getElementById("CongratsAudio").pause();
    document.getElementById("CongratsAudio").currentTime = 0;
    document.getElementById("CongratsAudio").play();
    
    setTimeout(function() {

        document.getElementById("BackgroundAudio").pause();
    	document.getElementById("BackgroundAudio").currentTime = 0;
    	document.getElementById("BackgroundAudio").play();

    }, 6000); 

	//Display Guess as Prize Winning

    //Display Winning Prize: Guess
    $("#JackpotWinnings_Description").attr('src', "lib/image/Prize/Guess.png").show();

	$('#VivoCity_JackPotGamePage').fadeOut({ duration: 1200, queue: false });
    $('#VivoCity_JackPotGamePage').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });


    $('#VivoCity_PrintVoucherPreview').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
    $('#VivoCity_PrintVoucherPreview').fadeIn({ duration: 1200, queue: false, complete:function(){

    	ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=lib/image/Prize/Guess.png&game=JackPotSlotGame&name=" + nric + "&contact=" + name + "&email=" + nationality + "&mediaURL=1.mp4&projectID=VivoCity");

        setTimeout(function() {

        	location.reload();

        }, 8000); 
    }});

} else{

	//If user has got no winning sets
    
    document.getElementById("BackgroundAudio").pause();
    document.getElementById("BackgroundAudio").currentTime = 0;
    document.getElementById("BackgroundAudio").play();

	$('#VivoCity_JackPotGamePage').fadeOut({ duration: 1200, queue: false });
    $('#VivoCity_JackPotGamePage').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });


    $('#VivoCity_JackpotLose').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
    $('#VivoCity_JackpotLose').fadeIn({ duration: 1200, queue: false, complete:function(){
		
		ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=LOST&game=JackPotSlotGame&name=" + nric + "&contact=" + name + "&email=" + nationality + "&mediaURL=1.mp4&projectID=VivoCity");

        setTimeout(function() {

        	location.reload();

        }, 8000); 
    }});
}
*/
			
			document.getElementById("CongratsAudio").pause();
    		document.getElementById("CongratsAudio").currentTime = 0;
   			document.getElementById("CongratsAudio").play();
   	 
    		setTimeout(function() {

        		document.getElementById("BackgroundAudio").pause();
    			document.getElementById("BackgroundAudio").currentTime = 0;
    			document.getElementById("BackgroundAudio").play();

    		}, 6000); 
		
			ajax_addGameResult("game.do", "formType=addGameResult&gameFinalResult=" + shop_2 + "&game=" + shop_1 + "&name=" + nric + "&contact=" + name + "&email=" + nationality + "&mediaURL=" + TotalAmountSpent + "&projectID=VIVOCITY_CNY_2017");
			
        	//Check on voucher availability: if available: show voucher, else: show voucher unavailable and play memory game
        	ajax_usedRandomValidVoucher("voucher.do", "formType=usedRandomValidVoucher&campaignCode=VIVOCITY_CNY_2017&name=" + nric + "&contact=" + name + "&email=" + nationality + "&isEmail=true&isPrint=false&allowMarketing=true&deviceID=1&venueID=1");
		
		}, 1500); 

		this.state = 7;
		break;
	    case 7: // game ends
		break;
	    default:
    }
    this.lastupdate = now;
}

Game.prototype.draw = function( force ) {

    if (this.state >= 6 ) return;

    // draw the spinning slots based on current state
    for (var i=1; i <= 3; i++ ) {
		var resultp = 'result'+i;
		var stopped = 'stopped'+i;
		var speedp = 'speed'+i;
		var offsetp = 'offset'+i;
		var cp = 'c'+i;
		if (this[stopped] || this[speedp] || force) {
		    if (this[stopped]) {
			this[speedp] = 0;
			var c = this[resultp]; // get stop location
			this[offsetp] = -(c * SLOT_HEIGHT);

			if (this[offsetp] + DRAW_OFFSET > 0) {
			    // reset back to beginning
			    this[offsetp] = -this.resetOffset + SLOT_HEIGHT * 3;
			}

		    } else {
			this[offsetp] += this[speedp];
			if (this[offsetp] + DRAW_OFFSET > 0) {
			    // reset back to beginning
			    this[offsetp] = -this.resetOffset + SLOT_HEIGHT * 3 - DRAW_OFFSET;
			}
		    }
		    // translate canvas location
		    this[cp].css(this.cssTransform, this.trnOpen + '0px, '+(this[offsetp] + DRAW_OFFSET)+'px' + this.trnClose);
		}
    }
}