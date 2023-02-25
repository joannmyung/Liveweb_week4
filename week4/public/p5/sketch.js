var socket = io.connect();
			
socket.on('connect', function() {
  console.log("Connected " + socket.id);
});

socket.on('mouse', function(mouseData) {
  px = x;
  py = y;
  x = mouseData.x;
  y = mouseData.y;
});

socket.on('blink', function(whatever) {
  background(0);
  setTimeout(function() {
    background(255);
  }, 50);
});

let ball = {x: 200, y: 200, size: 50};
socket.on('ball', function(serverball) {
  ball.x = serverball.x;
  ball.y = serverball.y;
  ball.size = serverball.size;
});

let x = 0;
let y = 0;
let px = 0;
let py = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  //background(220);
  //ellipse(x, y, 20, 20);
  strokeWeight(20);
  line(px, py, x, y);

  ellipse(ball.x, ball.y, ball.size, ball.size);
}

function mouseMoved() {
  console.log(mouseX,mouseY);
  px = x;
  py = y;
  x = mouseX;
  y = mouseY;
  let dataToSend = {x: x, y: y};
  // let dataToSend = new Object();
  // dataToSend.x = x;
  // dataToSend.y = y;
  socket.emit('mouse', dataToSend);
}

function mousePressed() {
  socket.emit('blink', {});
}