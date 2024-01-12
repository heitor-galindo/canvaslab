let stagger = 5;
let gameFrame = 0;

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
