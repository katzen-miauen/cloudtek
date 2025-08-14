const captchaText = "cloudtek";

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomFont() {
  const fonts = [
    "Arial",
    "Verdana",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Trebuchet MS",
    "Impact",
  ];
  return fonts[Math.floor(Math.random() * fonts.length)];
}

function playRandomAudio(i) {
  const audio = new Audio("/src/audio/" + i + ".mp3");
  const audioPlayButton = document.getElementById("audioPlayButton");

  audioPlayButton.addEventListener("click", () => {
    if (audio.paused == true) {
      audio.play();
      audioPlayButton.style.opacity = "50%";
    } else {
      audio.pause();
      audioPlayButton.style.opacity = "100%";
    }
  });

  audio.addEventListener("ended", () => {
    audioPlayButton.style.opacity = "100%";
  });
}


function captchaGenerator() {
  const captchaContainer = document.querySelector(".captchaContainer");

  for (let i = 0; i <= captchaText.length; i++) {
    const letter = document.createElement("div");
    letter.textContent = captchaText.at(i);

    const randomSkew = getRandom(-30, 30);
    const randomRotation = getRandom(-10, 10);
    const randomScale = getRandom(1, 5);
    const randomTranslateX = getRandom(-2, 3);
    const randomTranslateY = getRandom(-2, 2);
    letter.style.transform = `skew(${randomSkew}deg) rotate(${randomRotation}deg) scale(${randomScale}) translate(${randomTranslateX}px,${randomTranslateY}px)`;
    letter.style.color = "rgba(255, 255, 255, 1)";
    letter.style.mixBlendMode = "exclusion";
    letter.style.fontFamily = getRandomFont();

    captchaContainer.appendChild(letter);
  }
}

function checkCaptcha() {
  event.preventDefault();
  const captchaInput = document.querySelector(".captchaInput");

  if (captchaInput.value.toLowerCase() == captchaText.toLowerCase()) {
    toggleCaptcha();
    console.log("correct");
    
  } else {
    captchaInput.style.border = "1px solid red";
     captchaInput.style.borderRadius = "4px"
  }
}

function captchaButtonEvent() {
  const button = document.querySelector(".captchaButton");
  button.addEventListener("click", checkCaptcha);
}

function toggleCaptcha() {
  const captchaSection = document.querySelector(".captchaSection");
  const formSection = document.querySelector(".formSection");
  const linkSection = document.querySelector(".linkSection");

  captchaSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
  linkSection.classList.toggle("hidden");
}


document.addEventListener("DOMContentLoaded", () => {
  playRandomAudio(getRandomInteger(0, 0));
  captchaGenerator();
  captchaButtonEvent();
});