numTrees = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  trees = []
  for (var i =0; i<numTrees - 1; i++) {
    trees.push(new ellipseTree(random(width), random(height), floor(random(25)), [random(255), random(255), random(255)]));
  }
  trees.push(new ellipseTree(mouseX, mouseY, floor(random(25)), [random(255), random(255), random(255)]));
}

function draw() {
  print(trees)
  createCanvas(windowWidth, windowHeight);
  trees[2].setCoords(mouseX, mouseY);
  
  for (var i = 0; i < trees.length; i++) {
    trees[i].display();  
  }
  
}

ellipseTree = function(x, y, levels, treeColor) {
  this.x = x;
  this.y = y;
  this.levels = levels;
  this.treeColor = treeColor;
  
  this.setCoords = function(x, y) {
    this.x = x;
    this.y = y;
  }
  
  this.display = function() {
    for (var i =  0; i < this.levels; i++) {
      push();
      noStroke();
      ellipseMode(CENTER);
      fill(this.treeColor);
      ellipse(this.x, this.y + i*10, 10 + 10*i, 10);
      pop();
    }
  }
}