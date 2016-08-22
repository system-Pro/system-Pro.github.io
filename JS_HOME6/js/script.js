window.onload = function () {
    var wrapper = document.querySelector('.wrapper');
    var btnStart = document.querySelector('.start');
    var btnSplit = document.querySelector('.split');
    var btnReset = document.querySelector('.reset');
    var elemHour = document.querySelector('.hour');
    var elemMin = document.querySelector('.min');
    var elemSec = document.querySelector('.sec');
    var elemMSec = document.querySelector('.mSec');
    var hour = 0, min = 0, sec = 0, mSec = 0;
    var isStart = 0;        //0 не запущен, 1 считает, 2 пауза
    var interval;

    btnStart.addEventListener('click', startTimer);
    btnSplit.addEventListener('click', splitTime);
    btnReset.addEventListener('click', resetTimer);

    function startTimer() {
        if (!isStart) {
            interval = setInterval(timer, 33);
            btnStart.classList.add('pause');
            btnStart.value = 'Pause';
            btnSplit.classList.remove('split--disabled');
            btnSplit.disabled = false;
            btnReset.classList.remove('reset--disabled');
            btnReset.disabled = false;
            isStart = 1;
        } else if (isStart == 1) {
            clearInterval(interval);
            btnStart.classList.remove('pause');
            btnStart.classList.add('cont');
            btnStart.value = 'Cont..';
            isStart = 2;
        } else if (isStart == 2) {
            interval = setInterval(timer, 33);
            btnStart.classList.remove('cont');
            btnStart.classList.add('pause');
            btnStart.value = 'Pause';
            isStart = 1;
        }
    }
    function splitTime() {
        var div = document.createElement('div');
        div.classList.add('time', 'time--split');
        div.innerHTML = elemHour.textContent + ':' + elemMin.textContent + ':' + elemSec.textContent + ':' + elemMSec.textContent;
        wrapper.appendChild(div);
    }
    function clearSplit() {
        var splitDiv = document.querySelectorAll('.time--split');
        for (var i = 0; i < splitDiv.length; i++) {
            splitDiv[i].remove();
        }
    }
    function resetTimer() {
        clearInterval(interval);
        resetTime();
        clearSplit();
        btnStart.classList.remove('pause');
        btnStart.classList.remove('cont');
        btnStart.value = 'Start';
        btnSplit.classList.add('split--disabled');
        btnSplit.disabled = true;
        btnReset.classList.add('reset--disabled');
        btnReset.disabled = true;
        isStart = 0;
    }
    function resetTime() {
        hour = 0, min = 0, sec = 0, mSec = 0;
        elemHour.textContent = '00';
        elemMin.textContent = '00';
        elemSec.textContent = '00';
        elemMSec.textContent = '000';
    }
    function timer() {
        mSec += 33;
        if (mSec > 999) {
            mSec -= 1000;
            sec++;
            if (sec > 59) {
                sec -= 60;
                min++;
                if (min > 59) {
                    min -= 60;
                    hour++;
                    if (hour < 10) {
                        elemHour.textContent = '0' + hour;
                    } else {
                        elemHour.textContent = hour;
                    }
                }
                if (min < 10) {
                    elemMin.textContent = '0' + min;
                } else {
                    elemMin.textContent = min;
                }
            }
            if (sec < 10) {
                elemSec.textContent = '0' + sec;
            } else {
                elemSec.textContent = sec;
            }
        }

        if (mSec < 10) {
            elemMSec.textContent = '00' + mSec;
        } else if (mSec < 100) {
            elemMSec.textContent = '0' + mSec;
        } else {
            elemMSec.textContent = mSec;
        }
        //console.log(hour + ':' + min + ':' + sec + '.' + mSec);
    }
};