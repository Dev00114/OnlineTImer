const multitimer = document.querySelector('#multipletimerStart');
let countdownMul = {};


function runtimer(seconds,key) {
    if(!countdownMul[key])
    {
        countdownMul[key] = {
            time : seconds,
            handle: false
        };
        localStorage.timeObj = JSON.stringify(countdownMul);
    }
    const now       = Date.now();
    const timeUp = now + `${countdownMul[key].time}` * 1000;
    countdownMul[key].handle    = setInterval(() => {
        const timecalculate = Math.floor((timeUp - Date.now()) / 1000);
        
        if (timecalculate < 0) {
            clearInterval(countdownMul[key].handle);
            delete countdownMul[key];
            localStorage.timeObj =JSON.stringify(countdownMul);
            notificationMul(key);
            return;
        }
        countdownMul[key].time = timecalculate;
        displaytimeMul(timecalculate, key);
        localStorage.timeObj = JSON.stringify(countdownMul);
    }, 1000)
}


function notificationMul(key){
    const duration = localStorage.alarmSet * 1000;
    $('[key = "' + key + '"] ').html('<span class="bell fa fa-bell" id="ringMul"></span>');
    sound.play();
    toastr.success('😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀😀');
    setTimeout(() => {
        $('[key = "' + key + '"]').remove();
        sound.pause();
    }, duration);
}


function displaytimeMul(seconds,i){
    const minutes       = Math.floor(seconds / 60);
    const restSeconds   = seconds % 60;
    const displaymin    = `${minutes < 10 ? '0' : ''}${minutes}`;
    const displaysec    = `${restSeconds < 10 ? '0' : ''}${restSeconds}`;
    const displaytimer  = `${displaymin}:${displaysec}`;
    $(".displayTime[key="+i+"]").find('.totalTimer').html(displaytimer);
}

function multitimerGenerate() {
    var minute    = $("input[name = 'minute']").val();
    var second    = $("input[name = 'second']").val();
    if(minute == '' && second == '') return;
    var totalTime = (minute * 60) + (second * 1);
    var i = document.getElementsByClassName('displayTime').length;
    var key = "second" + i;
    var str = '<div key="'+key+'" class = "col-md-3 displayTime"><h5 class = "totalTimer"></h5><i class="fa fa-trash multi_close" aria-hidden="true"></i></div>'
    $('#multitimeDisplay').append(str);
    runtimer(totalTime,key);
}

function initMultitime()
{
    var obj = localStorage.getItem('timeObj');
    if(!obj)return;
    obj = JSON.parse(obj);
    for(var i in obj)
    {
        var str = '<div key="'+i+'" class = "col-md-3 displayTime"><h5 class = "totalTimer"></h5><i class="fa fa-trash multi_close" aria-hidden="true"></i></div>'
        $('#multitimeDisplay').append(str);
        runtimer(obj[i].time,i);
    }
}


function bug(){
    var minute = $("input[name = 'minute']").val();
    var second = $("input[name = 'second']").val();
    if (minute < 0) $("input[name = 'minute']").val(59);
    if (minute > 59) $("input[name = 'minute']").val(0);
    if (second < 0) $("input[name = 'second']").val(59);
    if (second > 59) $("input[name = 'second']").val(0);
}


$('body').on('click', '.multi_close', function () {
    var key = $(this).parent().attr('key');
    clearInterval(countdownMul[key].handle);
    delete countdownMul[key];
    localStorage.timeObj = JSON.stringify(countdownMul);
    $(this).parent().remove();
})


function MuloptionTimer(e){
    var totalTime = e;
    var i = document.getElementsByClassName('displayTime').length;
    var key = "second" + i;
    var str = '<div key="' + key + '" class = "col-md-3 displayTime"><h5 class = "totalTimer"></h5><i class="fa fa-trash multi_close" aria-hidden="true"></i></div>'
    $('#multitimeDisplay').append(str);
    runtimer(totalTime, key);
}


multitimer.addEventListener('click', multitimerGenerate);


