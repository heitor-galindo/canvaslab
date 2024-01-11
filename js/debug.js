function draw_debug(x, y, rotation) {
    ctx.beginPath();
    // circulo maior
    ctx.arc(center.x, center.y, (100 * Math.sqrt(2)) / 2, 0, Math.PI * 2, true);
    ctx.moveTo(center.x, center.y);
    //circulo que segue o angulo da linha do ponteiro
    ctx.arc(center.x, center.y, 100, (0 * Math.PI) / 180, rotation, true);
    // linha que segue o ponteiro
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(position.mouse.x, position.mouse.y);
    ctx.lineWidth = 2;
    ctx.stroke();
    // quadrado rotatorio
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);
    ctx.strokeRect(-50, -50, 100, 100);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.restore();
  }