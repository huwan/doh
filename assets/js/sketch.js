var w = window.innerWidth;
var h = window.innerHeight;  
// window.onresize = function() {
//   w = window.innerWidth;
//   h = window.innerHeight;  
//   canvas.size(w,h);
// }

// canvas=createCanvas(w, h);
// canvas.parent('sketch-holder');
// background("#1b1b1b");


let numBalls = 8;
let spring = 0.3;
let gravity = 0; //0.03;
let friction = -1; //-0.9;
let balls = [];
let emotions = [];
let imageScalar = 0.1;

function preload() {
  for (let i = 0; i < 8; i++) {
    emotions[i] = loadImage('assets/media/emotions/emotion'+ i +'.png');
  }
}

function setup() {
  // createCanvas(720, 400);
  canvas=createCanvas(w, h);
  canvas.parent('sketch-holder');

  for (let i = 0; i < numBalls; i++) {
    let j = i % 8;
    let imgin = emotions[j];
    let xin = random(width);
    let yin = 0;
    let din = sqrt(imgin.width * imgin.width + imgin.height * imgin.height) * imageScalar;
    let win = imgin.width;
    let hin = imgin.height;
    let imhappy = false;
    if (j == 4) imhappy = true;
    // console.log("w:" + win + " h:" + hin + " d:" + din);
    balls[i] = new Ball(xin, yin, din, win, hin, i, balls, imgin, imhappy);
  }
  // noStroke();
  // fill(255, 204);
}

function draw() {
  background('#F5F5F5');
  // background('#1b1b1b');
  noStroke();

  balls.forEach(ball => {
    ball.getstat();
    ball.collide();
    ball.move();
    ball.display();
  });  
}

function restart_draw() {
  // console.log("reset canvas");
  balls.splice(0,numBalls);
  for (let i = 0; i < numBalls; i++) {
    let j = i % 8;
    let imgin = emotions[j];
    let xin = random(width);
    let yin = 0;
    let din = sqrt(imgin.width * imgin.width + imgin.height * imgin.height) * imageScalar;
    let win = imgin.width;
    let hin = imgin.height;
    let imhappy = false;
    if (j == 4) imhappy = true;
    // console.log("w:" + win + " h:" + hin + " d:" + din);
    balls[i] = new Ball(xin, yin, din, win, hin, i, balls, imgin, imhappy);
  }
}

class Ball {
  constructor(xin, yin, din, win, hin, idin, oin, imgin, imhappy) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.diff = 0;
    this.w = win;
    this.h = hin;
    this.id = idin;
    this.others = oin;
    this.emotion = imgin;
    this.imhappy = imhappy;
  }

  collide() {
    for (let i = 0; i < numBalls; i++) {
      if (i != this.id) {
        // console.log(others[i]);
        let dx = this.others[i].x - this.x;
        let dy = this.others[i].y - this.y;
        let distance = sqrt(dx * dx + dy * dy);
        let minDist = max(this.others[i].diameter / 2, this.diameter / 2);
        //   console.log(distance);
        //console.log(minDist);
        if (distance < minDist) {
        // if (this.x < this.others[i].x + this.others[i].w &&
        //    this.x + this.w > this.others[i].x &&
        //    this.y < this.others[i].y + this.others[i].h &&
        //    this.y + this.h > this.others[i].y) {
          let angle = atan2(dy, dx);
          let targetX = this.x + cos(angle) * minDist;
          let targetY = this.y + sin(angle) * minDist;
          let ax = (targetX - this.others[i].x) * spring;
          let ay = (targetY - this.others[i].y) * spring;
          this.vx -= ax;
          this.vy -= ay;
          this.others[i].vx += ax;
          this.others[i].vy += ay;
          if (this.imhappy && !this.others[i].imhappy) {
            this.others[i].emotion = this.emotion;
            this.others[i].imhappy = true;
            // this.others[i].w = this.w;
            this.others[i].h = this.h * this.others[i].w / this.w;
          }
        }
      }
    }
  }

  move() {
    // console.log("x:" + this.x + " y:" + this.y);
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }

  display() {
    image(this.emotion, this.x - this.w / 20 , this.y - this.h / 20, this.w / 10, this.h / 10);
  }

  getstat() {
    // ellipse(this.x, this.y, this.diameter, this.diameter);
    if (ishappy == 0) {
      // console.log("unhappy:" + ishappy);
      let eid = this.id % 8;
      this.emotion = emotions[eid];
      // this.w = emotions[eid].width;
      this.h = emotions[eid].height;
      if (eid != 4) this.imhappy = false;
    } else {
            // console.log("happy:" + ishappy);
    }
  }

}

