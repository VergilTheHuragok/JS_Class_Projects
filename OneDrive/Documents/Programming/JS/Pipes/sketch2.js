function setup() {
        
        res = [windowWidth,windowHeight]
        createCanvas(res[0], res[1])
        background(250);
        x=0
        y=0
        inc=10
        toPoint = [floor(random(res[0])),floor(random(res[1]))]
        cColor =  [floor(random(256)),floor(random(256)),floor(random(256))]
        back = 0
}


function draw() {
        toX = false
        toY = false
        if (x<toPoint[0] - inc){
                x+=inc
        } else if (x>toPoint[0] + inc) {
                x-=inc
        } else {
                toX = true
        }
        if (y<toPoint[1] - inc){
                y+=inc
        } else if (y>toPoint[1] + inc) {
                y-=inc
        } else {
                toY = true
        }
        if (toX && toY){
                toPoint = [floor(random(res[0])),floor(random(res[1]))]
                cColor =  [floor(random(256)),floor(random(256)),floor(random(256))]
        }
        noStroke()
        fill(cColor)
        ellipse(x,y,50,50);
}