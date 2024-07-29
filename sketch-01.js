import canvasSketch from 'canvas-sketch';

const settings = {
  dimensions: [ 2048, 2048 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.strokeStyle = 'black';
    context.lineWidth = 5;

    // Declare the rectangle properties
		const h = height / 10;
		const w = width / 10;
		const gap = h / 3;
    const n = 7; // n - number of iterations of rects
		let x, y;

    for(let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        x = 100 + (w + gap) * i;
				y = 100 + (h + gap) * j;

				// Draw the rectangels
				context.beginPath();
				context.rect(x, y, w, h);
				context.stroke();

        // Draw the small ones
				if (Math.random() < 0.5) {
					// context.strokeStyle = 'red';
					context.beginPath();
					context.rect(x + (2*w) / 15, y + (2*h) / 15, w - (4*w) / 15, h - (4*h) / 15);
					context.stroke();
				}
      }
    }
  };
};

canvasSketch(sketch, settings)
