var photobooth_selectedFrameIndex = 1;
var photobooth_snap_counter = 0;
var photobooth_isFirst = true;
var isPhotoboothType = true;

var photobooth_canvas;
var photobooth_context;
var photobooth_videoFeed;
var target_photbooth;
var target_photbooth_context;

var photobooth_location = "test_event";

function photobooth_snap() {
    target_photbooth = document.getElementById("target");
    target_photbooth_context =target_photbooth.getContext("2d", { preserveDrawingBuffer : true });
    //   photobooth_canvas = document.getElementById("photobooth_canvas");
    photobooth_canvas = document.getElementById("photobooth_canvas");
    photobooth_context = photobooth_canvas.getContext("2d", { preserveDrawingBuffer: true });


    $("#photobooth_snap_button").hide();
    $("#photobooth_camera_countdown").show();

    var photobooth_countdownInterval = setInterval(function () {
        if (photobooth_snap_counter == 0) {
            $("#photobooth_countdown_image").attr("src", "lib/image/photobooth/ready.png");

            $("#photobooth_camera_countdown").show();
            $("#photobooth_countdown_image").show();
            setTimeout(function () {
                $("#photobooth_countdown_image").animate({ width: "1000px" }, { queue: false, duration: 500 });
                $("#photobooth_countdown_image").fadeOut({ queue: false, duration: 500, complete: function () { $("#photobooth_countdown_image").css("width", "379px"); } });
            }, 200);

            photobooth_snap_counter++;
        }
        else if (photobooth_snap_counter == 1) {
            document.getElementById("photobooth_3_sound").pause();
            document.getElementById("photobooth_3_sound").currentTime = 0;
            document.getElementById("photobooth_3_sound").play();

            $("#photobooth_countdown_image").attr("src", "lib/image/photobooth/3.png");

            $("#photobooth_countdown_image").show();
            setTimeout(function () {
                $("#photobooth_countdown_image").animate({ width: "1000px" }, { queue: false, duration: 500 });
                $("#photobooth_countdown_image").fadeOut({ queue: false, duration: 500, complete: function () { $("#photobooth_countdown_image").css("width", "379px"); } });
            }, 200);

            photobooth_snap_counter++;
        }
        else if (photobooth_snap_counter == 2) {
            document.getElementById("photobooth_2_sound").pause();
            document.getElementById("photobooth_2_sound").currentTime = 0;
            document.getElementById("photobooth_2_sound").play();

            $("#photobooth_countdown_image").attr("src", "lib/image/photobooth/2.png");

            $("#photobooth_countdown_image").show();
            setTimeout(function () {
                $("#photobooth_countdown_image").animate({ width: "1000px" }, { queue: false, duration: 500 });
                $("#photobooth_countdown_image").fadeOut({ queue: false, duration: 500, complete: function () { $("#photobooth_countdown_image").css("width", "379px"); } });
            }, 200);

            photobooth_snap_counter++;
        }
        else if (photobooth_snap_counter == 3) {
            document.getElementById("photobooth_1_sound").pause();
            document.getElementById("photobooth_1_sound").currentTime = 0;
            document.getElementById("photobooth_1_sound").play();

            $("#photobooth_countdown_image").attr("src", "lib/image/photobooth/1.png");

            $("#photobooth_countdown_image").show();
            setTimeout(function () {
                $("#photobooth_countdown_image").animate({ width: "1000px" }, { queue: false, duration: 500 });
                $("#photobooth_countdown_image").fadeOut({ queue: false, duration: 500, complete: function () { $("#photobooth_countdown_image").css("width", "379px"); } });
            }, 200);

            photobooth_snap_counter++;
        }
        else if (photobooth_snap_counter == 4) {
            $("#photobooth_flash").show(function () {
                $("#photobooth_photo_stream").hide(function () {
                    document.getElementById("photobooth_snap_sound").pause();
                    document.getElementById("photobooth_snap_sound").currentTime = 0;
                    document.getElementById("photobooth_snap_sound").play();

                    $("#photobooth_camera_countdown").hide();

                    photobooth_snap_counter = 0;
                    clearInterval(photobooth_countdownInterval);

                    if (photobooth_isFirst) {
                        photobooth_context.translate(1920, 0);
                        photobooth_context.scale(-1, 1);
                    }


                    //photobooth_context = target_photbooth.getContext("experimental-webgl", { preserveDrawingBuffer: true });
                    photobooth_context.drawImage(target_photbooth, 0, 0, 1920, 1080, 300, 180, 1212, 682);

                    // photobooth_videoFeed.pause();
                    video.pause();

                    $("#photobooth_photo_stream").show();
                    $("#photobooth_flash").hide();

                    photobooth_camera_option_page();
                });
            });
        }
    }, 1000);
}

function photobooth_send() {
    // Send Capture Image to Backend Server
    // var canvasServer = document.getElementById("photobooth_canvas");
    var canvasServer = document.getElementById("target");
    
    var context = canvasServer.getContext("2d");
    var imageDataURL = canvasServer.toDataURL('image/png');
}

