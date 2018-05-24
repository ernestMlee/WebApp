// ====================================================================================================
// Brand Listing (Shilla) =============================================================================
// ====================================================================================================
function ajax_getBrandList(url, parameters, index)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#brand_list_" + index).html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getBrandInfo(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#brandData").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}


// ====================================================================================================
// Scenario (NTUC) ====================================================================================
// ====================================================================================================
function ajax_getNextNTUCScenario(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			nextNTUCScenario = data;
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// HDB Yuhua ==========================================================================================
// ====================================================================================================
function ajax_light(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_setMenuItem(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getMenuItem(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "0")
			{
				isYuhuaPlaying = false;
				$("#jquery_jplayer_yuhua").fadeOut();
			}
			else
			{
				if(isYuhuaPlaying == false)
				{
					$("#jquery_jplayer_yuhua").jPlayer("setMedia", {
						m4v: "videos/item_" + data + ".mp4"
					}).jPlayer("play");
					$("#jquery_jplayer_yuhua").fadeIn();
					isYuhuaPlaying = true;
				}
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// SingTel ============================================================================================
// ====================================================================================================
function ajax_setIsTrigger(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getIsTrigger(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "true")
			{
				startLaunch();
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Function (SAFRA) ===================================================================================
// ====================================================================================================
function ajax_getPromotion(url, parameters, id)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				promotionContentArray = data.split("@@@");
				$("#news_promotions_content").html(promotionContentArray[0]);
			}
			else
			{
				promotionContentArray = [];
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getClubOfferings(url, parameters, id)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#" + id).html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getClubOfferingsContent(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				var infoList = data.split("@@@");
				
				$("#club_offering_content_header_image").html(infoList[0]);
				$("#club_offering_content").html(infoList[1]);
			}
			else
			{
				$("#club_offering_content_header_image").html("<img src='../lib/image/transparent.png' width='1080' height='330'/>");
				$("#club_offering_content").html("");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getEventCourse(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				var infoList = data.split("@@@");
				
				$("#events_activities_content_shortcut_content").html(infoList[0]);
				$("#events_activities_content").html(infoList[1]);
			}
			else
			{
				$("#events_activities_content_shortcut_content").html("");
				$("#events_activities_content").html("");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getClubFacility(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#club_facilities_menu").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getClubFacilityContent(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) {
			if(data != "")
			{
				var infoList = data.split("@@@");
				
				$("#club_facility_content_header_image").html(infoList[0]);
				$("#club_facility_content").html("<div style='padding:10 10 10 10;'>" + infoList[1] + "</div>");
			}
			else
			{
				$("#club_facility_content_header_image").html("<img src='../lib/image/transparent.png' width='1080' height='330'/>");
				$("#club_facility_content").html("");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Feedback Listing (SAFRA) ===========================================================================
// ====================================================================================================
function ajax_submitFeedback(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getFeedbackType(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#feedback_type").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getFeedbackCategory(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#feedback_category").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getFeedbackArea(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#feedback_area").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getFeedbackIssueOne(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#feedback_issue_one").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getFeedbackIssueTwo(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#feedback_issue_two").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Way Finding ========================================================================================
// ====================================================================================================
function ajax_getCoorX(url, parameters)
{
	 $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				var coorXList = data.split(",");
				
				for(i = 0; i < coorXList.length; i++)
				{
					var coorX = parseInt(coorXList[i]) - interactive_directory_x_offset;
					interactive_directory_pin_x_list.push(coorX);
				}
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getCoorY(url, parameters)
{
	 $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				var coorYList = data.split(",");
				
				for(i = 0; i < coorYList.length; i++)
				{
					var coorY = parseInt(coorYList[i]) - interactive_directory_y_offset;
					interactive_directory_pin_y_list.push(coorY);
				}
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getWay(url, parameters)
{
	 $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				//console.log("data: " + data);
				interactive_directory_way = data.split(",");
				interactive_directory_navigate();
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Game ===============================================================================================
// ====================================================================================================
function ajax_initiateGame(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				$("#interaction").val(data);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_startGame(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_endGame(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_registerGame(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 

        	ajax_addInteraction("function.do", "formType=addInteraction&application=MAIN&mediaURL=1.mp4&projectID=VeloCity&interaction=SCAN");

        	if (data == "CODE_REDEEMED_BEFORE"){
        		
        		document.getElementById("error").pause();
	            document.getElementById("error").currentTime = 0;
	            document.getElementById("error").play();
        		$('#VeloCity_Start').fadeOut({ duration: slideDuration, queue: false });
        		$('#QR_Issue').fadeIn({ duration: slideDuration, queue: false });
        		setTimeout(function() {
		            //Delay of 5 seconds before notification page exits and navigates back to start background video
		            $('#QR_Issue').fadeOut({ duration: slideDuration, queue: false });
		            $('#VeloCity_Start').fadeIn({ duration: slideDuration, queue: false });
		            //Set Field to be empty
		            $("#QRCodeField").val("");
		            $("#QRCodeField").focus();
		        }, 5000); 
        	}else if(data == "CODE_NOT_EXIST"){
        		document.getElementById("error").pause();
	            document.getElementById("error").currentTime = 0;
	            document.getElementById("error").play();
        		$('#VeloCity_Start').fadeOut({ duration: slideDuration, queue: false });
        		$('#QR_Issue').fadeIn({ duration: slideDuration, queue: false });
        		setTimeout(function() {
		            //Delay of 5 seconds before notification page exits and navigates back to start background video
		            $('#QR_Issue').fadeOut({ duration: slideDuration, queue: false });
		            $('#VeloCity_Start').fadeIn({ duration: slideDuration, queue: false });
		            //Set Field to be empty
		            $("#QRCodeField").val("");
		            $("#QRCodeField").focus();
		        }, 5000); 
        	}else if (data == "SUCCESS"){
        		$('#VeloCity_Start').fadeOut({ duration: slideDuration, queue: false });
        		$('#VeloCity_TnC').fadeIn({ duration: slideDuration, queue: false });
        		$("#QRCodeField").val("");
        	}
        },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getGameResult(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				var dataList = data.split("@");
				$("#content").html(dataList[0]);
				
				$("#statistic").html(dataList[1]);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_addGameResult(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getLastestRegisterGameResult(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) {
			console.log("data: " + data);
			if(data == "NO_GAME")
			{
				$("#scoreboard_page").fadeOut();
				$("#scoreboard_index_page").fadeIn();
			}
			else if(data == "SINGLE")
			{
				$("#scoreboard_page").fadeOut();
				$("#scoreboard_index_page").fadeIn();
			}
			else
			{
				$("#score_1").attr("src", "../lib/image/score/pend.png");
				$("#score_2").attr("src", "../lib/image/score/pend.png");
				$("#score_3").attr("src", "../lib/image/score/pend.png");
				
				$("#scoreboard_index_page").fadeOut();
				$("#scoreboard_page").fadeIn();
				
				var resultArray = data.split(",");
				for(i = 0; i < resultArray.length; i++)
				{
					if(resultArray[i] == "0")
					{
						$("#score_" + (i + 1)).attr("src", "../lib/image/score/miss.png");
					}
					else if(resultArray[i] == "1")
					{
						$("#score_" + (i + 1)).attr("src", "../lib/image/score/score.png");
					}
				}
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Voucher ============================================================================================
// ====================================================================================================
function ajax_voucher_submitForEmail(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#voucherID").val(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_voucher_submitForPrint(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#voucherID").val(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_voucher_submitForEmailPrint(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#voucherID").val(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_voucher_usedVoucher(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_voucher_retrieveRandomValidVoucher(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			console.log("data: " + data);
			if(data == "NO_VOUCHER")
			{
				// Error stating no more voucher
				voucherID = "";
				voucherDisplayMedia = "";
				voucherPrintMedia = "";
				$('#Voucher_Gone').show();
			}
			else
			{
				var dataList = data.split("@");
				
				voucherID = dataList[0];
				
				voucherDisplayMedia = dataList[1];
				voucherDisplayMedia = voucherDisplayMedia.replace("C:/Program Files/Apache Software Foundation/Tomcat 8.0/webapps/Courts/", "");
				
				voucherPrintMedia = dataList[1];
				voucherPrintMedia = voucherPrintMedia.replace("Voucher", "Print");
				
				$('#Courts_Start').fadeOut({ duration: 1200, queue: false });
		        $('#Courts_Start').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
		
		        $('#Courts_TnC').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
		
		        $('#Courts_TnC').fadeIn({ duration: 1200, queue: false});
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_usedRandomValidVoucher(url, parameters)
{
	 $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			SHOWVOUCHERNAME = data;
			console.log("SHOWVOUCHERNAME: " + SHOWVOUCHERNAME);
			if(SHOWVOUCHERNAME == 'NO_VOUCHER'){

        		//Inform user that all vouchers have been redeemed, play memory game

        		$('#VivoCity_JackPotGamePage').fadeOut({ duration: 1200, queue: false });
			    $('#VivoCity_JackPotGamePage').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });

			    $('#VivoCity_FullyRedeemed').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
			    $('#VivoCity_FullyRedeemed').fadeIn({ duration: 1200, easing: 'easeInOutQuart', queue: false });
        	}else{

        		//Show voucher and refresh page

        		//Display Winning Prize

            	$("#JackpotWinnings_Description").attr('src', 'lib/image/Prize/' + SHOWVOUCHERNAME).show();

            	$('#VivoCity_JackPotGamePage').fadeOut({ duration: 1200, queue: false });
			    $('#VivoCity_JackPotGamePage').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });


			    $('#VivoCity_PrintVoucherPreview').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
			    $('#VivoCity_PrintVoucherPreview').fadeIn({ duration: 1200, queue: false, complete:function(){
			    	
			        setTimeout(function() {

			        	location.reload();

			        }, 8000); 
			    }});

        	}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_voucher_checkExistCustomer(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			console.log("data: " + data);
			if(data == "true")
			{
				if (isClicked ==  true){

					$('#VivoCity_Foreigner_Details').fadeOut({ duration: 1200, queue: false });

		            $('#VivoCity_Redeem_Error').fadeIn({ duration: 1200, queue: false});
		            
		            setTimeout(function() {
		                location.reload();
		            }, 5000); 
				}else{

					$('#VivoCity_Scan_Page').fadeOut({ duration: 1200, queue: false });

	                $('#VivoCity_Redeem_Error').fadeIn({ duration: 1200, queue: false});
	                
	                setTimeout(function() {
	                    location.reload();
	                }, 5000); 
				}
			}
			else
			{

				if (isClicked == true){

					$('#VivoCity_Foreigner_Details').fadeOut({ duration: 1200, queue: false });
	                $('#VivoCity_Foreigner_Details').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });
	                $('#VivoCity_Receipt_Details').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });

	                $('#VivoCity_Receipt_Details').fadeIn({ duration: 1200, queue: false, complete: function(){

	                    $("#ReceiptField_1").val("");
			            $("#ReceiptField_1").focus();
			            
			            $("#ReceiptField_2").val("");
			            $("#ReceiptField_2").focus();

	                    //Keyboard functionality

	                    $('#mobile_keyboard li').off('click').on('click',function(){
	                        console.log("click");
	                        idleTime = 0;
	                        
	                        var $this = $(this),
	                            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
	                        console.log("character:" +character);
	                        
	                        // Shift keys
	                        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
	                            $('.letter').toggleClass('uppercase');
	                            $('.symbol span').toggle();
	                            
	                            shift = (shift === true) ? false : true;
	                            capslock = false;
	                            return false;
	                        }
	                        
	                        // Caps lock
	                        if ($this.hasClass('capslock')) {
	                            $('.letter').toggleClass('uppercase');
	                            capslock = true;
	                            return false;
	                        }
	                        
	                        // Delete
	                        if ($this.hasClass('delete')) {
	                            var html = $write.val();
	                            
	                            $write.val(html.substr(0, html.length - 1));
	                            return false;
	                        }
	                        
	                        // Clear
	                        if ($this.hasClass('clear')) {
	                            var html = $write.val();
	                            
	                            $write.val("");
	                            return false;
	                        }
	                        
	                        // Special characters
	                        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
	                        if ($this.hasClass('space')) character = ' ';
	                        if ($this.hasClass('tab')) character = "\t";
	                        if ($this.hasClass('return')) character = "\n";
	                        
	                        // Uppercase letter
	                        if ($this.hasClass('uppercase')) character = character.toUpperCase();
	                        
	                        // Remove shift once a key is clicked.
	                        if (shift === true) {
	                            $('.symbol span').toggle();
	                            if (capslock === false) $('.letter').toggleClass('uppercase');
	                            
	                            shift = false;
	                        }
	                         // Add the character
	                         //$write.val($write.val() + character);

	                        var inputValue = $write.val();
	                        textBefore = inputValue.substring(0,  cursorPos);
	                        textAfter  = inputValue.substring(cursorPos, inputValue.length);

	                        $write.val(textBefore + character + textAfter);
	                        cursorPos += character.length;
	                    });
	                }});
				}else{
					
					document.getElementById("ClickSoundAudio").pause();
	        		document.getElementById("ClickSoundAudio").currentTime = 0;
	       	 		document.getElementById("ClickSoundAudio").play();
					
					$('#VivoCity_Scan_Page').fadeOut({ duration: 1200, queue: false });
	                $('#VivoCity_Scan_Page').animate({'left':'1921px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });

	                $('#VivoCity_Receipt_Details').animate({'left':'0px'}, { duration: 1200, easing: 'easeInOutQuart', queue: false });

	                $('#VivoCity_Receipt_Details').fadeIn({ duration: 1200, queue: false, complete: function(){

	                    $("#ReceiptField_1").val("");
			            $("#ReceiptField_1").focus();
			            
			            $("#ReceiptField_2").val("");
			            $("#ReceiptField_2").focus();

	                    //Keyboard functionality

	                    $('#mobile_keyboard li').off('click').on('click',function(){
	                        console.log("click");
	                        idleTime = 0;
	                        
	                        var $this = $(this),
	                            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
	                        console.log("character:" +character);
	                        
	                        // Shift keys
	                        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
	                            $('.letter').toggleClass('uppercase');
	                            $('.symbol span').toggle();
	                            
	                            shift = (shift === true) ? false : true;
	                            capslock = false;
	                            return false;
	                        }
	                        
	                        // Caps lock
	                        if ($this.hasClass('capslock')) {
	                            $('.letter').toggleClass('uppercase');
	                            capslock = true;
	                            return false;
	                        }
	                        
	                        // Delete
	                        if ($this.hasClass('delete')) {
	                            var html = $write.val();
	                            
	                            $write.val(html.substr(0, html.length - 1));
	                            return false;
	                        }
	                        
	                        // Clear
	                        if ($this.hasClass('clear')) {
	                            var html = $write.val();
	                            
	                            $write.val("");
	                            return false;
	                        }
	                        
	                        // Special characters
	                        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
	                        if ($this.hasClass('space')) character = ' ';
	                        if ($this.hasClass('tab')) character = "\t";
	                        if ($this.hasClass('return')) character = "\n";
	                        
	                        // Uppercase letter
	                        if ($this.hasClass('uppercase')) character = character.toUpperCase();
	                        
	                        // Remove shift once a key is clicked.
	                        if (shift === true) {
	                            $('.symbol span').toggle();
	                            if (capslock === false) $('.letter').toggleClass('uppercase');
	                            
	                            shift = false;
	                        }
	                         // Add the character
	                         //$write.val($write.val() + character);

	                        var inputValue = $write.val();
	                        textBefore = inputValue.substring(0,  cursorPos);
	                        textAfter  = inputValue.substring(cursorPos, inputValue.length);

	                        $write.val(textBefore + character + textAfter);
	                        cursorPos += character.length;
	                    });
	                }});
				}
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Videowall, Portrait, Vending
// ====================================================================================================
function ajax_addInteraction(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitForEmail(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#photoboothID").val(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitForEmailPrint(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#photoboothID").val(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitForPrint(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#photoboothID").val(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitForQR(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				var list = data.split("@");
				
				$("#photobooth_qr_code").attr("src", list[0]);
				$("#photoboothID").val(list[1]);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitForTemplatePrint(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				$("#photoboothID").val(data);
				
				$("#zodiac_print_page").animate({"top": "100px"}, 500, function() {
					$("#zodiac_print_page").animate({"top": "-1920px"}, 500, function() {
						zodiac_thankyou_page();
						$("#zodiac_submit_button").show();
					});
				});
			}
			else
			{
				$("#zodiac_submit_button").show();
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitForDownload(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#photoboothID").val(data);
			
			if(hasInternet)
			{
				var isWeekend = false;
				
				var today = new Date();
				if(today.getDay() == 6 || today.getDay() == 0)
				{
					isWeekend = true;
				}
				
				if(isWeekend)
				{
					$("#download_print_button").show();
				}
				else
				{
					$("#download_print_button").hide();
				}
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitForPrintWithCode(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#photoboothID").val(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitParticularsAfterPhoto(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getUniqueDownloadCode(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#randomCode_download").html(data);
			ajax_submitForDownload("photobooth.do", "formType=storeDownload&mediaURL=" + triggerVideoURL + "&projectID=" + triggerLibURL + "&border=" + selectedFrameIndex + "&name=&email=&contact=&code=" + data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getUniquePrintCode(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#randomCode_print").html(data);
			ajax_submitForPrintWithCode("photobooth.do", "formType=storePrintWithCode&mediaURL=" + triggerVideoURL + "&projectID=" + triggerLibURL + "&border=" + selectedFrameIndex + "&name=&email=&contact=&code=" + data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_downloadQRPhoto(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "PHOTO_NOT_FOUND")
			{
				$("#error").html("* Your photo is not ready yet. Please try again later.");
			}
			else
			{
				window.location.href = data;
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_checkDownloadPhoto(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "EXIST")
			{
				$("#downloadPhotoForm").submit();
			}
			else if(data == "CODE_NOT_FOUND")
			{
				$("#error").html("* &#29031;&#29255;&#27491;&#22312;&#22788;&#29702;&#20013;,&#35831;&#31245;&#21518;&#37325;&#35797;");
			}
			else
			{
				$("#error").html("* &#29031;&#29255;&#27491;&#22312;&#22788;&#29702;&#20013;,&#35831;&#31245;&#21518;&#37325;&#35797;");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_checkPrintPhoto(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "EXIST")
			{
				$("#error").html("* &#24744;&#30340;&#30456;&#29255;&#23558;&#20250;&#19981;&#20037;&#21518;&#25171;&#21360;&#20986;&#26469;");
			}
			else if(data == "CODE_NOT_FOUND")
			{
				$("#error").html("* &#29031;&#29255;&#27491;&#22312;&#22788;&#29702;&#20013;,&#35831;&#31245;&#21518;&#37325;&#35797;");
			}
			else
			{
				$("#error").html("* &#29031;&#29255;&#27491;&#22312;&#22788;&#29702;&#20013;,&#35831;&#31245;&#21518;&#37325;&#35797;");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_submitParticularsAfterPhoto(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_detection(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getTotalSmile(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#smiles_counter_text").html(data);
			
			/*
			$("#camera_page").fadeOut(function() {
				playThankYouPlayer();
				$("#thankyou_page").show();
				
				ajax_submitForPrint("function.do", "formType=storePrint&mediaURL=" + triggerVideoURL + "&projectID=" + triggerLibURL + "&border=1&name=&email=&contact=");
			});
			*/
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_vending(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_randomVending(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				$("#txtRackNo").val(data);
				prize_page();
			}
			else
			{
				console.log("Vending is empty.");
				fully_redeem_page();
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_vend(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
        	if(data == "fail"){
        		console.log("gift ran out");
        		
        		setTimeout(function() {
		            location.reload();
        		}, 10000); 
        	}
        },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_checkRemoteVendCount(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				var dataList = data.split("@");
				$("#updatedDate").html(dataList[0]);
				$("#content").html(dataList[1]);
				$("#content_history").html(dataList[2]);
				$("#content_transaction").html(dataList[3]);
			}
			else
			{
				$("#updatedDate").html("-");
				$("#content").html("");
				$("#content_history").html("");
				$("#content_transaction").html("");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_checkSpecial(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "true")
			{
				surprise_loading_page();
			}
			else
			{
				thankyou_page("1");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_checkReference(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#txtResult").val(data);
				
			if(data == "MEMBER NOT FOUND")
			{
				setTimeout(function() { 
					fail_page();
				}, 3000);
			}
			else if(data == "CONTACT MEMBER")
			{
				setTimeout(function() { 
					fail_page();
				}, 3000);
			}
			else if(data == "MEMBER_REDEEM_BEFORE")
			{
				setTimeout(function() { 
					redeem_before_page();
				}, 3000);
			}
			else if(data == "ASIAMALL_SERVER_ERROR")
			{
				setTimeout(function() { 
					fail_page();
				}, 3000);
			}
			else
			{
				var spendAmt = parseFloat(data);
				$("#spending_amount").html("$" + spendAmt.toFixed(2));
				
				setTimeout(function() { 
					if(spendAmt >= 250)
					{
						spending_page("1");
					}
					else
					{
						spending_page("2");
					}
				}, 3000);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_redeemPrize(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "TRUE")
			{
			}
			else
			{
				if(data == "FAIL:REFERENCE_ALREADY_EXIST")
				{
				}
				else
				{
				}
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_sendCatalogue(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "TRUE")
			{
			}
			else
			{
				if(data == "FAIL:REFERENCE_ALREADY_EXIST")
				{
				}
				else
				{
				}
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}


// ====================================================================================================
// Social Canvas ======================================================================================
// ====================================================================================================
function ajax_addBoardcast(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveAllFeedAdmin(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#socialmedia").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveFeedAdmin(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#socialmedia").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveFeedAdminRank(url, parameters, isAppend)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(isAppend)
			{
				$("#socialmedia").append(data);
			}
			else
			{
				$("#socialmedia").html(data);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveFeedAdminRankTop(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#ranking").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_rank(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			mind_search_function(true);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_acceptFeed(url, parameters, venueID, media)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			ajax_retrieveFeedAdmin("../../socialmedia.do", "formType=retrieveFeedAdmin&venueID=" + venueID + "&media=" + media);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_ignoreFeed(url, parameters, venueID, media)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			ajax_retrieveFeedAdmin("../../socialmedia.do", "formType=retrieveFeedAdmin&venueID=" + venueID + "&media=" + media);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveTotalBoardcastFeeds(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#total_count").html(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveBoardcastFeeds(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			var infoArray = data.split("!@!@!");
			
			for(i = 1; i <= 10; i++)
			{
				$("#quote_" + (i + 1)).html("");
			}
			
			for(i = 0; i < infoArray.length; i++)
			{
				$("#quote_" + (i + 1)).html(infoArray[i]);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveTwitterFeeds(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#twitter_page_content").html(data);
			var offsetHeight = document.getElementById("twitter_page_content").offsetHeight;
			$("#twitter_image_blocker").attr("height", offsetHeight);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveInstagramFeeds(url, parameters, isAppend)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) {
        	
			if(data != "")
			{
				if(isAppend)
				{
					$("#displayPage").append(data);
				}
				else
				{
					$("#displayPage").html(data);
				}
				
				instagram_display_page++;
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveFacebookFeeds(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
        	
			$("#facebook_page_content").html(data);
			var offsetHeight = document.getElementById("facebook_page_content").offsetHeight;
			//$("#facebook_image_blocker").attr("height", offsetHeight);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_retrieveInstagramRankFeeds(url, parameters, idOfIndex)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			console.log("instagram: " + data);
			if(data != "")
			{
				var infoList = data.split("@@@");
				
				$("#" + idOfIndex).html("<div style='width:300px; height:300px; overflow:hidden; background-color:#FFFFFF; position:relative;'>" + infoList[1] + "</div>");
				$("#" + idOfIndex + "_name_bg").show();
				$("#" + idOfIndex + "_name").html(infoList[0]);
			}
			else
			{
				$("#" + idOfIndex).html("");
				$("#" + idOfIndex + "_name_bg").hide();
				$("#" + idOfIndex + "_name").html("");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Gallery ============================================================================================
// ====================================================================================================
function ajax_getLatestGallery(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#photobooth_preview_1").hide();
			$("#photobooth_preview_2").hide();
			$("#photobooth_preview_3").hide();
			$("#photobooth_preview_4").hide();
			
			if(data != "")
			{
				var dataList = data.split("@");
				
				for(i = 0; i < dataList.length; i++)
				{
					$("#photobooth_preview_" + (i + 1)).attr("src", "../photobooth/print_out/" + dataList[i]);
					$("#photobooth_preview_" + (i + 1)).show();
				}
			}
			
			/*
			if(data != "")
			{
				var dataList = data.split("@");
				
				for(i = 0; i < dataList.length; i++)
				{
					$("#gallery_" + (i + 1)).attr("src", dataList[i]);
				}
			}
			else
			{
				$("#gallery_1").attr("src", dataList[i]);
				$("#gallery_1").attr("src", dataList[i]);
				$("#gallery_1").attr("src", dataList[i]);
				$("#gallery_1").attr("src", dataList[i]);
			}
			*/
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_randomPhotoGallery(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				var dataList = data.split("@");
				
				for(i = 0; i < dataList.length; i++)
				{
					$("#gallery_" + (i + 1)).attr("src", dataList[i]);
				}
			}
			else
			{
				$("#gallery_1").attr("src", dataList[i]);
				$("#gallery_1").attr("src", dataList[i]);
				$("#gallery_1").attr("src", dataList[i]);
				$("#gallery_1").attr("src", dataList[i]);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Flash ==============================================================================================
// ====================================================================================================
function ajax_initArduino(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

function ajax_getArduinoFeedback(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			console.log ("Data: " + data);
        	interrupt(data);
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}


function ajax_flash(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { },
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Read Playlist ======================================================================================
// ====================================================================================================
function ajax_readPlaylist(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			videoURLList = [];
			libURLList = [];
			applicationURLList = [];
			
			var list = data.split("@");
			
			var content;
			for(i = 0; i < list.length; i++)
			{
				content = list[i].split(",");
				
				videoURLList.push(content[0]);
				libURLList.push(content[1]);
				applicationURLList.push(content[2]);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Read Promotionlist =================================================================================
// ====================================================================================================
function ajax_readPromotionlist(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			var list = data.split("@");
			
			for(i = 0; i < list.length; i++)
			{
				promotionlist.push(list[i]);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Read Pricelist =====================================================================================
// ====================================================================================================
function ajax_readPricelist(url, parameters)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			var list = data.split("@");
			
			var innerList = [];
			for(i = 0; i < list.length; i++)
			{
				innerList = list[i].split(",");
				priceArray.push(innerList);
			}
			
			toggle_price();
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Check Internet Connection ==========================================================================
// ====================================================================================================
function ajax_checkInternetConnection(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data == "false")
			{
				hasInternet = false;
				
				$("#photobooth_camera_option_without_internet").show();
				$("#photobooth_camera_option_with_internet").hide();
				//$("#weekday_option").hide();
				//$("#weekend_option").hide();
			}
			else
			{
				hasInternet = true;
				
				$("#photobooth_camera_option_without_internet").hide();
				$("#photobooth_camera_option_with_internet").show();
				
				/*
				var isWeekend = false;
				
				var today = new Date();
				if(today.getDay() == 6 || today.getDay() == 0)
				{
					isWeekend = true;
				}
				
				if(isWeekend)
				{
					$("#weekday_option").hide();
					$("#weekend_option").show();
				}
				else
				{
					$("#weekday_option").show();
					$("#weekend_option").hide();
				}
				*/
			}
			
			$("#photobooth_camera_option_page").fadeIn();
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Get Weather Status =================================================================================
// ====================================================================================================
function ajax_getWeatherStatus(url, parameters, temperatureID, iconID)
{
	$.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				console.log("data: " + data);
				
				var infoList = data.split("@");
				$("#" + temperatureID).html(infoList[1] + "&deg;C&nbsp;&nbsp;");
				$("#" + iconID).attr("src", "../lib/image/weather/" + infoList[0] + ".png");
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Tabulet Result =====================================================================================
// ====================================================================================================
function ajax_tabuletResult(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				console.log("data: " + data);
				$("#stats").html(data);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Tabulet Advertisement ==============================================================================
// ====================================================================================================
function ajax_tabuletAdvertisement(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				$("#advertisement").html(data);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Tabulet Health =====================================================================================
// ====================================================================================================
function ajax_tabuletHealth(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			if(data != "")
			{
				$("#health").html(data);
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================


// ====================================================================================================
// Get Venue Devices ==================================================================================
// ====================================================================================================
function ajax_getVenueDevices(url, parameters)
{
    $.ajax({
        type: "POST",
        url: url, 
        data: parameters,
		dataType: 'text',
        success: function(data) { 
			$("#device_selection").empty();
			if(data != "")
			{
				var deviceList = data.split("@");
				
				var innerList;
				for(i = 0; i < deviceList.length; i++)
				{
					innerList = deviceList[i].split(",");
					$("#device_selection").append("<option value='" + innerList[0] + "'>" + innerList[1] + "</option>");
				}
				
				tabuletAdvertisement();
			}
		},
		complete: function(data) { },
        error: function(request, status,error) { }
	});
}

// ====================================================================================================