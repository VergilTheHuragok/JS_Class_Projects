var x;
var y;
var cx;
var cy;
var cxR;
var cyR;

var rate = 10;


function setup() {
	noStroke()
	newCoords()
	cx = x
	cy = y
}

function draw() {
	initCanvas()
	fill(255)
	shape(cx, cy)
	
	if (abs(cx - x) <= 2 || abs(cy - y) <= 2) {
		newCoords()	
	}
	
	fill(0)
	
	if (cx > x) {
		cx = cx - cxR
	} else {
		cx = cx + cxR
	}
	if (cy > y) {
		cy = cy - cyR
	} else {
		cy = cy + cyR
	}
	
	shape(cx, cy)
}

function initCanvas() {
	createCanvas(windowWidth,windowHeight)
}

function newCoords() {
	x = random(windowWidth)
	y = random(windowHeight)
	shape(x, y)
	cxR = (abs(cx - x)/width)*rate
	cyR = (abs(cy - y)/height)*rate	
}

function shape(x1, y1) {
	rect(x1, y1, 20, 20)
}
