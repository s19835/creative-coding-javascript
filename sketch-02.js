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
    
    const num = 64;
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
      context.scale(random.range(0.1, 2), random.range(1, 1.8));

      context.beginPath();
      context.rect(-w * 0.5, random.range(0, -h * 1.2), w * 0.3, h * 0.3);
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 10.5);

      context.beginPath();
      context.arc(0, 0, radius * random.range(0.5, 1.3), random.range(1, 3), slice * random.range(0, 3));
      context.stroke();
      context.restore();
    }

  }
}

canvasSketch(sketch, settings);
