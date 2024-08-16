import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // create an object called point
    // const point = {
    //   x: 800,
    //   y: 400,
    //   radius: 10,
    // };

    const agents = [];
    for (let i = 0; i < 40; i++) {
      const x = random.range(0, width);
      const y = random.range(0, height);

      const agent = new Agent(x, y);
      agents.push(agent);
    }

    agents.forEach(agent => {
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);


class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = 10;
  }

  draw(context) {
    context.fillStyle = 'black';

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}