import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import math from 'canvas-sketch-util/math';

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true,
};

const sketch = ({ width, height }) => {
  const agents = [];
  const numParticles = 40;
  
  for (let i = 0; i < numParticles; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let j = 0; j < agents.length; j++) {
      const agent = agents[j];
  
      for (let k = j + 1; k < agents.length; k++) {
        const neighbour = agents[k];

        const distance = agent.pos.getDistance(neighbour.pos);

        if (distance > 200) continue;

        context.lineWidth = math.mapRange(distance, 0, 200, 4, 1);
  
        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(neighbour.pos.x, neighbour.pos.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.radius = random.range(4, 12);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x - this.radius <= 0 || this.pos.x + this.radius >= width) this.vel.x *= -1;
    if (this.pos.y - this.radius <= 0 || this.pos.y + this.radius >= height) this.vel.y *= -1;
  }

  wrap(width, height) {
    if (this.pos.x <= 0) this.vel.x *= -1;
    if (this.pos.y <= 0) this.vel.y *= -1;
    if (this.pos.x >= width) this.pos.x = 0;
    if (this.pos.y >= height) this.pos.y = 0;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}