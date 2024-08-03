import canvasSketch from 'canvas-sketch';
import math from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';

const settings = {
  dimensions: [ 2048, 2048 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = 0.5 * width;
    const cy = 0.5 * height;
    const w = 0.01 * width;
    const h = 0.1 * height;
    let x, y;
    
    const num = 12;
    const radius = width * 0.3; // radius for circle
    // declare the angle to loop
    const slice = math.degToRad(360 / num);

    for (let i = 0; i < num; i++) {
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.5, 1), random.range(1, 1.8));

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = 7.5;

      context.beginPath();
      context.arc(0, 0, radius, 0, slice * 0.3);
      context.stroke();
      context.restore();
    }

  }
}

canvasSketch(sketch, settings);
