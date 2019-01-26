var numBirds;
var dir = [];
var loc = [];
var yOffset = [];
var sc = [];
var theta = [];
var thetaAdd = [];
var startLoc = [];
var beakCol = [];
var bodyCol = [];

var leafX = [];
var leafY = [];
var leafRot = [];
var leafCol = [];
var leafSc = [];


function setup(){
   createCanvas(720, 480);
   numBirds = 6;

   for (var i=0; i<numBirds; i++){
      startLoc.push(createVector(random(100, 620), random(100, 380)));
      loc.push(createVector(random(width), 0));
      console.log(loc[i].x)
      yOffset.push(random(height));
      dir.push(createVector());
      theta.push(random(2*PI));
      thetaAdd.push(random(-PI/30, PI/30));
      sc.push(random(.5, 1.25));
      bodyCol.push(color(random(150,255), random(255), random(150)));
      beakCol.push(color(random(100,255), random(255), random(200)));
   }

   var x = -50;
   var y = 290;
   while (y < height + 50){
      leafX.push(x);
      leafY.push(y);
      leafRot.push(random(-PI, PI));
      leafCol.push(color(random(80), random(200), random(200)));
      leafSc.push(random(1,1.5));
      x += random(30, 70);

      if (x > width+20){
         x = -50;
         y += random(30, 70);
      }
      
   }


}

function draw(){
   background(255);
   makeGradiant();
   var next = createVector();

   // Leaves in background
   for (var i = 0; i < leafX.length; i++){
      drawLeaf(leafX[i], leafY[i], leafRot[i], leafSc[i], leafCol[i]);
   }


   // Draw Birds
   for (var i=0; i < numBirds; i++)
   {
      drawBird(loc[i].x, loc[i].y, dir[i].x, dir[i].y, sc[i], bodyCol[i], beakCol[i]);
      
      // updates the bird's location by getting the next (x,y) and 
      // determining the direction from the current location to the next.
      theta[i] += thetaAdd[i];
      //next.x = startLoc[i].x + 200 * sin(theta[i]*.2);
      //next.y = startLoc[i].y + theta[i];
      next.x = loc[i].x-1;
      next.y = yOffset[i] + sin(.1*next.x);

      dir[i].x = next.x - loc[i].x;
      dir[i].y = next.y - loc[i].y;

      loc[i].x += dir[i].x
      loc[i].y += dir[i].y;

      if (loc[i].x < -100){
         loc[i].x = width + 100;
      }
   }
}


function makeGradiant(){  
   push();
   strokeWeight(5);
   
   var r = 155;
   var g = 200;
   var b = 190;

   for (var i=0; i < 70; i++) { 

      fill(r,g,b);
      stroke(r,g,b);

      rect(0,0+(i*7.2), width,7.2);

      r += 1;
      g += 1;
      b += 1;

   }
   pop();
}

function drawBird(x, y, dx, dy, sc, c1, c2){
   push();
      translate(x, y);
      rotate(atan2(dy, dx) + PI);
      scale(sc);
      noStroke();

      // B i r d  S h a p e
      fill(c1);
      beginShape();
         vertex(-5,-55);
         bezierVertex(-5,-55, 8, -55, 20,-20);
         bezierVertex(20, -20, 30, 10, 50, 5);
         bezierVertex(50, 5, 25, 60, -30, 50);
         bezierVertex(-30, 50, -60, 40, -60, 0);
         bezierVertex(-60, 0, -50, -64, -5, -55)
      endShape(CLOSE);

      // B i r d  E y e
      fill(0);
      ellipse(-35, -30, 5);

      // B i r d  B e a k
      fill(c2)
      triangle(-56, -15, -58, -5, -150, -5);
      var r = red(c2);
      var g = green(c2);
      var b = blue(c2);
      fill(r-50, g-50, b-50);
      triangle(-58, -5, -60, 5, -150, -5);
   pop();
}

function drawLeaf(x, y, rot, sc, c){
   fill(c);
   push();
      translate(x,y);
      rotate(rot);
      scale(sc);
      push();
      noStroke();
      beginShape();
         vertex(0, -50);
         bezierVertex(0, -50, 50, 0, 0, 50);
         bezierVertex(0, 50, -50, 0, 0, -50);
      endShape(CLOSE);
      pop();
      stroke(0,0,0, 60);
      line(0, -50, 0, 50);
      line(0, -30, -7, -42);
      line(0, -17, 11, -34);
      line(0, -13, -19, -20);
      line(0, 0, 20, -10);
      line(0, 10, -22, -2);
      line(0, 25, 21, 0);
      line(0, 37, -19, 15);
      line(0, 42, 9, 37);
   pop();
}










