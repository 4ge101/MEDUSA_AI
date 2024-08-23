// ELEMENTS
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
// const speakBtn = document.querySelector("#speak");
const time = document.querySelector("#time")


//weather function or setup
function weather(location) {
    const weatherCont = document.querySelector(".temp").querySelectorAll("*");
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7a67baff949c2c06bf1d1eecfe6cc9a9`
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText);
            weatherCont[0].textContent = `Location:${data.name}`;
            weatherCont[1].textContent = `Country:${data.sys.country}`;
            weatherCont[2].textContent = `Weather type:${data.weather[0].main}`;
            weatherCont[3].textContent = `Weather description:${data.weather[0].description}`;
            weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherCont[5].textContent = `Original Temperature:${ktc(
                data.main.temp
            )}`;
            // weatherCont[6].textContent`feels like ${ktc(data.main.fells_like)}`;
            // weatherCont[7].textContent`Min temperature ${ktc(data.main.temp_min)}`;
            // weatherCont[8].textContent`Max temperature ${ktc(data.main.temp_max)}`;
            weatherStatement = `sir the weather in ${data.name}is${data.weather[0].description
                } and the temperature feels like ${ktc(data.main.fells_like)}`;
        } else {
            weatherCont[0].textContent = "Weather Info Not Found";
        }
    };
    xhr.send();
}

// convert kelvin to celcius
function ktc(k) {
    k = k - 273.15;
    return k.toFixed(2);
}

//callin weather function
weather("biratnagar")

// time setup
let date = new Date()
let hrs = date.getHours()
let mins = date.getMinutes()
let secs = date.getSeconds()

// onload (window)
window.onload = () => {
    //time cloack
    time.textContent = `${hrs}:${mins}:${secs}`
    setInterval(() => {
        let date = new Date()
        let hrs = date.getHours()
        let mins = date.getMinutes()
        let secs = date.getSeconds()
        time.textContent = `${hrs}:${mins}:${secs}`
    }, 1000);
}

// SPEECH RECONGNTION SETUP
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;

// SPEECH RECONGNTION START
recognition.onstart = function () {
    console.log("vr active");
};

//sr result
recognition.onresult = function (event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(`my words:${transcript}`);

    if (transcript.includes("hello ghost") || transcript.includes("hey ghost") || transcript.includes("hi ghost")) {
        readOut("hello sami sir")
    }

    if (transcript.includes("how are you ghost")) {
        readOut("Iam fine sami sir")
    }

    if (transcript.includes("did you have feeling")) {
        readOut("Sorry sami sir iam a artifical inteligence i dont have any felling if you want to ask me any question")
    }

    if (transcript.includes("open youtube") || transcript.includes("open you tube")) {
        readOut("opening youtube sir");
        window.open("https://www.youtube.com/");
    }
    if (transcript.includes("open google") || transcript.includes("open Google")) {
        readOut("opening google sir");
        window.open("https://www.google.com/");
    }

    //google search
    if (transcript.includes("search for") || transcript.includes("search")) {
        readOut("here's the result");

        let input = transcript.slice(11);
        input = input.trim().split(" ").join("+");

        console.log(input);
        window.open(`https://www.google.com/search?q=${input}`);
    }

    if (transcript.includes("open github") || transcript.includes("open git hub")) {
        readOut("opening github sir");
        window.open("https://github.com/");
    }

    if (transcript.includes("open my github profile") || transcript.includes("open my git hub profile")) {
        readOut("opening your github profile sir");
        window.open(`https://github.com/${JSON.parse(userdata).github}`);
    }
};

// SPEECH RECONGNTION STOP

recognition.onend = function () {
    console.log("vr deactive");
};


startBtn.addEventListener("click", () => {
    recognition.start();
});

stopBtn.addEventListener("click", () => {
    recognition.stop();
});


// GHOST SPEECH
function readOut(message) {
    const speech = new SpeechSynthesisUtterance();
    // different voices
    // const allVoices = speechSynthesis.getVoices();
    speech.text = message;
    // speech.voice = allVoices[0];
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
    console.log("speaking out");
}

// example

// speakBtn.addEventListener("click", () => {
//     readOut("hello,my dear enthusiatsic devs on the planett");
// });


// Select the wave container
const waveContainer = document.querySelector(".wave-container");

// SPEECH RECOGNITION START
recognition.onstart = function () {
    console.log("vr active");
    waveContainer.classList.remove("hidden"); // Show the wave animation
};

// SPEECH RECOGNITION STOP
recognition.onend = function () {
    console.log("vr deactive");
    waveContainer.classList.add("hidden"); // Hide the wave animation
};

// Start and stop the voice recognition with the image click
startBtn.addEventListener("click", () => {
    waveContainer.classList.remove("hidden");
});

stopBtn.addEventListener("click", () => {
    waveContainer.classList.add("hidden");
});

// MAKING GHOST SPECH ACTIVE WITHOUT CLICK IN IMG

// Initialize the main recognition and wake word recognition
const wakeWordRecognition = new SpeechRecognition();

// Set continuous recognition to true for both instances
recognition.continuous = true;
wakeWordRecognition.continuous = true;

// Handle wake word recognition restart on end
wakeWordRecognition.onend = function () {
    console.log("Wake word recognition ended. Restarting...");
    // Set a timeout to restart the recognition after a short delay
    setTimeout(startWakeWordRecognition, 500);
};

// Handle main recognition restart on end
recognition.onend = function () {
    console.log("Main recognition stopped.");
    waveContainer.classList.add("hidden"); // Hide the wave animation
    setTimeout(startWakeWordRecognition, 500); // Restart wake word detection
};

// Function to start wake word recognition
function startWakeWordRecognition() {
    wakeWordRecognition.start();
    console.log("Wake word recognition started.");
}

// Function to stop wake word recognition
function stopWakeWordRecognition() {
    wakeWordRecognition.stop();
    console.log("Wake word recognition stopped.");
    clearTimeout(wakeWordTimeout); // Clear any existing timeout
}

wakeWordRecognition.onresult = function (event) {
    let transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    console.log(`Wake word detected: ${transcript}`);

    if (transcript.includes("hey ghost") || transcript.includes("hello ghost") || transcript.includes("hi ghost")) {
        readOut("Hello Sami Sir");
        stopWakeWordRecognition(); // Stop wake word recognition
        recognition.start(); // Start main voice recognition
    }
};

// Start and stop the voice recognition with the image click
startBtn.addEventListener("click", () => {
    stopWakeWordRecognition(); // Stop the wake word listener
    recognition.start(); // Start the main recognition
    waveContainer.classList.remove("hidden"); // Show the wave animation
});

stopBtn.addEventListener("click", () => {
    recognition.stop(); // Stop the main recognition
    startWakeWordRecognition(); // Restart the wake word listener
    waveContainer.classList.add("hidden"); // Hide the wave animation
});

// Start wake word recognition on page load
startWakeWordRecognition();
