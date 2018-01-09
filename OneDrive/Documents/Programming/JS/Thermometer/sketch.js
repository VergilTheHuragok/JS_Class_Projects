function setup() {
	createCanvas(screen.width, screen.height)
	background(255)
	slider = 1
	xWidth = width - width/6

}

function draw() {
	background(255)
	fill(200)
	noStroke()
	rect(width/12,0,xWidth, height/7)
	fill(255)
	stroke(0)
	strokeWeight(2)
	rect(width/12,(height/7)/4,xWidth, height/7 -(height/7)/2)
	fill(255,0,0)
	rect(width/12,(height/7)/4,slider*(xWidth), height/7 - (height/7)/2)
	line(width/12 + slider*(xWidth), (height/7)/4 + height/7 - (height/7)/2 + 3, width/12 + slider*(xWidth), (height/7)/4 - 3)
	if (mouseIsPressed) {
		slider = (mouseX -width/12)/xWidth
		if (slider < 0) {
			slider = 0
		}
		if (slider > 1) {
			slider = 1
		}
	}
	noStroke()
	fill(0)
	textAlign(CENTER)
	textSize(width/50)
	text(((160.0 * slider)-40).toFixed(1)	+ "° F",  width/12 + xWidth/2, (height/7)/6)
	text(((88.8888 * slider)-40).toFixed(1) + "° C",  width/12 + xWidth/2, (height/7) - ((height/7)/6)/2)
}