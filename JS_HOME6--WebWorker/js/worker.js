var hour = '00', min = '00', sec = '00', mSec = '000';
var interval;
var speedInterval = 33;

addEventListener('message', function (e) {
    var data = e.data;
    switch (data.cmd) {
        case 'start':
            interval = setInterval(timer, speedInterval);
            break;

        case 'pause':
            clearInterval(interval);
            break;

        case 'cont':
            interval = setInterval(timer, speedInterval);
            break;

        case 'reset':
            clearInterval(interval);
            hour = '00', min = '00', sec = '00', mSec = '000';
            postMessage({
                hour: hour,
                min: min,
                sec: sec,
                msec: mSec
            });
            break;
    }

    function timer() {
        mSec = +mSec + speedInterval;
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
                        hour = '0' + hour;
                    }
                }
                if (min < 10) {
                    min = '0' + min;
                }
            }
            if (sec < 10) {
                sec = '0' + sec;
            }
        }

        if (mSec < 10) {
            mSec = '00' + mSec;
        } else if (mSec < 100) {
            mSec = '0' + mSec;
        }

        postMessage({
            hour: hour,
            min: min,
            sec: sec,
            msec: mSec
        });
    }
});