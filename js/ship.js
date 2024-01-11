const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const center = { x: canvas.width / 2, y: canvas.height / 2 };
const mouse = { x: 0, y: 0 };

class SpaceShip {
  constructor(shipImage, rotationAngle) {
    this.shipImage = {
      base: shipImage.base,
      shooting: shipImage.shooting,
    };
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.rotationAngle = rotationAngle;
    this.rotationAdjust = (90 * Math.PI) / 180;
    this.spriteNumber = 0;
    this.spriteFrameX = this.spriteWidth * this.spriteNumber;
    this.spriteFrameY = 0;
    this.spriteQuantity = 0;
    this.shipIsShooting = false;
  }
  draw() {
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(this.rotationAdjust + this.rotationAngle);

    if (this.shipIsShooting) {
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
    } else {
      ctx.drawImage(
        this.shipImage.base,
        -this.spriteWidth / 2,
        -this.spriteHeight / 2,
        this.spriteWidth,
        this.spriteHeight
      );
    }

    ctx.restore();
  }
  clear() {
    ctx.clearRect(
      center.x - playerShip.spriteWidth / 2,
      center.y - playerShip.spriteHeight / 2,
      playerShip.spriteWidth,
      playerShip.spriteHeight
    );
  }

  shoot() {
    this.spriteQuantity = this.shipImage.shooting.width / this.spriteWidth;
    const animateSprite = () => {
      this.spriteFrameX = this.spriteWidth * this.spriteNumber;
      if (this.spriteNumber > this.spriteQuantity) {
        this.spriteNumber = 0;
      } else {
        this.spriteNumber++;
        requestAnimationFrame(animateSprite);
      }
    };
    animateSprite()
  }

  update(rotationAngle, shipIsShooting) {
    this.rotationAngle = rotationAngle;
    this.shipIsShooting = shipIsShooting;
    this.clear()
    if (shipIsShooting) {
      this.shoot()
    }
    this.draw();
  }
}

let baseImage = new Image();
let shootingImage = new Image();

baseImage.src = "../images/Klaed - Dreadnought - Base.png";
shootingImage.src = "../images/Klaed - Dreadnought - Weapons.png";

const shipImages = {
  base: baseImage,
  shooting: shootingImage,
};

let playerShip = new SpaceShip(shipImages, 0);

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  let coordinates = { x: mouse.x - center.x, y: -(mouse.y - center.y) };
  let angleRad = -Math.atan2(coordinates.y, coordinates.x);
  
  addEventListener("click", () => {
    let shipIsShooting = true;
    playerShip.update(angleRad, shipIsShooting);
  });
  playerShip.update(angleRad);
});
