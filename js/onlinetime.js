const toggleButton = document.querySelector('.toggle_timer');
const resetTime    = document.querySelector('.resetTimer');
const sound        = document.querySelector('#doneSound');
const optionset    = document.querySelector('.fa-cog');
const audioTest    = document.querySelector('.infinite');
const pomodoro     = 600;
let   timestatus   = false;
let   countdown;

window.onload = function initial(){
    onlineTime();
    initMultitime();
    pomodoroTime();  
    audiovolumecontrol();
}

function onlineTime(){
    if (localStorage.secondsleft) {
        const seconds = localStorage.secondsleft;
        toggleButton.textContent = 'Stop';
        timestatus = !timestatus;
        runtime(seconds);
    } else {
        console.log("have not nothing!")
    }
}


function pomodoroTime(){
    if (localStorage.pomoSecondsleft) {
        $('#pomodorotimeDiv').html(localStorage.pomotimeDiv);
        runtimerPomo();
    } else {
        console.log("have not nothing!")
    }

}

function displaytimer(seconds){
    const minutes       =   Math.floor(seconds/60);
    const restSeconds   =   seconds % 60;
    const displaymin    =   `${minutes < 10 ? '0' : ''}${minutes}`;
    const displaysec    =   `${restSeconds < 10 ? '0' : ''}${restSeconds}`;
    const displaytimer  =   `${displaymin}:${displaysec}`;
    document.querySelector('.timer-display').textContent = displaytimer;
}

function togglePomodoro(){
    if(timestatus){
        toggleButton.textContent = 'Start';
        clearInterval(countdown);
    }else if(!timestatus){
        displaytimer(pomodoro);
        toggleButton.textContent = 'Stop';
        const timerseconds = pomodoro;
        runtime(timerseconds);
    }

    timestatus = !timestatus;
}

function runtime(seconds){
    clearInterval(countdown);
    const now = Date.now();
    const timeUp = now + seconds * 1000;

    countdown = setInterval(() => {
        $('.bell').remove();
        const secondsleft = Math.floor((timeUp - Date.now()) / 1000);
        localStorage.secondsleft = secondsleft;
        const seconds = localStorage.secondsleft;
        if(seconds < 1 ){
            toggleButton.textContent = 'End';
            document.querySelector('.timer-display').textContent = "00:00";
            toggleButton.setAttribute('disable',true);
            timestatus = false;
        }

        if(secondsleft < 0){
            notification();
            clearInterval(countdown);
            return;
        }
        displaytimer(seconds);
    },1000)
}

function notification(){
    $('.ringbell').prepend('<span class="bell fa fa-bell" id="rington"></span>');
    sound.play();
    const duration = localStorage.alarmSet * 1000;
    setTimeout(() => {
        $('.bell').css('display', 'none');    
        sound.pause();
    }, duration);
}

function resetTimer(){
    timestatus = false;
    toggleButton.textContent = 'Start';
    clearInterval(countdown);
    localStorage.secondsleft = pomodoro;
    const seconds = localStorage.secondsleft;
    displaytimer(seconds);
}

function optionTimer(seconds){
    displaytimer(seconds);
    runtime(seconds);
    // const seconds = localStorage.secondsleft;
}

function disabledbtn(){
    const lgh = document.getElementsByClassName('btn').length;
    for (var i = 0; i < lgh; i++) {
        document.getElementsByClassName('btn')[i].setAttribute('disabled', false);
    }
}

function disablebtnfalse(){
    const lgh = document.getElementsByClassName('btn').length;
    for (var i = 0; i < lgh; i++) {
        document.getElementsByClassName('btn')[i].setAttribute('disabled', true);
    }
}

function optionDiv(){
    $('.audio_option').fadeToggle("slow");
}

function audiovolumecontrol(){
    const audioVal = $('input[type = "range"]').val();
    document.querySelector('#doneSound').volume = (audioVal / 100);
}

function duration_alarmset(e){
    toastr.success('The Duration alarm seted to ' + e, 'Duration Alarm');
    localStorage.alarmSet = e;
}

function audioTestFun(){
    toastr.success("Audio volume seted " + document.querySelector('#doneSound').volume);
}

$('.filpclock').FlipClock();

toggleButton.addEventListener('click',togglePomodoro);
resetTime.addEventListener('click',resetTimer);
optionset.addEventListener('click',optionDiv);
audioTest.addEventListener('click',audioTestFun);


