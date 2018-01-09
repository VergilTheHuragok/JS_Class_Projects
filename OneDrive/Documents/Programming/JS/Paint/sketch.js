function setup() {
  res = [150, 150]
  createCanvas(700, 700)
  inc = 10
  ellipseMode(CENTER)
  verts = []
  shapes = []
  colors = []
  click = false
  shaping = false
}

function draw() {
  background(0)
  
  for (i=0;i<shapes.length;i++) {
    fill(colors[i][0], colors[i][1], colors[i][2])
    beginShape()
    for (i2=0;i2<shapes[i].length;i2++) {
      vertex(shapes[i][i2][0], shapes[i][i2][1])
    }
    endShape(CLOSE)
  }
  
  fill(200,200,200)
  rect(0,0,res[0] + inc,res[1] + inc,inc,inc)
  for (x=inc; x<=res[0]; x+=inc) {
    for (y=inc;y<=res[1]; y+=inc) {
    xColor = (abs(res[0]-x)/res[0])
    yColor = (abs(res[1]-y)/res[1])
    cColor = HSVtoRGB(xColor, yColor, yColor)
    noStroke()
    fill(cColor.r, cColor.g, cColor.b)
    ellipse(x, y, inc, inc)    
    }
  }
  
  
  if(mouseX <= res[0] && mouseY <= res[1]) {
    xColor = (abs(res[0]-mouseX)/res[0])
    yColor = (abs(res[1]-mouseY)/res[1])
    cColor = HSVtoRGB(xColor, yColor, yColor)
    cColor = [cColor.r, cColor.g, cColor.b]
  } else {
	if (colors.length < 1) {
    cColor = [255,255,255]
	} else {
	cColor = colors[colors.length - 1]
	}
  }
  
  stroke(0)
  fill(cColor[0], cColor[1], cColor[2])
  ellipse(mouseX, mouseY, inc, inc)
  
  
  
  if (mouseIsPressed || click) {
    if (mouseX>res[0] || mouseY>res[1]) {
    click = true
    if (mouseButton == LEFT){
		if (!shaping) {
			shaping = true
			verts.push([mouseX, mouseY]);
		} else {
			verts.push([mouseX, mouseY])
		}
	} 
	
	
  } else if (mouseIsPressed && !click){
    if (mouseButton == LEFT){
      print("Chose color")
      click = true
      xColor = (abs(res[0]-mouseX)/res[0])
      yColor = (abs(res[1]-mouseY)/res[1])
      cColor = HSVtoRGB(xColor, yColor, yColor)
      cColor = [cColor.r, cColor.g, cColor.b]
      colors.push(cColor)
    }
  }
  }
}

function mouseReleased() {
  
  click=false
  
  if (shaping) {
			shaping = false
			verts.push([mouseX, mouseY])
			shapes.push(verts)
			if (colors.length < shapes.length) {
				if (colors.length < 1) {
					colors.push([255,255,255])
					} else {
					colors.push(colors[colors.length -1])
					}
			}
			verts = []
		}
  
}


function HSVtoRGB(h, s, v) {
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
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}