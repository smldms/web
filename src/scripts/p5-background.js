import p5 from 'p5';

new p5((sketch) => {
  let particles = [];
  const particleCount = 50;
  
  sketch.setup = () => {
    const container = document.getElementById('p5-container');
    if (!container) return;
    
    const canvas = sketch.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('p5-container');
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };
  
  sketch.draw = () => {
    sketch.clear();
    
    // Update and display particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].display();
      
      // Connect particles with lines if they're close enough
      for (let j = i + 1; j < particles.length; j++) {
        const d = sketch.dist(
          particles[i].pos.x, particles[i].pos.y,
          particles[j].pos.x, particles[j].pos.y
        );
        
        if (d < 150) {
          sketch.stroke(255, 255, 255, sketch.map(d, 0, 150, 50, 0));
          sketch.line(
            particles[i].pos.x, particles[i].pos.y,
            particles[j].pos.x, particles[j].pos.y
          );
        }
      }
    }
  };
  
  sketch.windowResized = () => {
    sketch.resizeCanvas(window.innerWidth, window.innerHeight);
  };
  
  class Particle {
    constructor() {
      this.pos = sketch.createVector(
        sketch.random(sketch.width),
        sketch.random(sketch.height)
      );
      this.vel = sketch.createVector(
        sketch.random(-0.5, 0.5),
        sketch.random(-0.5, 0.5)
      );
      this.size = sketch.random(3, 8);
      this.color = sketch.color(
        sketch.random(200, 255),
        sketch.random(200, 255),
        sketch.random(200, 255),
        sketch.random(100, 200)
      );
    }
    
    update() {
      this.pos.add(this.vel);
      
      // Bounce off edges
      if (this.pos.x < 0 || this.pos.x > sketch.width) {
        this.vel.x *= -1;
      }
      if (this.pos.y < 0 || this.pos.y > sketch.height) {
        this.vel.y *= -1;
      }
    }
    
    display() {
      sketch.noStroke();
      sketch.fill(this.color);
      sketch.ellipse(this.pos.x, this.pos.y, this.size);
    }
  }
}, 'p5-container');