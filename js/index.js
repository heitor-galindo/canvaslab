const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const center = { x: canvas.width / 2, y: canvas.height / 2 };
const mouse = { x: 0, y: 0 };

const playerImage = new Image();
playerImage.src = "../images/Klaed - Dreadnought - Base.png";

const shootingShip = new Image();
shootingShip.src = "../images/Klaed - Dreadnought - Weapons.png";

class SpaceShip {
  constructor(imageSrc) {
    this.image = new Image();
    this.image.src = imageSrc;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
  }
  draw() {
    ctx.save();
    ctx.translate(0,0);
    ctx.rotate(1);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.drawImage(
      this.image,
      -this.spriteWidth / 2,
      -this.spriteHeight / 2,
      this.spriteWidth,
      this.spriteHeight
    );
    ctx.restore();
  }
}

spaceShipBaseImage = "../images/Klaed - Dreadnought - Base.png";

playerShip = new SpaceShip(spaceShipBaseImage);
playerShip.draw();


let imageWidth;
let spriteSize;
let spriteQuantity;
let spritePosition;
let intervalId;
let spriteNumber = 0;
const spriteHeight = 128;
const spriteWidth = 128;

function draw_player(x, y, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.rotate((90 * Math.PI) / 180);
  ctx.drawImage(
    playerImage,
    -spriteWidth / 2,
    -spriteHeight / 2,
    spriteWidth,
    spriteHeight
  );
  ctx.restore();
}

function player_shooting_animation(x, y, rotation) {
  if (intervalId) {
    return;
  }

  imageWidth = shootingShip.width;
  spriteQuantity = imageWidth / spriteWidth;

  function shoot(x, y, rotation, spritePosition) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.drawImage(
      shootingShip,
      spritePosition,
      0,
      spriteWidth,
      spriteHeight,
      -spriteWidth / 2,
      -spriteHeight / 2,
      spriteWidth,
      spriteHeight
    );
    ctx.restore();
  }

  intervalId = setInterval(() => {
    shoot(x, y, rotation, spritePosition);
    spriteNumber++;
    if (spriteNumber > spriteQuantity) {
      spriteNumber = 0;
      clearInterval(intervalId);
      intervalId = null;
    }
    spritePosition = spriteWidth * spriteNumber;
  }, 10);
}

function run_main() {
  window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    const coordinates = {
      x: mouse.x - center.x,
      y: -(mouse.y - center.y),
    };

    const rotation = -Math.atan2(coordinates.y, coordinates.x);

    if (intervalId) {
      return;
    } else {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      draw_player(center.x, center.y, rotation);
    }
  });

  window.addEventListener("click", (event) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    const coordinates = {
      x: mouse.x - center.x,
      y: -(mouse.y - center.y),
    };

    const rotation = -Math.atan2(coordinates.y, coordinates.x);
    player_shooting_animation(center.x, center.y, rotation);
    console.log(
      "x: " + coordinates.x,
      "y: " + coordinates.y,
      "degree: " + (-rotation * 180) / Math.PI
    );
  });
}

// run_main();
