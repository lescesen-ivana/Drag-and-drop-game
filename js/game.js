/***************CANVAS*************************/
var boardWidth = 421;
var boardHeigth = 421;
var x = 0.5;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function drawBoard() {
    for (x = 0.5; x <= boardWidth; x += 10) {
        context.moveTo(x, 0);
        context.lineTo(x, boardHeigth);
    }

    for (x = 0.5; x <= boardHeigth; x += 10) {
        context.moveTo(0, x);
        context.lineTo(boardWidth, x);

    }

    context.strokeStyle = "black";
    context.stroke();

}

drawBoard();
$('.dropzone').css({
    'background-image': "url(" + canvas.toDataURL("image/png") + ")"
});
/****************************************/

/*********AUDIO**********/

var audio = $("#myAudio")[0];
$("#pig").click(function() {
    audio.play();
});


var audioTwo = $("#myAudioTwo")[0];
$("#cow").click(function() {
    audioTwo.play();
});

var audioThree = $("#myAudioThree")[0];
$("#sheep").click(function() {
    audioThree.play();
});

var audioFour = $("#myAudioFour")[0];
$("#horse").click(function() {
    audioFour.play();
});


var audioFive = $("#myAudioFive")[0];
$("#rooster").click(function() {
    audioFive.play();
});




/*****************GAME***********************/

$('.draggable').draggable({
    revert: 'invalid',
    scroll: false,
    stack: ".dropzone",
    cursor: "move",
});

$('.row > div').droppable({
    tolerance: 'intersect',
    drop: function(event, ui) {
        var drop_p = $(this).offset();
        var drag_p = ui.draggable.offset();
        var left_end = drop_p.left - drag_p.left + 1;
        var top_end = drop_p.top - drag_p.top + 1;
        ui.draggable.animate({
            top: '+=' + top_end,
            left: '+=' + left_end

        });
        $(this).droppable({
            disabled: true
        });
        reenablePreviousDrop(ui.draggable);
        ui.draggable.data("over", $(this));
        checkIfChoiceCorrect(ui.draggable, $(this));
        setTimeout(function() {
            checkWinners();
        }, 500);
    }
});

$(".dragzone").droppable({
    drop: function(event, ui) {
        reenablePreviousDrop(ui.draggable);
    }
});


function reenablePreviousDrop(el) {
    el.removeClass("correct");
    var box = el.data("over");
    if (box) {
        box.droppable({
            disabled: false
        });
        el.data("over", "");
    }
}

function checkIfChoiceCorrect(drag, drop) {
    if (drag.data("piece") === drop.data("box")) {
        drag.addClass("correct");
    }
    if ($("#pig").hasClass("correct")) {
        captionPig();
    }
    if ($("#horse").hasClass("correct")) {
        captionHorse();
    }
    if ($("#sheep").hasClass("correct")) {
        captionSheep();
    }
    if ($("#cow").hasClass("correct")) {
        captionCow();
    }
    if ($("#rooster").hasClass("correct")) {
        captionRooster();
    }

}

function captionPig() {



    $("#pig-container p").html(" A Pig = Svinja");
    $("#pig-container p").css({
        "position": "relative",
        "top": "106px",
        "margin": "37px"
    });

}

function captionHorse() {

    $("#horse-container p").html("A Horse = Konj");
    $("#horse-container p").css({
        "position": "relative",
        "top": "9px",
        "margin": "33px",
        "left": "180px"
    });
}

function captionSheep() {

    $("#sheep-container p").html("A Sheep = Ovca");
    $("#sheep-container p").css({
        "position": "relative",
        "top": "190px",
        "margin": "27px"
    });
}

function captionCow() {

    $("#cow-container p").html("A Cow = Krava");
    $("#cow-container p").css({
        "position": "relative",
        "bottom": "70px",
        "margin": "33px"
    });

}

function captionRooster() {

    $("#rooster-container p").html("A Rooster = Pijetao");
    $("#rooster-container p").css({
        "position": "relative",
        "top": "50px",
        "margin": "10px",
        "left": "204px"
    });
}

function checkWinners() {

    if ($(".ui-state-disabled").length === 5) {
        if ($(".correct").length === 5) {
            showSuccessMessage();
            $(".draggable").draggable({
                disabled: true
            }).css("cursor", "auto");
        } else {
            showErrorMessage();
        }
    }
}


function showSuccessMessage() {


    $(".dragzone").append("<p>Bravo, pogodio/la si sve! </p>");
    $(".dragzone p").css({
        "position": "relative",
        "bottom": "332px",
        "left": "131px"
    });
    $(".dragzone").append("<button>Igraj ponovo</button>");
    $(".dragzone button").css({
        "position": "relative",
        "bottom": "332px",
        "left": "150px"
    });
    gameRestart();
}




function showErrorMessage() {
    $(".dragzone").append("<p>Nisi pogodio/la sve. Pokušaj ponovo.</p>");
    $(".dragzone p").css({
        "position": "relative",
        "bottom": "332px",
        "left": "99px"
    });
    $(".dragzone").append("<button>Igraj ponovo :)</button>");
    $(".dragzone button").css({
        "position": "relative",
        "bottom": "332px",
        "left": "150px"
    });
    gameRestart();
}



function gameRestart() {
    $(".dragzone button").click(function() {
        location.reload();
    });
}