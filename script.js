var hrs = document.getElementById("hrs");
var min = document.getElementById("min");
var sec = document.getElementById("sec");
var startStop = document.getElementById("start-stop");
var lapReset = document.getElementById("lap-reset");
var lapList = document.querySelector(".lap-container");
var lapCounter = 1;
var time = 0;
var isRunning = false;
var timerId = false;

function init() {
    startStop.style.backgroundColor = "#b6d7a8";
	startStop.style.color = "green";
    
    lapReset.style.backgroundColor = "#b3d6ce";
    lapReset.style.color = "#2e3436";
    hrs.innerHTML = "00";
    min.innerHTML = "00";
    sec.innerHTML = "00";
    lapReset.innerHTML = "Reset";
    startStop.innerHTML = "Start";
    time = 0;
    isRunning = false;
    lapCounter = 1;
}

init();

startStop.addEventListener("click", function () {
    if(isRunning == false){
        isRunning = true;
        startStop.innerHTML = "Stop";
        startStop.style.backgroundColor = "#f4cccc";
        startStop.style.color = "red";
        lapReset.innerHTML = "Lap";
        timerId = setInterval(function () {
            time++;
            var secs = time % 60;
            var mins = parseInt(time / 60);
            var hrs = parseInt(mins / 60);
            if(secs < 10){
                sec.innerHTML = "0" + secs;
            } else {
                sec.innerHTML = secs;
            }
            if(mins < 10){
                min.innerHTML = "0" + mins;
            } else {
                min.innerHTML = mins;
            }
            if (hrs < 10) {
                hrs.innerHTML = "0" + hrs;
            } else {
                hrs.innerHTML = hrs;
            }
        }, 1000);
    }

    else {
        isRunning = false;
        startStop.innerHTML = "Start";
        clearInterval(timerId);
        startStop.style.backgroundColor = "#b6d7a8";
        startStop.style.color = "green";
        lapReset.innerHTML = "Reset";
    }
});

function createLap() { 
    var div = document.createElement("div");
    div.setAttribute("class", "timeDiv");
    var divider = document.createElement("hr");
    var lapNum = document.createElement("span");
    lapNum.innerHTML = "Lap " + lapCounter;
    lapCounter++;
    lapList.scrollTop = lapList.scrollHeight;

    var timeStamp = document.createElement("span");
    timeStamp.innerHTML = `${hrs.innerHTML} : ${min.innerHTML} : ${sec.innerHTML}`;
    div.appendChild(lapNum);
    div.appendChild(timeStamp);
    lapList.appendChild(div);
    lapList.appendChild(divider);
}
 
lapReset.addEventListener("click", function () { 
    if (isRunning == true) { 
        createLap();
    }

    else {
        lapList.innerHTML = "";
        lapReset.innerHTML = "Reset";
        init();
    }
});