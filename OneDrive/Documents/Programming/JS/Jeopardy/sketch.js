// noprotect
function setup() {
  createCanvas(windowWidth, windowHeight)
  textAlign(CENTER)
  rectWidth = width/16
  rectHeight = width/16
  margin = 10
  catNum = 5
  correct = {}
  for (i=0;i<25;i++) {
	correct[i] = 0
  }
  pressed = 0
}

function draw() {
  textSize(15)
  textAlign(CORNER)
  background(0)
  fill(255)
  noStroke()
  boxWidth = (rectWidth*catNum + catNum*margin)
  boxHeight = (rectHeight*5 + 5*margin)
  i0 = -1
  score = 0
  for (i1=1;i1<=5;i1++) {
    for (i=1;i<=catNum;i++) {
      i0++
      x = width/2 - boxWidth/2 + i*rectWidth + i*margin
      y = 200 + (i1*margin + i1*rectHeight)
      if (pressed == 1) {
        if (mouseX > x && mouseY > y && mouseX < x + rectWidth && mouseY < rectHeight + y) {
          correct[i0]++
        }
      }
      if (i1 == 1) {
        text("Cat " + i, x + rectWidth/2, y - 10)
      }
      if (correct[i0]%3 == 0) {
        fill(255)
      } else if (correct[i0]%3 == 1) {
        fill(0, 255, 0)
		score+=10*i1
      } else if (correct[i0]%3 == 2) {
        fill(255,0,0)
		score-=10*i1
      }
      rect(x,y , rectWidth, rectHeight)
	  fill(255)
      
    }
    text("Q " + i1, width/2 - boxWidth/2 + rectWidth - margin, y + rectHeight/2)
  }

  textAlign(CENTER)
  textSize(40)
  text(score + " / " + 750, width/2 + rectWidth, height/2 - boxHeight/2 - 10)
  if (mouseIsPressed) {
    pressed++;
  }
  
}

function mouseReleased() {
  pressed = 0;
  
}


