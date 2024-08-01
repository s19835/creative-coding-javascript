import canvasSketch from 'canvas-sketch';

const settings = {
  dimensions: [ 2048, 2048 ]
}

const degToRad = (degree) => {
  return degree / 180 * Math.PI;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const x = 0.5 * width;
    const y = 0.5 * height;
    const w = 0.01 * width;
    const h = 0.1 * height;

    // context.save();
    // context.translate(x, y);
    // context.rotate(0.3);

    // context.beginPath();
    // context.rect(-0.5 * w, -0.5 * h, w, h);
    // context.fill();
    // context.restore();

    // context.translate(100, 400);
    // context.beginPath();
    // context.arc(width/2, height/2, 50, 0, 2 * Math.PI, false);
    // context.fill();
    
    const num = 12;
    // declare the angle to loop
    const slice = degToRad(360/num);

    for (let i = 0; i < num; i++) {
      const angle = slice * i;
      context.save();
      context.translate(x, y);
      context.rotate(angle);

      context.beginPath();
      context.rect(-w * 0.5, -h * 0.5, w, h);
      context.fill();
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
