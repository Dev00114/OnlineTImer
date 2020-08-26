const toggleButton = document.querySelector('.toggle_timer');
const resetTime = document.querySelector('.resetTimer');
const sound = document.querySelector('#doneSound');
const optionset = document.querySelector('.fa-cog');
const audioTest = document.querySelector('.infinite');
const pomodoro = 600;
let timestatus = false;
let countdown;

window.onload = function initial() {
    onlineFilpSetClock();
    initMultitime();
    pomodoroTime();
    audiovolumecontrol();
}

function onlineFilpSetClock(){
    if(localStorage.setClock){
        clock.setTime(localStorage.setClock);
        clock.start();
    }
}

var clock = $('.timer-display').FlipClock(0,{
    countdown: true,
    clockFace: 'MinuteCounter',
    autoStart: false,
    callbacks: {
        interval: function () {
            localStorage.setClock = clock.getTime();
            if (clock.getTime() == 0) {
                notification();
            }
        }
    }
});

$('.toggle_timer').click(function(){
    clock.setTime(300);
    clock.start();
});

$('.resetTimer').click(function(){
    clock.setTime(0);
    clock.stop();
});


function notification() {
    $('.ringbell').prepend('<span class="bell fa fa-bell" id="rington"></span>');
    sound.play();
    const duration = localStorage.alarmSet * 1000;
    setTimeout(() => {
        $('.bell').css('display', 'none');
        sound.pause();
    }, duration);
}

function optionTimer(e){
    clock.setTime(e);
    clock.start();
}

function optionDiv() {
    $('.audio_option').fadeToggle("slow");
}

function audiovolumecontrol() {
    const audioVal = $('input[type = "range"]').val();
    document.querySelector('#doneSound').volume = (audioVal / 100);
}

function duration_alarmset(e) {
    toastr.success('The Duration alarm seted to ' + e, 'Duration Alarm');
    localStorage.alarmSet = e;
}

function audioTestFun() {
    toastr.success("Audio volume seted " + document.querySelector('#doneSound').volume);
}

optionset.addEventListener('click', optionDiv);
audioTest.addEventListener('click', audioTestFun);

