function setup() {
	seed = prompt("Enter a Seed. (Leave Blank for Random)")
	seed = seed.toLowerCase()//Case-sensitivity is annoying.
	if (seed != "") {
		tSeed = ""
		for (i=0;i<seed.length;i++) {
			tSeed += seed.charCodeAt(i)
		}
		randomSeed(parseInt(tSeed))
	} else {
		seed = randomString()
		seed = seed.toLowerCase()
		tSeed = ""
		for (i=0;i<seed.length;i++) {
			tSeed += seed.charCodeAt(i)
		}
		randomSeed(parseInt(tSeed))
	}
	//noStroke()
	createCanvas(1024, 768) //You should be able to choose whatever size
	background(250)
	
	//General Features
	radius = floor(random(2, 10))
	
	//Body
	bodyWidth = floor(random(50,500))
	bodyHeight = floor(random(50, 500))
	bodyColor = [random(1), random(.5,1), random(.5,1)]
  
  nameColor = HSVColoring(bodyColor)
	
	//Tail
	tail = (floor(random(0,2))===1)
	if (tail) {
		tailNum = floor(random(0, 5))
		tailLength = floor(random(5, width/2-bodyWidth/2))
		tailHeight = floor(random(2, ((bodyHeight/4)/(tailNum))/2))
		tailColor = HSVColoring(bodyColor)
	}
	//Head
	headWidth = floor(random(bodyWidth/3, bodyWidth))
	headHeight = floor(random(bodyHeight/3, bodyHeight/2))
	headRadius = floor(random(10, 100))
	headColor = HSVColoring(bodyColor)
	
	//Eyes
	eyeNum = floor(random(1, 5))
	eyeWidth = (floor(random(2, (headWidth/eyeNum)/2)))
	eyeColor = HSVColoring(headColor)
	
	//Ears
	earNum = floor(random(0, 4))
	earWidth = (floor(random(2, (headWidth/(eyeNum + 1))/2)))
	earHeight = (floor(random(headHeight/4, height/2 - bodyHeight/2 - headHeight/4)))
	earColor = HSVColoring(headColor)
	
	//Mouth
	mouth = (floor(random(0,2))===1)
	if (mouth) {
		mouthWidth = floor(random(2, headWidth))
		mouthHeight = floor(random(2, headHeight/2))
		mouthColor = HSVColoring(headColor)
	}
	
	//Legs
	legNum = floor(random(1, 10))
	legWidth = floor(random(5, (bodyWidth/legNum)/2))
	legLength = floor(random(bodyHeight/4, bodyHeight/4 + min((height - bodyHeight)/2, height/2)))
	legColor = HSVColoring(bodyColor)
	
	//Feet
	footWidth = floor(random(2, (bodyWidth/legNum)))
	footHeight = floor(random(2, (bodyHeight/4)))
	//footColor = HSVColoring(legColor)
	

}

function HSVColoring(deviation){
	h = (random(-(1-deviation[0]), 1-deviation[0])/random(3, 4))
	s = (random(-(1-deviation[1]), 1-deviation[1])/random(1, 4))
	v = (random(-(1-deviation[2]), 1-deviation[2])/random(1, 4))
	bColor = [deviation[0] + h, deviation[1] + s, deviation[2] + v]
	return bColor
}

