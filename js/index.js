const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = { x: canvas.width / 2, y: canvas.height / 2 };
const mouse = { x: 0, y: 0 };

let baseImage = new Image();
baseImage.src = "../images/Klaed - Dreadnought - Base.png";

let shootingImage = new Image();
shootingImage.src = "../images/Klaed - Dreadnought - Weapons.png";

let backgroundImageVoid = new Image();
backgroundImageVoid.src =
  "../images/Condesed/Starry background  - Layer 01 - Void.png";

let backgroundImageStars = new Image();
backgroundImageStars.src =
  "../images/Condesed/Starry background  - Layer 02 - Stars.png";

let backgroundImageStarsDuo = new Image();
backgroundImageStarsDuo.src =
  "../images/Condesed/Starry background  - Layer 03 - Stars.png";

const shipImages = { base: baseImage, shooting: shootingImage };

const numberOfSprites = 8;
let numberOfSpritesStars = 9;
let currentSprite = 0;

let starBlink = 0;
let starFrame = 0;
let starsRotation = 0;

let stagger = 5;
let gameFrame = 0;

class SpaceBackground {
  constructor() {}
  animate() {
    let animateSprite = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.drawImage(
        backgroundImageVoid,
        (5760 / 9) * currentSprite,
        0,
        5760 / 9,
        360,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      ctx.restore();
      currentSprite = currentSprite + 0.001;
      if (currentSprite >= numberOfSprites) {
        currentSprite = 0;
      }

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.drawImage(
        backgroundImageStarsDuo,
        (5760 / numberOfSpritesStars) * starBlink,
        0,
        5760 / 9,
        360,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      ctx.restore();

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      ctx.drawImage(
        backgroundImageStars,
        (5760 / numberOfSpritesStars) * starBlink,
        0,
        5760 / 9,
        360,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      ctx.rotate(starsRotation);
      ctx.drawImage(
        backgroundImageStars,
        (5760 / numberOfSpritesStars) * starBlink,
        360 / 3,
        5760 / 9,
        360,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      ctx.restore();

      starsRotation = starsRotation + 0.0001;

      let starStagger = 8;
      if (starFrame % starStagger == 0) {
        starBlink++;
        if (starBlink >= numberOfSpritesStars) {
          starBlink = 0;
        }
      }
      starFrame++;
      requestAnimationFrame(animateSprite);
    };
    animateSprite();
  }
}

class SpaceShip {
  constructor(shipImage, rotationAngle) {
    this.shipImage = { base: shipImage.base, shooting: shipImage.shooting };
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.rotationAngle = rotationAngle;
    this.rotationAdjust = (90 * Math.PI) / 180;
    this.spriteNumber = 0;
    this.spriteFrameX = this.spriteWidth * this.spriteNumber;
    this.spriteFrameY = 0;
    this.spriteQuantity = 0;
    this.frameId = 0;
  }
  clear() {
    ctx.clearRect(
      center.x - playerShip.spriteWidth / 2,
      center.y - playerShip.spriteHeight / 2,
      playerShip.spriteWidth,
      playerShip.spriteHeight
    );
  }
  draw() {
    this.clear();
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(this.rotationAdjust + this.rotationAngle);
    ctx.drawImage(
      this.shipImage.shooting,
      this.spriteFrameX,
      this.spriteFrameY,
      this.spriteWidth,
      this.spriteHeight,
      -this.spriteWidth / 2,
      -this.spriteHeight / 2,
      this.spriteWidth,
      this.spriteHeight
    );
    ctx.restore();
  }

  shoot() {
    this.spriteQuantity = this.shipImage.shooting.width / this.spriteWidth;
    const animateSprite = () => {
      stagger = 2;
      if (gameFrame % stagger == 0) {
        if (this.spriteNumber < this.spriteQuantity - 1) {
          this.spriteNumber++;
          this.spriteFrameX = this.spriteWidth * this.spriteNumber;
          this.draw();
        }
      }
      gameFrame++;
      this.frameId = requestAnimationFrame(animateSprite);
    };
    if ((this.spriteNumber = this.spriteQuantity - 1)) {
      cancelAnimationFrame(this.frameId);
      gameFrame = null;
      this.frameId = null;
    }
    this.spriteNumber = 0;
    animateSprite();
  }

  update(rotationAngle) {
    this.rotationAngle = rotationAngle;
    this.draw();
  }
}

let spaceBackground = new SpaceBackground();
spaceBackground.animate();

let playerShip = new SpaceShip(shipImages, 0);

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  let coordinates = { x: mouse.x - center.x, y: -(mouse.y - center.y) };
  let angleRad = -Math.atan2(coordinates.y, coordinates.x);

  playerShip.update(angleRad);
  console.log(playerShip);
});

addEventListener("click", () => {
  playerShip.shoot();
  console.log(playerShip);
});
