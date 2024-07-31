import canvasSketch from 'canvas-sketch';

const settings = {
  dimensions: [ 2048, 2048 ]
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    context.strokeStyle = 'white';
    context.lineWidth = 0.01 * width;

    // Declare the rectangle properties
		const h = height / 10;
		const w = width / 10;
		const gap = h / 3;
    const n = 7; // n - number of iterations of rects
    const offset = 0.015 * width;
		let x, y;

    for(let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        x = 100 + (w + gap) * i;
				y = 100 + (h + gap) * j;

				// Draw the rectangels
        context.lineWidth = Math.random(0.0078) * width * 0.002;
				context.beginPath();
				context.rect(x, y, w, h);
				context.stroke();

        // Draw the small ones
				if (Math.random() < 0.5) {
          context.lineWidth = Math.random(0.0078) * width * 0.002;
					context.beginPath();
					context.rect(x + offset / 2, y + offset / 2, w - offset, h - offset);
					context.stroke();
				}
      }
    }
  }
}

canvasSketch(sketch, settings)
