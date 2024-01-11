const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = innerWidth;
CANVAS_HEIGHT = canvas.height = innerHeight;

const shootingShip = new Image();
shootingShip.src = "../images/Klaed - Dreadnought - Weapons.png";
const spriteHeight = 128;
const spriteWidth = 128;
let frame = 0;
let gameFrame = 0;
const stagger = 5;

spriteConfig = {
  src: shootingShip,
  frameX: 0,
  frameY: 0,
  frameW: spriteWidth,
  frameH: spriteHeight,
  positionX: CANVAS_WIDTH / 2,
  positionY: CANVAS_HEIGHT / 2,
  sizeW: spriteWidth,
  sizeH: spriteHeight,
};

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(
    spriteConfig.src,
    spriteConfig.frameX,
    spriteConfig.frameY,
    spriteConfig.frameW,
    spriteConfig.frameH,
    spriteConfig.positionX,
    spriteConfig.positionY,
    spriteConfig.sizeW,
    spriteConfig.sizeH
  );

  if (gameFrame % stagger == 0) {
    if (frame < 12) {
      frame++;
      spriteConfig.frameX = frame * spriteWidth;
    } else {
      frame = 0;
    }
  }
  gameFrame++;
  animationId = requestAnimationFrame(animate);
  console.log(spriteConfig);
}
addEventListener("click", (event) => {
  animate();
});
