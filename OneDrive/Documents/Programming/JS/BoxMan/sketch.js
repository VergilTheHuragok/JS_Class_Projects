function setup() {
	frameRate(10)
		res = [400, 400]
  createCanvas(1024,768)
  background(125,255,100)
}

function draw() {
		background(125,255,100)
		res = [floor(random(1024) + 1), floor(random(768) + 1)]	
		
		fill(50,50,255)
  rect((res[0]/2) - res[0]/5, (res[1]/2) - res[1]/6, (res[0]/5)*2, (res[1]/6)*2)
  
  line((res[0]/2) - res[0]/5, ((res[1]/2) - res[1]/6) + (res[1]/6)*2, ((res[0]/2) - res[0]/5), (((res[1]/2) - res[1]/6) + (res[1]/6)*2) + res[1]/4)
		line(((res[0]/2) - res[0]/5) + (res[0]/5)*2, ((res[1]/2) - res[1]/6) + (res[1]/6)*2, ((res[0]/2) - res[0]/5) + (res[0]/5)*2, (((res[1]/2) - res[1]/6) + (res[1]/6)*2) + res[1]/4)
		
		line((res[0]/2) - res[0]/5, (res[1]/2), ((res[0]/2) - res[0]/5) - res[0]/4,(res[1]/2))
		line(((res[0]/2) - res[0]/5) - res[0]/6, (res[1]/2 - res[1]/12), ((res[0]/2) - res[0]/5) - res[0]/6,(res[1]/2 + res[1]/12))
	
		line((res[0]/2) + res[0]/5, (res[1]/2), ((res[0]/2) + res[0]/5) + res[0]/4,(res[1]/2))
		line(((res[0]/2) + res[0]/5) + res[0]/6, (res[1]/2 - res[1]/12), ((res[0]/2) + res[0]/5) + res[0]/6,(res[1]/2 + res[1]/12))
	
		fill(255,0,0)
		ellipse(res[0]/2, res[1]/2 - res[1]/6- (res[1]/7)/3.1415, (res[0]/7),  (res[1]/7))
	
}