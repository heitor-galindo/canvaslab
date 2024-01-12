const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const center = { x: canvas.width / 2, y: canvas.height / 2 };
const mouse = { x: 0, y: 0 };


// from Background.js
background()

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  let coordinates = { x: mouse.x - center.x, y: -(mouse.y - center.y) };
  let angleRad = -Math.atan2(coordinates.y, coordinates.x);

  // from spaceship.js
  playerShip.update(angleRad);
});

addEventListener("click", () => {
  // from spaceship.js
  playerShip.shoot();
});

