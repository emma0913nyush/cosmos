let timer=25;
let noiseScale=0.02;
let circleY = [];
let img1;
let img2;
let img3;
let img4;
let img5;

var song1;
var song2;
let voice1;


let y=0;
let y2=-500;

let bs=0;
let bb=20;

let o=255; 

function setup() {
   let cnv= createCanvas(1280,720);
   cnv.parent('canvas-container');
   img1 = loadImage('line.png');
   img2 = loadImage('center.png');
   img3 = loadImage('sun.png');
   img4 = loadImage('ball3.png');
   img5 = loadImage('ball2.png');
   song1 = new Audio('music3.mp3');
   song1.play();
   song1.volume =0.6;

   voice1 = new Audio('voiceover1.m4a');
   voice1.play();
   voice1.volume =0.9;


   textSize(20);
   textAlign(CENTER, CENTER);

   angleMode(DEGREES);
   colorMode(HSB, 360, 100, 100);
   noStroke();
   ellipseMode(RADIUS);
   //system1 = new ParticleSystem(createVector(width / 2, 50));
   system2 = new ParticleSystem(createVector(width / 2, 180));
   system3 = new ParticleSystem(createVector(width / 2, 330));

   for (let i = 0; i < 25; i++) {
    circleY[i] = random(height);
  }

}

function draw() {
  background(53, bs, bb);


  image(img1, 0,y,1280,720);
  image(img2, 350,20,580,580);


  if (mouseIsPressed) {
    if(y<720){
      y=mouseY;
      o=0;
    }
  }

  if(y>720){
    //song1.pause();
    //song2.play();
    song1.volume =0.35;
    // fill(230, 0, 20);
    // rect(0,0,1280,720);

    y2+=1
    image(img3,250,y2*1.2,800,720)
    if(y2 > -21){
      
      y2=-20;
      if(bs<40){
        bs+=1;
      }
      if(bb<100){
        bb+=1;
      }
      fill(326,46,100,60);
      
       
      for (let i = 0; i < circleY.length; i++) {
        let circleX = width * i / circleY.length;
        image(img5,circleX, circleY[i],50,50);
        // circle(circleX, circleY[i], 15);
        circleY[i]++;
      
        if (circleY[i] > height) {
           circleY[i] = 0;
        }
      }
    }


    }
  
    system2.addParticle();
    system2.run();


  if (frameCount % 60 == 0 && timer > 0) {
     timer --;
  }
  
  if (timer==0){
    fill(255,0,40,o);
    text('Drag to take down your wall and open up to others', width/2, 600);
  }
  

 
}


let Particle = function(position) {
  this.acceleration = createVector(0, 0.1);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 0;
  if(y2>-21){
    this.lifespan = 100;
  }
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan += 0.1;
  if(y2>-21){
    this.lifespan -= 0.1;
  }
};

// Method to display
Particle.prototype.display = function() {
  //stroke(200, this.lifespan);
  strokeWeight(2);
  //fill(0, 0,this.lifespan,10);
  if(y2>-21){
    // fill(18,77,this.lifespan);
    image(img5,this.position.x, this.position.y,50,50);
  }
  // ellipse(this.position.x, this.position.y, 20, 20);
  else{
  image(img4,this.position.x, this.position.y,50,50);
  }
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

