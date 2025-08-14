let img;
let cols, rows;
let size;
let logoX, logoY;
let targetX, targetY;
let offscreen;
let lastChangeTime = 0;
let changeInterval = 3000; // менять позицию каждые 3 секунды
let logoWidth;

function preload() {
  img = loadImage("src/logo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  offscreen = createGraphics(windowWidth, windowHeight);

  if (windowWidth > windowHeight) {
    size = 20;
    logoWidth = windowHeight * 1.5;
  } else {
    size = 10;
    logoWidth = windowHeight;
  }

  cols = floor(width / size);
  rows = floor(height / size);

  // начальная случайная позиция
  targetX = random(width - logoWidth);
  targetY = random(height - logoWidth);
  logoX = targetX;
  logoY = targetY;

  let c = document.querySelector("canvas");
  c.style.position = "fixed";
  c.style.top = "0";
  c.style.left = "0";
  c.style.width = "100vw";
  c.style.height = "100vh";
  c.style.zIndex = "-1";
  c.style.mixBlendMode = "screen";
  c.style.opacity = "50%";
}

function draw() {
  background("black");
  let now = millis();

  // если пришло время сменить позицию — генерируем новую
  if (now - lastChangeTime > changeInterval) {
    targetX = random(width - logoWidth);
    targetY = random(height - logoWidth);
    lastChangeTime = now;
  }

  // плавное движение к цели
  logoX = lerp(logoX, targetX, 0.006);
  logoY = lerp(logoY, targetY, 0.006);

  // рисуем лого на offscreen
  offscreen.clear();
  offscreen.image(img, logoX, logoY, logoWidth, logoWidth);

  // === Эффект волны ===
  let t = millis() / 3000;
  let waveSpeed = 10;
  let waveAmp = 40;
  let waveFreq = 0.006;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * size;
      let y = j * size;

      let dx = sin((y + t * waveSpeed * 60) * waveFreq) * waveAmp;
      let dy = cos((x + t * waveSpeed * 60) * waveFreq) * waveAmp;

      push();
      translate(x, y);
      scale(-1, -1);
      copy(offscreen, x + dx, y + dy, size, size, -size, -size, size, size);
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  offscreen = createGraphics(windowWidth, windowHeight);
  cols = floor(width / size);
  rows = floor(height / size);
}
