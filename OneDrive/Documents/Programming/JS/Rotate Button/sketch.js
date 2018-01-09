
var boards;
var rotation = 0;
var rot_dir = 1
var press = false;
var offset = 0;
var yoffset = 0;
var speed = 1;

function setup() {
	angleMode(DEGREES)
	noStroke()
	boardNum = random(1, 10)
	boards = []
	for (i=0;i<boardNum;i++) {
		squareCount = floor(random(1, 20))
		if (squareCount%2!=0) {
			squareCount++
		}
		boards.push([random(1,5), random(1,5), randColor(), randColor(), random(10, 200), squareCount])
		print(boards[i])
	}
}

function draw() {
	rotation+=speed
	createCanvas(windowWidth, windowHeight)
	for (i=0;i<boards.length;i++) {
		rotateSquare(rotation*rot_dir, boards[i])
	}
	if (button(0,0,width/8, height/12, "Regen", "white", "black", width/40)) {
		setup()
	}
	if (rot_dir == 1) {
		if (button(width/8,0,width/8, height/12, "Rotate <--", "white", "black", width/40)) {
			rot_dir = -1
		}
	} else {
		if (button(width/8,0,width/8, height/12, "Rotate -->", "white", "black", width/40)) {
			rot_dir = 1
		}
	}
	if (button(2*(width/8),0,width/8, height/12, "Offset -->", "white", "black", width/40)) {
			offset+=(width/16)
	}
	if (button(3*(width/8),0,width/8, height/12, "Offset <--", "white", "black", width/40)) {
			offset-=(width/16)
	}
	if (button(4*(width/8),0,width/8, height/12, "Offset ^", "white", "black", width/40)) {
			yoffset-=(width/16)
	}
	if (button(5*(width/8),0,width/8, height/12, "Offset v", "white", "black", width/40)) {
			yoffset+=(width/16)
	}
	if (button(6*(width/8),0,width/8, height/12, "Speed -->", "white", "black", width/40)) {
			speed++
	}
	if (button(7*(width/8),0,width/8, height/12, "Speed <--", "white", "black", width/40)) {
			speed--
	}
}

function rotateSquare(rotation, board) {
	push()
	rectMode(CORNER)
	translate((width/board[0]) + offset, (height/board[1]) + yoffset)
	rotate(rotation)
	drawCheckerBoard(-.5*board[4], -.5*board[4], board[2], board[3], board[4], board[5])
	pop()
}

// Can call function with all required variables
function drawCheckerBoard(x, y, c1, c2, bs, sc) {
	ss = bs/sc
	rowOdd = true
	colOdd = true
	for (row=0;row<sc;row++) {
		for (col=0;col<sc;col++) {
			fill(c2)
			if (rowOdd == colOdd) {
				fill(c1)
			}
			rect(x + (ss*col),y + (ss*row),ss,ss) 
			rowOdd = !rowOdd
		}
		colOdd = !colOdd
	}

}

function randColor() {
	return [random(255), random(255), random(255)]
}

function pressed() {
	if (!press && mouseIsPressed) {
		press = true
		return true
	} else if (!mouseIsPressed) {
		press = false
		return false
	}
}

function button(x,y,w,h,txt,c,tc,ts) {
	push()
	rectMode(CORNER)
	strokeWeight(1)
	stroke(0)
	fill(c)
	rect(x, y, w, h)
	textAlign(CENTER)
	textSize(ts)
	fill(tc)
	text(txt,x + w/2, y + h/2)
	pop()
	if (mouseX <= x+w && mouseY <= y+h && mouseX >= x && mouseY >= y && pressed()) {
		return true
	}
	return false

}