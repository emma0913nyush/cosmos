
let img1;
let img2;
let img3;
let img4;

let num=0;
let x=0;

let song1;
let voice2;

let gridSize = 40;
let diameter = gridSize;
let fcol = 0;

let o=255;

let pos_x=0,pos_y=0;
let pos_x2=0,pos_y2=0;
let speed_x=-4,speed_y=5;
let speed_x2=-3.5,speed_y2=4;



function setup() {
   let cnv= createCanvas(1280,720);
   cnv.parent('canvas-container');
   img1 = loadImage('part2.png');
   img2 = loadImage('rainbow.png');
   img3 = loadImage('move1.png');
   img4 = loadImage('move2.png');
   song1 = new Audio('music4.mp3');
   song1.play();
   song1.volume =0.6

   voice2 = new Audio('voiceover2.m4a');
   voice2.play();



   textSize(20);
   textAlign(CENTER, CENTER);


}

function draw() {
  //background(53, bs, bb);

  image(img1, 0,0,1280,720);

  for (let i = 40; i < width ; i+=gridSize){
    
    for(let j = 40; j < height; j += gridSize){
      let moused = dist(mouseX, mouseY, i, j);
      fcol = map(moused, 0, width, 50, 180); 
      noStroke();
      fill(255,250,205);
      if (num>0){
        fill(fcol, 52, 95,0);
      }
      diameter = gridSize / moused * 3; 
      circle(i, j, diameter);
    }
  }

  if (num >0){
    tint(255,x);
    image(img2, 0,0,1280,720);
  }

  fill(150,150,150,o);
  text('Click to find your passion.', width/2, 600);
  
  pos_x= pos_x + speed_x;
  pos_y= pos_y + speed_y;

  image(img3,pos_x+1000,pos_y-720,720,720);

  pos_x2= pos_x2 - speed_x2;
  pos_y2= pos_y2 + speed_y2;
  image(img4,pos_x2-500,pos_y2-720,720,720);



  if(pos_y>1500){
      pos_y=0;
      pos_x=0;

  }
  if(pos_y2>1300){
    pos_y2=0;
    pos_x2=0;
  }
}

function mouseClicked() {
    num++;
    x=num*20;
    o=0;


    // tint(255,x);
    // image(img2, 0,0,1280,720);
}






