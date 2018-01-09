function setup() {
  res = [400, 400]
  createCanvas(res[0], res[1])
  inc = 25
  ellipseMode(CENTER)
}

function draw() {
  background(255)
  for (x=0; x<=res[0]; x+=inc) {
    for (y=0;y<=res[1]; y+=inc) {
    xColor = (abs(res[0]-x)/res[0])
    yColor = (abs(res[1]-y)/res[1])
    cColor = HSVtoRGB(xColor, yColor, yColor)
    noStroke()
    fill(cColor.r, cColor.g, cColor.b)
    ellipse(x, y, inc, inc)    
    }
  }
  xColor = (abs(res[0]-mouseX)/res[0])
  yColor = (abs(res[1]-mouseY)/res[1])
  cColor = HSVtoRGB(xColor, yColor, yColor)
  stroke(0)
  fill(cColor.r, cColor.g, cColor.b)
  ellipse(mouseX, mouseY, inc, inc)
  
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