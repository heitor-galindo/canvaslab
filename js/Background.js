let backgroundImageVoid = new Image();
backgroundImageVoid.src =
  "../images/Condesed/Starry background  - Layer 01 - Void.png";

let backgroundImageStars = new Image();
backgroundImageStars.src =
  "../images/Condesed/Starry background  - Layer 02 - Stars.png";

let backgroundImageStarsDuo = new Image();
backgroundImageStarsDuo.src =
  "../images/Condesed/Starry background  - Layer 03 - Stars.png";

const numberOfSprites = 8;
let numberOfSpritesStars = 9;
let currentSprite = 0;

let starBlink = 0;
let starFrame = 0;

function background() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.drawImage(
    backgroundImageVoid,
    (currentSprite * 5760) / 8,
    0,
    5760 / 8,
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
  ctx.restore();

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

  let starStagger = 8;
  if (starFrame % starStagger == 0) {
    starBlink++;
    if (starBlink >= numberOfSpritesStars) {
      starBlink = 0;
    }
  }
  starFrame++;
  requestAnimationFrame(background);
}
