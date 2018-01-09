//noprotect
var maxSize = 400;
var maxSpeed = 20; 
var maxRotSpeed = 20; // the bigger, the slower
var shipFrequency = 250;
var shipExitChance = 5;
var starDensity = 400;
var starSize = 1;
var numShips;
var ships = [];
var starting;

var maxFlame = 200;
var flameSize = 5;

function setup() {
	starting = true;
	stars = []
	for (ind = 0;ind<random(1920*1080/starDensity);ind++) {
		stars.push([random(1920), random(1080)])
	}
}

function drawStar(coords) {
	for (ind3=0;ind3<random(10);ind3++) {
		push()
		translate(coords[0], coords[1])
		angleMode(DEGREES);
		rotate(random(360))
		fill(255)
		noStroke()
		leng = random(starSize)
		rect(0, -leng, 5, leng*2)
		pop()
	}
}


function draw() {
	createCanvas(windowWidth, windowHeight);
	background(0)
	for (ind2 = 0;ind2<stars.length;ind2++) {
		drawStar(stars[ind2]);	
	}
	if (random(1, shipFrequency) < 2 || starting) {
		ships.push(new Ship());	
	}
	for (iii=0;iii<ships.length;iii++) {  // My index var names are terrible. I swear I'm better in Python.
		if (ships[iii] != "Gone") {  // I couldn't remember how to splice an array. I'll fix it later.
			if (!ships[iii].moving) {
				ships[iii].gen();
				ships[iii].startMove(false, null, null);
			} else {
				ships[iii].render()
				if (ships[iii].move()) {
					ships[iii] = "Gone";
				}
			}
		}
	}
	
	if (mouseIsPressed) {
		for (j=0;j<ships.length;j++) {
			if (ships[j] != "Gone") {
				ships[j].startMove(false, mouseX, mouseY)
			}
		}
	}	
	starting = false;
}

