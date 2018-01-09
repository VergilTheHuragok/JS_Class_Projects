function setup() {
	createCanvas(400,400)
	frameRate(10)
}

function draw() {
	background(0)
	noStroke()
	fill(255)
	textAlign(CENTER,CENTER)
	text(randomString(),width/2,height/2)
}


function randomString() {
	rlen = floor(random(5))
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