window.onload = function () {
    var wrapper = document.querySelector('.wrapper');
    var btnStart = document.querySelector('.start');
    var btnSplit = document.querySelector('.split');
    var btnReset = document.querySelector('.reset');
    var elemHour = document.querySelector('.hour');
    var elemMin = document.querySelector('.min');
    var elemSec = document.querySelector('.sec');
    var elemMSec = document.querySelector('.mSec');
    var isStart = 0;        //0 не запущен, 1 считает, 2 пауза

    btnStart.addEventListener('click', startTimer);
    btnSplit.addEventListener('click', splitTime);
    btnReset.addEventListener('click', resetTimer);

    if (window.Worker) {
        var worker = new Worker('js/worker.js');
        worker.addEventListener('message', updateTime);
    }

    function startTimer() {
        if (!isStart) {
            btnStart.classList.add('pause');
            btnStart.value = 'Pause';
            btnSplit.classList.remove('split--disabled');
            btnSplit.disabled = false;
            btnReset.classList.remove('reset--disabled');
            btnReset.disabled = false;
            isStart = 1;
            worker.postMessage({
                cmd: 'start'
            });
        } else if (isStart == 1) {
            btnStart.classList.remove('pause');
            btnStart.classList.add('cont');
            btnStart.value = 'Cont..';
            isStart = 2;
            worker.postMessage({
                cmd: 'pause'
            });
        } else if (isStart == 2) {
            btnStart.classList.remove('cont');
            btnStart.classList.add('pause');
            btnStart.value = 'Pause';
            isStart = 1;
            worker.postMessage({
                cmd: 'cont'
            });
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
        clearSplit();
        btnStart.classList.remove('pause');
        btnStart.classList.remove('cont');
        btnStart.value = 'Start';
        btnSplit.classList.add('split--disabled');
        btnSplit.disabled = true;
        btnReset.classList.add('reset--disabled');
        btnReset.disabled = true;
        isStart = 0;
        worker.postMessage({
            cmd: 'reset'
        });
    }

    function updateTime(e) {
        var data = e.data;
        elemHour.textContent = data.hour;
        elemMin.textContent = data.min;
        elemSec.textContent = data.sec;
        elemMSec.textContent = data.msec;
    }
}