function draw() {
	//Tails
	if (tail) {
		rectMode(CORNER)
		fill(HSVtoRGB(tailColor[0], tailColor[1], tailColor[2]))
		for (i=0;i<=tailNum;i++){
			rect((width/2 - bodyWidth/2) - tailLength + bodyWidth/8, height/2 - bodyHeight/2 + ((i*((bodyHeight/4)/(tailNum))) - tailHeight/2) + tailHeight + (bodyHeight/4), tailLength, tailHeight, radius) 
		}
	}

	//Body
	rectMode(CENTER)
	fill(HSVtoRGB(bodyColor[0], bodyColor[1], bodyColor[2]))
	rect(width/2, height/2, bodyWidth, bodyHeight, radius)
	
	//Ears
	rectMode(CORNER)
	fill(HSVtoRGB(earColor[0], earColor[1], earColor[2]))
	for (i=0;i<=earNum;i++){
		rect((width/2 + bodyWidth/2 - headWidth/2) + ((i*(headWidth/earNum)) - earWidth/2), height/2 - bodyHeight/2 - headHeight/4 - earHeight, earWidth, earHeight, radius) 
	}
	if (earNum > 0){
		rect(((width/2 + bodyWidth/2 - headWidth/2) - earWidth/2) - earWidth/4, height/2 - bodyHeight/2 - headHeight/4 - earHeight/4, headWidth + earWidth + (earWidth/2), earHeight/4, 100) 
	}
	//Head
	rectMode(CENTER)
	fill(HSVtoRGB(headColor[0], headColor[1], headColor[2]))
	rect(width/2 + bodyWidth/2, height/2 - bodyHeight/2, headWidth, headHeight, headRadius)
	
	//Eyes
	rectMode(CORNER)
	fill(HSVtoRGB(eyeColor[0], eyeColor[1], eyeColor[2]))
	for (i=0;i<=eyeNum;i++){
		rect((width/2 + bodyWidth/2 - headWidth/2) + ((i*(headWidth/eyeNum)) - eyeWidth/2), height/2 - bodyHeight/2 - headHeight/6, eyeWidth, eyeWidth, 100) 
	}
		
	//Mouth
	if (mouth) {
		fill(HSVtoRGB(mouthColor[0], mouthColor[1], mouthColor[2]))
		rect(width/2 + bodyWidth/2, height/2 - bodyHeight/2, mouthWidth, mouthHeight, headRadius)
	}
	//Legs
	fill(HSVtoRGB(legColor[0], legColor[1], legColor[2]))
	for (i=0;i<=legNum;i++){
		rect((width/2 - bodyWidth/2) + ((i*(bodyWidth/legNum)) - legWidth/2), height/2 + (bodyHeight/4), legWidth, legLength, radius) 
	}
	
	//Feet
	for (i=0; i<=legNum; i++) {
		fill(HSVtoRGB(legColor[0], legColor[1], legColor[2]))
		rectMode(CORNER)
		rect((width/2 - bodyWidth/2) + ((i*(bodyWidth/legNum)) - legWidth/4), height/2 + (bodyHeight/4) + (legLength-footHeight), footWidth, footHeight, radius)
	}

	//Name
	strokeWeight(3)
	textAlign(CENTER,CENTER)
	textSize(40)
  fill(HSVtoRGB(nameColor[0], nameColor[1], nameColor[2]))
	text(seed, width/2, height-40)
	strokeWeight(1)
	
}

//Made this earlier for fun because I was bored. Copied it into this program. I have a *much* more advanced name generator I made a couple years ago in Lua. Using a simple one like this feels like cheating now.
function randomString() {
	rlen = floor(random(2,10))
	rstring = ""
	rvow=false
	for (i=0;i<rlen;i++) {
		rvow=!rvow
		if (!rvow) {
  switch(floor(random(20) + 1)) {
    case 1:
      rchar='b'
      break
    case 2:
      rchar='c'
      break
    case 3:
      rchar='d'
      break
    case 4:
      rchar='f'
      break
    case 5:
      rchar='g'
      break
		case 6:
			rchar='h'
			break
		case 7:
			rchar='j'
			break
		case 8:
			rchar='k'
			break
		case 9:
			rchar='l'
			break
		case 10:
			rchar='m'
			break
		case 11:
			rchar='n'
			break
		case 12:
			rchar='p'
			break
		case 13:
    	rchar='qu'
			break
		case 14:
			rchar='r'
			break
		case 15:
			rchar='s'
			break
		case 16:
			rchar='t'
			break
		case 17:
			rchar='v'
			break
		case 18:
			rchar='w'
			break
		case 19:
			rchar='x'
			break
		case 20:
			rchar='z'
			break
  }
		} else {
			switch(floor(random(6) + 1)) {
				case 1:
					rchar='a'
					break
				case 2:
					rchar='e'
					break
				case 3:
					rchar='i'
					break
				case 4:
					rchar='o'
					break
				case 5:
					rchar='u'
					break
				case 6:
					rchar='y'
					break
													 }
		}
		
		if (rstring.length<1){
		rchar=rchar.toUpperCase()
		}
		
		rstring+=rchar
		
	}
	
  return rstring
}

//Using HSV because it allows for easy creation of shades rather than changing r, g, and b separately.
function HSVtoRGB(h, s, v) {//Stole this formula from the internet. I'm not *that* good. 
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