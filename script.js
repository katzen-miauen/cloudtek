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

function initImageGrid() {
  const imageWrapper = document.querySelector(".imageWrapper");
  const rows = 3;
  const cols = 3;
  const totalImages = rows * cols;

  for (let i = 0; i < totalImages; i++) {
    const container = document.createElement("div");
    const img = document.createElement("img");
    img.src = `src/${i}.png`;
    container.classList.add("gridImage");
    imageWrapper.appendChild(container);
    container.appendChild(img);
  }
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
    letter.style.color = "rgba(0, 0, 0, 1)";
    // letter.style.mixBlendMode = "exclusion";
    letter.style.fontFamily = getRandomFont();

    captchaContainer.appendChild(letter);
  }

}

document.addEventListener("DOMContentLoaded", () => {
  initImageGrid();
  captchaGenerator();
});
