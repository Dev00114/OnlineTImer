const pomodoroStartBtn = document.getElementById('start');
const pomodoroInput    = $('input[name="pomodoro"]');
let arraypomodoroVal = new Array();
let conuntdownPomotime;
localStorage.alarmSet = 5;


function pomodoroTime() {
    if (localStorage.pomoSecondsleft) {
        $('#pomodorotimeDiv').html(localStorage.pomotimeDiv);
        runtimerPomo();
    } else {
        console.log("have not nothing!")
    }
}

function pomodorotimeStart(){
    const pomodorotime    = $('input[name="pomodoro"]').val();
    const pomodorotimeVal = pomodorotime.split("+");
    const pomodorotimeLen = pomodorotimeVal.length
    for(var i = 0;i < pomodorotimeLen; i ++){
        const pomodoroArrayVal = pomodorotimeVal[i];
        const ParseIntPomo     = parseInt(pomodoroArrayVal);
        arraypomodoroVal.push(ParseIntPomo);
    }
    makePomodoroTime(pomodorotimeVal,pomodorotimeLen);
}



function makePomodoroTime(pomodorotimeVal, pomodorotimeLen){
    for (var j = 0; j < pomodorotimeLen; j++) {
        var timeset = pomodorotimeVal[j] * 60;
        var minutes = parseInt(timeset / 60);
        var restSeconds = timeset % 60;
        const displaymin = `${minutes < 10 ? '0' : ''}${minutes}`;
        const displaysec = `${restSeconds < 10 ? '0' : ''}${restSeconds}`;
        const displaytimer = `${displaymin}:${displaysec}`;
        $('#pomodorotimeDiv').append('<div class = "col-md-3 pomodoroChild"><h5 class = "displayePomotimer" id = "selectPomo' + (j + 1) + '">' + displaytimer + '</h5><i class="fa fa-trash pomo_close" aria-hidden="true"></i></div>');
    }
    runtimerPomo();
}

function runtimerPomo(){
    const timeString = $('.pomodoroChild:first>h5').text();
    const minute = timeString.split(":")[0];
    const second = timeString.split(":")[1];
    const totalTime = minute * 60 + second * 1;
    clearInterval(conuntdownPomotime);
    const now = Date.now();
    const timeUp = now + totalTime * 1000;
    conuntdownPomotime = setInterval(() => {
        const secondsleft = Math.floor((timeUp - Date.now()) / 1000);
        localStorage.pomoSecondsleft = secondsleft;
        const seconds = localStorage.pomoSecondsleft;
        if (secondsleft < 0) {
            notificationPomo();
        }
        displayPomotime(seconds);
    },1000)
}

function notificationPomo(){
    const duration = localStorage.alarmSet * 1000;
    $('.pomodoroChild:first').html('<span class="bell fa fa-bell" id="ringPomo"></span>');
    sound.play();
    setTimeout(() => {
        $('.pomodoroChild:first').remove();
        sound.pause();
        runtimerPomo();
    }, duration);
    clearInterval(conuntdownPomotime);
}

function displayPomotime(seconds){
    const minutes = Math.floor(seconds / 60);
    const restSeconds = seconds % 60;
    const displaymin = `${minutes < 10 ? '0' : ''}${minutes}`;
    const displaysec = `${restSeconds < 10 ? '0' : ''}${restSeconds}`;
    const displaytimer = `${displaymin}:${displaysec}`;
    $('.pomodoroChild:first>h5').text(displaytimer);
    localStorage.pomotimeDiv = document.querySelector('#pomodorotimeDiv').innerHTML;
}

$('body').on('click','.pomo_close',function(){
    $(this).parent().remove();
    runtimerPomo();
})


function PomooptionTimer(e){
    const pomodorotime = e;
    const pomodorotimeVal = pomodorotime.split("+");
    const pomodorotimeLen = pomodorotimeVal.length
    for (var i = 0; i < pomodorotimeLen; i++) {
        const pomodoroArrayVal = pomodorotimeVal[i];
        const ParseIntPomo = parseFloat(pomodoroArrayVal);
        arraypomodoroVal.push(ParseIntPomo);
    }
    makePomodoroTime(pomodorotimeVal, pomodorotimeLen);
}

$('.pomoBtn').click(function() {
    const val = $(this).val();
    PomooptionTimer(val);
})


pomodoroStartBtn.addEventListener('click',pomodorotimeStart);