function photobooth_camera_option_page() {
    $("#photobooth_camera_option_page").fadeIn();

    $("#photobooth_download_button").fadeIn();
    $("#photobooth_retake_button").fadeIn();
    $("#photobooth_cancel_button").fadeIn();
}

function photobooth_downloadButton() {
    photobooth_send();
}

function photobooth_retakeButton() {
    photobooth_isFirst = false;

    $("#photobooth_camera_option_page").fadeOut(function () {
        // Show Camera Page
       // photobooth_videoFeed.play();
        video.play();
        $("#photobooth_snap_button").show();

        // Reset Preview
        $("#photobooth_download_button").hide();
        $("#photobooth_retake_button").hide();
        $("#photobooth_cancel_button").hide();
    });
}

function photobooth_cancelButton() {
    location.reload();
}

// declare our variables
var seriously, // the main object that holds the entire composition
    gUM, // will reference getUserMedia or whatever browser-prefixed version we can find
    URL, // will reference window.URL or whatever browser-prefixed version we can find
    video, // video element
    source, // wrapper object for source video
    chroma, // chroma checker
    blend,
    reformat,
    target; // a wrapper object for our target canvas

$(document).ready(function () { 

    //main code work goes here 
    //all photobooth code was old and slow, replaced with gpu accelared code. 



    // detect browser-prefixed getUserMedia
    gUM = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    // detect browser-prefixed window.URL
    URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    // grab the video element
    video = document.getElementById('photobooth_video');
    // construct our seriously object
    seriously = new Seriously();

    // grab the webcam video stream
    if (gUM) {
        gUM.call(navigator,
            {
                audio: false,
                video: {
                    optional: [
                        { minWidth: 320 },
                        { minWidth: 640 },
                        { minWidth: 800 },
                        { minWidth: 900 },
                        { minWidth: 1024 },
                        { minWidth: 1280 },
                        { minWidth: 1920 },
                        { minWidth: 2560 }
                    ]
                }
            },

            // success callback
            function (stream) {
                // check for firefox
                if (video.mozCaptureStream) {
                    video.mozSrcObject = stream;
                } else {
                    video.src = (URL && URL.createObjectURL(stream)) || stream;
                }
                video.play();
            },
            // error callback
            function (error) {
                console.log('An error occurred: ' + (error.message || error.name));
            }
        );
    }

    // wait until video is ready
    video.addEventListener('canplay', function () {

        // time to get serious
        source = seriously.source(video);
        target = seriously.target('#target');

       /* source.width = target.width;
        source.height = target.height;
        */
        source.mode = 'cover';

        chroma = seriously.effect('chroma');
        chroma.weight = 1.32;
        chroma.balance = 0;
        chroma.screen = 'rgb(77, 239, 41)';
        chroma.clipWhite = 0.85;
        chroma.clipBlack = 0.5125;

        blend = seriously.effect('blend');
        reformat = seriously.transform('reformat');

        reformat.source = '#background1';
        reformat.mode = 'cover';
        reformat.width = source.width;
        reformat.height = source.height;
        

        // connect all our nodes in the right order
        //sliders 
        chroma_weight = document.getElementById('chroma_w');
        chroma_weight.addEventListener('input', function () {
            chroma.weight = parseFloat(this.value);
        });

        chroma_balance = document.getElementById('chroma_b');
        chroma_balance.addEventListener('input', function () {
            chroma.balance = parseFloat(this.value);
        });

        chroma_clipeWhite = document.getElementById('chroma_cw');
        chroma_clipeWhite.addEventListener('input', function () {
            chroma.clipWhite = parseFloat(this.value);
        });

        chroma_clipBack = document.getElementById('chroma_cb');
        chroma_clipBack.addEventListener('input', function () {
            chroma.clipBlack = parseFloat(this.value);
        });


        /*
        chroma.source = source;
        target.source = chroma;

         blend.top = chroma;
        blend.bottom = reformat;
        */       
        
        blend.top = chroma;
        blend.bottom = reformat;
        
        blend.opacity = '#opacity';
        blend.mode = '#mode';

        chroma.source = source;
        target.source = blend;

        seriously.go();
    });

    $("img").on("dragstart", function (event) { event.preventDefault(); });

    var buttonAnimationIndex = 0;
    setInterval(function () {
        if (buttonAnimationIndex == 192) {
            buttonAnimationIndex = 0;
        }

        var str_buttonAnimationIndex = "";
        if (buttonAnimationIndex < 10) {
            str_buttonAnimationIndex = "00" + buttonAnimationIndex;
        }
        else {
            if (buttonAnimationIndex < 100) {
                str_buttonAnimationIndex = "0" + buttonAnimationIndex;
            }
            else {
                str_buttonAnimationIndex = "" + buttonAnimationIndex;
            }
        }

        $("#photobooth_download_button").attr("src", "lib/image/photobooth/download_button/Download_Button" + str_buttonAnimationIndex + ".png");
        $("#photobooth_retake_button").attr("src", "lib/image/photobooth/retake_button/retake" + str_buttonAnimationIndex + ".png");
        $("#photobooth_cancel_button").attr("src", "lib/image/photobooth/cancel_button/cancel" + str_buttonAnimationIndex + ".png");
        buttonAnimationIndex++;
    }, 32);
});