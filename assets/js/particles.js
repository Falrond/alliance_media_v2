const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const body = document.querySelector("body");
let particles = [];
let randomMaxSpeed = 0.8;
console.log(canvas.width);
class Particle {
  constructor() {
    this.reset();
    this.speedY =
      Math.random() > 0.5
        ? Math.random() * randomMaxSpeed * -1
        : Math.random() * randomMaxSpeed;
    this.speedX =
      Math.random() > 0.5
        ? Math.random() * randomMaxSpeed * -1
        : Math.random() * randomMaxSpeed;
  }

  reset() {
    this.coordinates = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    };
  }

  move() {
    if (this.coordinates.x >= canvas.width) {
      this.speedX = this.speedX * -1;
    }
    if (this.coordinates.y >= canvas.height) {
      this.speedY = this.speedY * -1;
    }
    if (this.coordinates.x <= 0) {
      this.speedX = this.speedX * -1;
    }
    if (this.coordinates.y <= 0) {
      this.speedY = this.speedY * -1;
    }

    for (let i = 0; i < particles.length; i++) {
      let { x, y } = this.coordinates;
      if (
        Math.abs(x - particles[i].coordinates.x) <= 200 &&
        Math.abs(y - particles[i].coordinates.y) <= 200
      ) {
        // if (body.classList.contains("light-theme")) {
        //   ctx.strokeStyle = `#03c0ff25`;
        // } else {
        //   ctx.strokeStyle = `#0666F34`;
        // }
        ctx.strokeStyle = `#03c0ff25`;
        // ctx.strokeStyle = `#F3920025`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(particles[i].coordinates.x, particles[i].coordinates.y);
        ctx.stroke();
      }
    }
    this.coordinates.x += this.speedX;
    this.coordinates.y += this.speedY;
  }
}

function setDimentions() {
  particles = [];

  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  //   canvas.style.width = "100%";
  //   canvas.style.height = "100";

  let w = window.innerWidth;
  let particleTotal = w > 1000 ? 100 : 65;
  for (let i = 0; i < particleTotal; i++) {
    let particle = new Particle();
    particles.push(particle);
  }
}

setDimentions();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let { x, y } = particles[i].coordinates;
    particles[i].move();
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.stroke();
  }

  requestAnimationFrame(animate);
}
animate();