function Ship() {
	this.height;
	this.width;
	this.numExBoxes;
	this.numInBoxes;
	
	this.inBoxWidth;
	this.inBoxLength;
	
	this.exBoxLength;
	
	this.exBoxColor;
	this.inBoxColor;
	
	this.x;
	this.y;
	this.winWidth;
	this.winHeight;
	this.targetX;
	this.targetY;
	
	this.speed;
	this.rotSpeed = 0;
	this.rotSpeedScale;
	
	this.rotation;
	this.rotated = 0;
	
	this.moving = false;
	
	this.rotAcc = false;
	this.rotDea = false;
	this.acc = false;
	this.dea = false;
	
	this.gen = function() {
		this.numExBoxes = random(1,9);
		this.numInBoxes = random(0,5);
		this.height = random(20, maxSize);
		this.width = random(10, this.height-5);
		
		this.aHeight = this.height
		
		this.exBoxLength = random(5, this.height/this.numExBoxes);
		
		this.inBoxLength = random(2, this.exBoxLength/this.numInBoxes);
		this.inBoxWidth = random(5, this.width);
		
		this.exBoxColor = randShipColor();
		this.inBoxColor = randShipColor();
		this.marginColor = randShipColor();
		
		this.winWidth = width;
		this.winHeight = height;
		this.x = -width;
		this.y = random(height);
		
		this.speed = random(.1,maxSpeed);
		this.rotSpeedScale = random(3, maxRotSpeed);
		
		this.rotation = random(360);
		
	}
	
	this.updateCoords = function() {
		xScale = width/this.winWidth;
		yScale = height/this.winHeight;
		
		this.x *= xScale;
		this.y *= yScale;
		this.targetX *= xScale;
		this.targetY *= yScale;
		
		this.speed *= (xScale + yScale)/2
		
		this.winWidth = width;
		this.winHeight = height;
		
	}
		
	this.render = function() {
		this.updateCoords();
		
		push();
		angleMode(DEGREES);
		translate(this.x + this.width/2, this.y + this.height/2)
		rotate(this.rotation);
		translate(-this.width/2, -this.height/2);
		fill(this.exBoxColor);
		stroke(0);
		strokeWeight(1);
		fLength = ((maxSpeed - this.speed)/maxSpeed)*this.aHeight*1.5;
		if (fLength < 1) {
			fLength = 1;
		}
		fWidth = ((maxRotSpeed - this.rotSpeedScale)/maxRotSpeed)*this.width*1.5;
		if (fWidth < 1) {
			fWidth = 1;
		}
		if (this.acc) {
			this.renderFlame(0, this.aHeight, this.width, fLength)
		}
		if (this.dea) {
			this.renderFlame(0, 0, this.width, -fLength)
		}
		if (this.rotAcc) {
			this.renderFlame(0, 0, -fWidth, this.exBoxLength)
			this.renderFlame(this.width, this.aHeight, fWidth, -this.exBoxLength)
		}
		if (this.rotDea) {
			this.renderFlame(this.width, 0, fWidth, this.exBoxLength)
			this.renderFlame(0, this.aHeight, -fWidth, -this.exBoxLength)
		}
		for (i=0; i<=this.numExBoxes; i++) {
			boxLength = (this.height/this.numExBoxes)
			marginLength = boxLength - this.exBoxLength;
			rect(0, i*boxLength, this.width, this.exBoxLength);
			if (i<this.numExBoxes-1) {
				push()
				fill(this.marginColor)
				rect(this.width/4, ((i+1)*this.exBoxLength + (i*marginLength)), this.width/2, marginLength);
				pop()
				this.aHeight = ((i+1)*this.exBoxLength + (i*marginLength)) + boxLength
			}
			
			push()
			fill(this.inBoxColor)
			for (ii=0; ii<=this.numInBoxes; ii++) {
				iBoxLength = (this.exBoxLength/this.numInBoxes)
				rect(this.width/2 - this.inBoxWidth/2, i*boxLength + ii*iBoxLength, this.inBoxWidth, this.inBoxLength)
			
			}
			pop()
		}
		
		pop();

	}
	
	this.renderFlame = function(x, y, w, h) {
		push()
		noStroke()
		  for (u=0; u < random(maxFlame); u++) {
			fill(randFlameColor())
			xx = ((random(x+w/4, x+(w/4)*3) + random(x+w/4, x+(w/4)*3) + random(x, x+w/2) + random(x+(w/2), x+w))/4)
			yy = (random(y+h/4, y+(h/4)*3) + random(y+h/4, y+(h/4)*3) + random(y, y+h/2) + random(y+(h/2), y+h))/4
			ellipse(xx, yy, random(flameSize))
		  }
		pop()
	}
	
	this.startMove = function(end, x, y) {
		this.dea = false;
		this.acc = false;
		this.rotAcc = false;
		this.rotDea = false;
		this.ending = false;
		this.moving = true;
		this.rotated = 0;
		if (x == null || y == null) {
			if (end) {
				this.targetX = 2*width;
				this.targetY = random(height);
			} else {
				this.targetX = random(this.height/2, width - this.height/2);
				this.targetY = random(this.height/2, height - this.height/2);
			}
		} else {
			this.targetX = x;
			this.targetY = y;
		
		}
		
		this.startX = this.x
		this.startY = this.y //Formula for constant movement speed found on Stackoverflow in C. Converted to JS
		this.distance = Math.sqrt(Math.pow(this.targetX-this.x,2)+Math.pow(this.targetY-this.y,2));
		this.directionX = (this.targetX-this.x) / this.distance;
		this.directionY = (this.targetY-this.y) / this.distance;
		if ((this.targetY < this.y) && (this.targetX < this.x)) { //Ships don't align correctly in these circumstances
			this.startMove(end, null, null) // I'm lazy so just regen instead of solve
		}
		this.targetRot = Math.abs((Math.atan2(this.targetY - this.y, this.targetX - this.x) * 180 / Math.PI) + 90)
		print("____")
		this.rotDist = rotationSpeed(this.targetRot, this.rotation);
		print("__________")
	}
		
	this.move = function() {
		if (!this.rotated && Math.abs(this.targetRot - this.rotation) > 1) {
			curDist = rotationSpeed(this.targetRot, this.rotation);
			//print("TRo: " + floor(this.targetRot), "CRo: " + floor(this.rotation), "TDi: " + floor(this.rotDist), "CDi: " + floor(curDist), "CAc: " + floor(this.rotSpeed), "\n")
			
			if (Math.abs(curDist) > Math.abs(this.rotDist/2)) {
				this.rotSpeed = this.rotDist - curDist;
				if (this.rotSpeed == 0) {
					this.rotSpeed = (curDist > 0) ? 1 : -1
					print(this.rotSpeed)
				}
				if (this.rotSpeed > 0) {
					this.rotAcc = true;
					this.rotDea = false;
				} else {
					this.rotAcc = false;
					this.rotDea = true;
				}
			} else {
				this.rotSpeed = curDist;
				if (this.rotSpeed < 0) {
					this.rotAcc = true;
					this.rotDea = false;
				} else {
					this.rotAcc = false;
					this.rotDea = true;
				}
			}
		

			this.rotSpeed/=this.rotSpeedScale;
			this.rotation += this.rotSpeed;
			if (this.rotation > 360) {
				this.rotation-=360;
			}
			if (this.rotation < 0) {
				this.rotation += 360;
			}
			//print(acc, "Tar: " + floor(this.targetRot), "Rot: " + floor(this.rotation), "Dist: " + floor(this.rotDist), "curDist: " + floor(curDist), "Acc: " + floor(this.rotSpeed))
			

		} else {
			this.rotAcc = false;
			this.rotDea = false;
			this.rotated = true;
			_distance = Math.sqrt(Math.pow(this.x-this.startX,2)+Math.pow(this.y-this.startY,2))
			if (_distance > this.distance/2) {
				distRatio = ((this.distance-_distance)/this.speed);
				this.acc = false;
				this.dea = true;
			} else {
				distRatio = ((_distance)/this.speed);
				this.acc = true;
				this.dea = false;
			}
			if (distRatio < 0.2) {
				distRatio = 0.2;
			}
			this.x += this.directionX * distRatio;
			this.y += this.directionY * distRatio;
			
			if(_distance >= this.distance) {
				this.dea = false;
				if (!this.ending) {
					if (random(1, shipExitChance) < 2) {
						this.startMove(true, null, null);
						this.ending = true;
					} else {
						this.startMove(false, null, null);
					}
				} else {
					return true;					
				}
			}
		}
	}
}

function rotationSpeed(target, current) {
	rotDist = target - current
	if (rotDist > 180) {
		rotDist = 180 - (rotDist-180)
		rotDist*=-1;
	}
	if (rotDist < -180) {
		rotDist = -180 + (Math.abs(rotDist)-180)
		rotDist*=-1;
	}
	return rotDist;
}


function randShipColor() {
	return HSVtoRGB(random(1), (random(1) + random(1))/2, (random(1) + random(1))/2);
}
function randFlameColor() {
	return HSVtoRGB(random(.1666), (random(1) + random(1))/2, (random(1) + random(1))/2);
}

//Using HSV because it allows for easy creation of shades rather than changing r, g, and b separately.
function HSVtoRGB(h, s, v) {//Stole this formula from Stackoverflow. I'm not *that* good... yet 
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}