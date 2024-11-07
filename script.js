// ELEMENTS
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const time = document.querySelector("#time");

// SPEECH RECOGNITION SETUP
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

// SPEECH RECOGNITION START
recognition.onstart = function () {
    console.log("Voice recognition active");
    waveContainer.classList.remove("hidden"); // Show the wave animation
};

// SPEECH RECOGNITION RESULT
recognition.onresult = function (event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(`Transcript: ${transcript}`);

    // Handle mathematical operations
    if (transcript.includes("what is") && (transcript.includes("plus") ||
        transcript.includes("minus") || transcript.includes("times") ||
        transcript.includes("divided by"))) {
        handleMathOperation(transcript);
    } else if (transcript.includes("hello ghost") || transcript.includes("hey ghost") || transcript.includes("hi ghost")) {
        readOut("Hello, how can I assist you?");
    } else if (transcript.includes("how are you ghost")) {
        readOut("I'm doing well, thank you for asking.");
    } else if (transcript.includes("did you have feeling")) {
        readOut("I'm an artificial intelligence, so I don't have feelings, but I'm here to help you with any questions or tasks you may have.");
    } else if (transcript.includes("open youtube") || transcript.includes("open you tube")) {
        readOut("Opening YouTube.");
        window.open("https://www.youtube.com/");
    } else if (transcript.includes("open google") || transcript.includes("open Google")) {
        readOut("Opening Google.");
        window.open("https://www.google.com/");
    } else if (transcript.includes("search for") || transcript.includes("search")) {
        readOut("Here's the result.");
        let input = transcript.slice(11);
        input = input.trim().split(" ").join("+");
        window.open(`https://www.google.com/search?q=${input}`);
    } else if (transcript.includes("open github") || transcript.includes("open git hub")) {
        readOut("Opening GitHub.");
        window.open("https://github.com/");
    } else if (transcript.includes("open my github profile") || transcript.includes("open my git hub profile")) {
        readOut("Opening your GitHub profile.");
        window.open(`https://github.com/${JSON.parse(userdata).github}`);
    } else {
        readOut("I'm sorry, I didn't understand that command.");
    }
};

// SPEECH RECOGNITION STOP
recognition.onend = function () {
    console.log("Voice recognition inactive");
    waveContainer.classList.add("hidden"); // Hide the wave animation
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
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
    console.log("Speaking out");
}

// HANDLE MATH OPERATIONS
function handleMathOperation(transcript) {
    let equation = transcript.replace("what is", "").trim();
    let result;

    if (equation.includes("plus")) {
        let nums = equation.split("plus");
        let num1 = parseFloat(nums[0]);
        let num2 = parseFloat(nums[1]);
        result = num1 + num2;
    } else if (equation.includes("minus")) {
        let nums = equation.split("minus");
        let num1 = parseFloat(nums[0]);
        let num2 = parseFloat(nums[1]);
        result = num1 - num2;
    } else if (equation.includes("times")) {
        let nums = equation.split("times");
        let num1 = parseFloat(nums[0]);
        let num2 = parseFloat(nums[1]);
        result = num1 * num2;
    } else if (equation.includes("divided by")) {
        let nums = equation.split("divided by");
        let num1 = parseFloat(nums[0]);
        let num2 = parseFloat(nums[1]);
        result = num1 / num2;
    }

    readOut(`The result is ${result}`);
}

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

// ELEMENTS
const waveContainer = document.querySelector(".wave-container");

let isRecognitionActive = false; // Track recognition state

startBtn.addEventListener("click", () => {
    if (isRecognitionActive) {
        recognition.stop(); // Stop recognition if it's active
    } else {
        recognition.start(); // Start recognition if it's not active
    }
});

recognition.onstart = function () {
    isRecognitionActive = true;
    waveContainer.classList.remove("hidden"); // Show the wave animation
};

recognition.onend = function () {
    isRecognitionActive = false;
    waveContainer.classList.add("hidden"); // Hide the wave animation
};