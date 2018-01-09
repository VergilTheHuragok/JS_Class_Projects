var bug;  // Declare object
var maxSpeed = 100;
var maxDiameter = 50;

function setup() {
	bugs = [];
};

function draw() {
  createCanvas(windowWidth, windowHeight);
  background(50, 89, 100);
  if (bugs.length < 1) {
		for (i=0; i<=random(windowWidth/5); i++) {
			bugs.push(new Jitter());
		};
  };
  for (i=0; i<bugs.length; i++) {
		for (i2=0; i2<bugs.length; i2++) {
			if (i2 != i && bugs[i].intersects(bugs[i2])) {
				print(bugs[i].speed+=0.3);
				print(bugs[i2].speed+=0.3);
				if (bugs[i].speed > maxSpeed) {
					bugs[i].speed = maxSpeed;
				}
				if (bugs[i2].speed > maxSpeed) {
					bugs[i2].speed = maxSpeed;
				}
			};
		};
		bugs[i].scale();
		bugs[i].move();
		bugs[i].display();
  };
};

// Jitter class
function Jitter() {
  this.x = random(width);
  this.y = random(height);
  this.winWidth = windowWidth;
  this.winHeight = windowHeight;
  this.diameter = random(10, maxDiameter);
  this.speed = random(1,5);

	this.intersects = function(bug) {
		if (dist(this.x, this.y, bug.x, bug.y) < this.diameter + bug.diameter) {
			return true;
		};
		return false;
	};
	
  this.scale = function() {
    xScale = (windowWidth/this.winWidth);
    yScale = (windowHeight/this.winHeight);
    this.x *= xScale;
    this.y *= yScale;
    this.winWidth = windowWidth;
    this.winHeight = windowHeight;
  };
  
  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
		if (this.x < 0) {
			this.x = 0;
		} else if (this.x > width) {
			this.x = width;
		};
		if (this.y < 0) {
			this.y = 0;
		} else if (this.y > height) {
			this.y = height;
		};
  };

  this.display = function() {
		push();
		color = colorSpeed(this.speed);
		fill(color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
		pop();
  }
};


function colorSpeed(speed) {
	speedScale = ((speed)/maxSpeed) + 0.2;
	if (speedScale > 1) {
		speedScale = 1;
	}
	return HSVtoRGB(speedScale, 1, 1);
};

function HSVtoRGB(h, s, v) {  // Stole this formula from Stackoverflow. I'm not *that* good... yet 
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    };
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
    };
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};