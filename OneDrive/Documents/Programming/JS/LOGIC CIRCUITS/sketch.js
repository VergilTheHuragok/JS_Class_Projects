// Use:
// Place logic gates on the screen and connect them with wires by dragging between nodes.
// Inputs are on the bottoms in blue. Outputs are on the tops in yellow
// Gates and wires change color in real time to depict their current value
// You can toggle true and false blocks with the toggle tool
// Output blocks are just for orginization if you want to use them
// The splitter duplicates a single input into two outputs
// You can add your own gates below.
// Also, feel free to go crazy with the config.

// Final Notes:
// I did not copy any code from the internet nor did I use inspiration for code from the internet.
// I got the idea for this project after reading about a basic text based version of this in python.
// 	That's found here: http://interactivepython.org/runestone/static/pythonds/Introduction/ObjectOrientedProgramminginPythonDefiningClasses.html#inheritance-logic-gates-and-circuits
// I have spent many hours on this. I spent at least 6 on it today alone. 
// 	I think I have rooted out all the bugs but I'm not certain.
// I protect from loops by just checking to make sure the code hasnt gotten stuck in a loop.
// 	Its a bit lazier than actually calculating loops but it works
// I also cleaned up the comments a bit.
// Also, a lot of my code is aweful. Good luck following it....
//		It's not exactly what you would call maintainable
// I think that's everything


// To add your own gate, place it at the end of the gateTypes list.
// Then set its number of inputs and outputs in the following lists
// Then set its logic in the getValue function
// You can give it's button a color if you want with the gateColors list
// Buttons are added automatically and scaled
// Then you are good to go
var gateTypes = ["wire", "toggle", "true", "false", "output", "splitter", "and", "or", "not", "xor", "nand", "nor", "xnor"]
var gateInputs = [0, 0, 0, 0, 1, 1, 2, 2, 1, 2, 2, 2, 2];
var gateOutputs = [0, 0, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1, 1];
var gateColors = []

function getValue(tInputs, gate) {
	switch (gate) {
		case "and":
			return  (tInputs[0] && tInputs [1]);
		case "or":
			return (tInputs[0] || tInputs[1]);
		case "not":
			return (!tInputs[0]);
		case "splitter":
			return (tInputs[0]);
		case "output":
			return (tInputs[0]);
		case "xor":
			return ((tInputs[0] || tInputs[1]) && (tInputs[0] != tInputs[1]));
		case "nand":
			return  !(tInputs[0] && tInputs [1]);
		case "nor":
			return  !(tInputs[0] || tInputs [1]);
		case "xnor":
			return !((tInputs[0] || tInputs[1]) && (tInputs[0] != tInputs[1]));
		// Add more cases here for new gates
		default:
			throw("Gate unknown:", gate);
			return true;
	}
}	

// Config:


var infiniteLoopBreak = 1000; // The number of iterations before being considered an infinite loop. 
//												 Probably shouldn't change unless you plan to use thousands of components
var attachDist = 30; // Distance wires latch to nodes from
var nodeSize = 5; // Size of gate connectors
var wireSize = 5; // Width of wires

var gateWidth = 60;
var gateHeight = 40;

var buttonWidth = 75;
var buttonHeight = 50;
var buttonColor = "#5e7191";
var buttonMinY = buttonHeight*2; // Sets the height of the button panel 

var boundarySize = attachDist*3;  // Deadzone where gates cannot be placed relative to other gates

var wordSize = buttonHeight/2.5; // Size of words relative to button size

var scaleFactor = 1.05; // Factor by which buttons scale on screen resize

var selected = gateTypes[2]; // Which gate is selected by default


// Do not change the following
var gates = []; 

var winWidth = null; 
var winHeight = null;  

var buttons = [];

var pressed = false;
var unpressed = false;

var clickX = null;
var clickY = null;


function setup() {
	winWidth = windowWidth;
	winHeight = windowHeight;
	start = true;
	resizeScreen(true);
}

function draw() {
	resizeScreen(false);
	drawButtons();
	checkButtons();
	start = false;
	place();
	drawGates();
	drawCursor();
	
	performLogic();
	
	pressed = false;
	unpressed = false;
	
}

function cleanValues() {
	for (var i = 0; i < gates.length; i++) {
		if (gates[i].gate == "wire") {
			gates[i].value = null;
			} else {
			if (gates[i].gate !== "true" && gates[i].gate !== "false") {
				gates[i].value = null;
			}
		}
	}
}

function performLogic() {
	
	cleanValues();
	
	var starts = [];
	for (var i = 0; i < gates.length; i++) {
		if (gates[i].gate == "true" || gates[i].gate == "false") {
			starts.push(i);
		}
	}
	
	loopInd = 0
	while (starts.length > 0) {
		if (loopInd == -1) {
			break;
		}
		gateInd = starts[0];
		cGate = gates[gateInd];
		while (true) {
			loopInd++;
			if (loopInd >= infiniteLoopBreak) {
				print("Loop detected, breaking");
				cleanConnections();
				loopInd = -1;
				break;
			}
			if (gateInd == -1) {
				break;
			}
			if (cGate.gate == "wire") { // wire
				cGate.value = gates[cGate.input].value;
				// Assign wire value and move on to next gate
				gateInd = cGate.output;
				cGate = gates[gateInd]; 
				} else {
				if (cGate.inputs.length > 0) { // Gate inputs
					var tInputs = [];
					for (var i = 0; i < cGate.inputs.length; i++) {
						// Check inputs
						if (cGate.inputs[i].c == -1) {
							tInputs = null;  // Found missing input
							break; 
							} else {
							tInputs.push(gates[cGate.inputs[i].c].value);
						}
					}
					if (tInputs !== null) {
						// All inputs accounted for
						cGate.value = getValue(tInputs, cGate.gate);
						// Assign value and move on to next gate
						if (cGate.outputs.length > 0) {
							if (cGate.outputs.length > 1) { // splitter
								for (var j = 1; j < cGate.outputs.length; j++) {
									starts.push(cGate.outputs[j].c); // Add remaining outputs to starts.
									// Store other outputs and move on to next gate
								}
							}
							gateInd = cGate.outputs[0].c;
							cGate = gates[gateInd];
							} else {
							// End of line
							break;
						}
						} else {
						// Missing input, go onto next start
						break;
					}
					} else if (cGate.outputs.length > 0) { // No inputs. Contains outputs
					if (cGate.outputs.length > 1) { // splitter
						for (var j = 1; j < cGate.outputs.length; j++) {
							starts.push(gates[cGate.outputs[j].c]); // Add remaining outputs to starts.
							// Store other outputs and move on to next gate
						}
					}
					gateInd = cGate.outputs[0].c;
					cGate = gates[gateInd];
				}
			}
		}
	 	starts.splice(0, 1);
	}
	
}

function drawCursor() {
	if (isWithinScreen(mouseX, mouseY)) {
		if (selected == "wire") {
			push()
			noFill()
			stroke("grey");
			strokeWeight(2);
			ellipse(mouseX, mouseY, attachDist);
			if (clickX !== null) {
				line(clickX, clickY, mouseX, mouseY)
				ellipse(clickX, clickY, attachDist);
			}
			pop()
		} else if (selected !== "toggle") {
			push();
			rectMode(CENTER);
			noFill();
			stroke("pink");
			strokeWeight(2);
			rect(mouseX, mouseY, gateWidth + boundarySize, gateHeight + boundarySize);
			stroke("grey");
			strokeWeight(2);
			rect(mouseX, mouseY, gateWidth, gateHeight);
			pop();
		}
	}
}

function mousePressed() {
	clickX = mouseX;
	clickY = mouseY;
	pressed = true;
}

function mouseReleased() {
	unpressed = true;
}

function resizeScreen(reset) {
	// Resizes screen and updates screen elements
	createCanvas(windowWidth, windowHeight);
	background(255);
	if (width != winWidth || height != winHeight || reset) {
		// Checks if screen has resized
		winWidth = width;
		winHeight = height;
		buttons = [];
		createButtons(gateTypes.slice(), 0, height - buttonMinY, width, height, 1, true);
	}
}

function place() {
	if (isWithinScreen(mouseX, mouseY)) {
		if (selected !== "toggle") {
			if (unpressed && selected == "wire" && isWithinScreen(clickX, clickY)) {
				// place wire
				gates.push(new Wire(clickX, clickY, mouseX, mouseY));
				clickX = null;
				clickY = null;
				var start = false;
				var end = false;
				for (var i = 0; i < gates.length; i++) {
					if (gates[i].gate != "wire") {
						var connect  = gates[gates.length - 1].attach(i);
						if (connect === null) {
							start = false;
							end = false;
							break;
						}
						if (connect.s) {
							start = true;
						}
						if (connect.e) {
							end = true;
						}
					}
				}
				if (!start || !end) {
					cleanConnections();
				}
				} else if (pressed && selected != "wire") {
				// place gate
				var canPlace = true;
				for (var i = 0; i < gates.length; i++) {
					if (mouseX >= gates[i].x - gateWidth - boundarySize/2 && mouseX <= gates[i].x + gateWidth + boundarySize/2) {
						if (mouseY >= gates[i].y - gateHeight - boundarySize/2 && mouseY <= gates[i].y + gateHeight + boundarySize/2) {
							canPlace = false;
							break;
						}
					}
				}
				if (canPlace) {
					gates.push(new LogicCircuit(mouseX, mouseY, selected));
				}
			}
		} else {
			if (pressed) {
				for (var i = 0; i < gates.length; i++) {
					if (mouseX >= gates[i].x - gateWidth/2 && mouseX <= gates[i].x + gateWidth/2) {
						if (mouseY >= gates[i].y - gateHeight/2 && mouseY <= gates[i].y + gateHeight/2) {
							if (gates[i].gate == "true") {
								gates[i].gate = "false";
								gates[i].value = false;
							} else if (gates[i].gate == "false") {
								gates[i].gate = "true";
								gates[i].value = true;
							}
							break;
						}
					}
				}
			}
		}
	}
}

function isWithinScreen(x, y) {
	if(y <= height - buttonMinY) {
		return true;
	}
	return false;
}

function getButtonXMargin(numButtons, xSpace, scale) {
	// Gets space between buttons given total width and number of buttons
	var totalButtonWidth = buttonWidth*scale*numButtons;
	return (xSpace-totalButtonWidth)/numButtons;
}

function getButtonLines(bList, xSpace, scale) {
	// Returns an array of arrays containing buttons fitted to screen
	// Checks if buttons too wide
	
	var lines = [];
	var toFit = bList.slice();
	var nextFit = [];
	while (true) {
		// Calculate size of line
		var numButtons = toFit.length;
		var margin = getButtonXMargin(numButtons, xSpace, scale);
		var totalButtonWidth = buttonWidth*scale*numButtons;
		if (margin < 1) {
			if (toFit.length <= 1) {
				//throw("Buttons too large for screen")
				return null;
			}
			// Remove last button from array and add to next line
			nextFit.push(toFit.splice(-1)[0]);
			} else {
			// Line of buttons fit
			
			lines.push(toFit);
			if (nextFit.length < 1) {
				// No more buttons
				break;      
				} else {
				// Still buttons left in nextFit
				toFit = nextFit.slice();
				nextFit = [];
				
			}
		}
	}
	return lines;
}

function createButtons(bList, minX, minY, maxX, maxY, scale, buttonsFromBottom) {
	// Creates button objects that fit to screen within boundaries
	
	// Get horizontal space
	var xSpace = (maxX - minX);
	if (xSpace < 1) {
		throw("MaxX should be larger than minX");
	}
	// Get lines
	var lines = getButtonLines(bList, xSpace, scale);
	if (lines === null) {
		createButtons(bList, minX, minY, maxX, maxY, scale/scaleFactor, buttonsFromBottom);
		return;
	}
	// Check if lines fit vertically
	var yMargin = ((maxY - minY)-(lines.length*buttonHeight*scale))/lines.length;
	if (yMargin < 1) {
		createButtons(bList, minX, minY, maxX, maxY, scale/scaleFactor, buttonsFromBottom);
		return;
	}
	
	// Get buttons from line
	for (var i=0; i<lines.length; i++) {
		var margin = getButtonXMargin(lines[i].length, xSpace, scale);
		for (var j=0; j<lines[i].length; j++) {
			if (buttonsFromBottom) {
				var bY = maxY - ((i+1)*buttonHeight*scale + i*yMargin) ;
				} else {
				var bY = minY + (i*buttonHeight*scale + i*yMargin);      
			}
			buttons.push(new Button(lines[i][j], j*buttonWidth*scale + j*margin + margin/2 + minX, bY, buttonWidth*scale, buttonHeight*scale, buttonColor));
		}
	}
}

function drawButtons() {
	// Renders buttons to the canvas
	
	for (var i=0; i<buttons.length; i++) {
		buttons[i].render();
	}
}
function drawGates() {
	// Renders gates to the canvas
	
	for (var i=0; i<gates.length; i++) {
		gates[i].render();
	}
}

function checkButtons() {
	// Checks if buttons are pressed and sets gate
	
	for (var i=0; i<buttons.length; i++) {
		if (buttons[i].isPressed()) {
			selected = buttons[i].getText();
			clickX = null;
			clickY = null;
		}
	}
}

function cleanConnections() {
	for (var i = 0; i < gates.length; i++) {
		if (gates[i].gate != "wire") {
			for (var j = 0; j < gates[i].outputs.length; j++) {
				if (gates[i].outputs[j].c == gates.length -1) {
					gates[i].outputs[j].c = -1;
				}
			}
			for (var j = 0; j < gates[i].inputs.length; j++) {
				if (gates[i].inputs[j].c == gates.length -1) {
					gates[i].inputs[j].c = -1;
				}
			}
		}
	}
	gates.splice(gates.length - 1, 1);
}

Button = function(_text, x, y, w, h, c) {
	this.t = _text;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.c = c;
	
	this.pc = "#555555";
	
	this.getText = function() {
		return this.t;
	}
	
	this.isPressed = function () {
		if (pressed) {
			if (mouseX >= this.x && mouseX <= this.x + this.w) {
				if (mouseY >= this.y && mouseY <= this.y + this.h) {
					return true;
				}
			}
		}
		return false;
	}
	
	this.render = function() {
		push();
		if (selected == this.t) {
			strokeWeight(3);
			fill(this.pc);
			} else {
			if (gateTypes.indexOf(this.t) < gateColors.length) {
				fill(gateColors[gateTypes.indexOf(this.t)]);
			} else {
				fill(this.c);
			}
		}
		rect(this.x, this.y, this.w, this.h);
		textAlign(CENTER);
		fill("black")
		textSize(wordSize);
		var tScale = 1;
		while (textWidth(this.t) > this.w) {
			tScale/=scaleFactor;
			textSize(wordSize*tScale);
		}
		strokeWeight(0);
		stroke(0);
		text(this.t, x + w/2, y + h/2 + buttonHeight/8);
		pop();
	}
}

Wire = function(x, y, x2, y2) {
	this.x = x;
	this.y = y;
	this.x2 = x2;
	this.y2 = y2;
	
	this.gate = "wire";
	this.output = -1;
	this.input = -1;
	
	this.value = null;
	
	this.startType = null;
	this.startEnd = null;
	
	
	this.setOutput = function(ind) {
		this.output = ind;
	}
	this.setInput = function(ind) {
		this.input = ind;
	}
	
	this.checkNode = function(point, gateIndex) {
		// inputs
		for (var i = 0; i < gates[gateIndex].inputs.length; i++) {
			if (dist(point.x, point.y, gates[gateIndex].inputs[i].x, gates[gateIndex].inputs[i].y) < attachDist) {
				if (gates[gateIndex].inputs[i].c == -1) {
					gates[gateIndex].setInput(i, gates.length - 1); // Set gate input to wire
					return {x: gates[gateIndex].inputs[i].x, y: gates[gateIndex].inputs[i].y, t: "input"};
				}
			}
		}
		
		// outputs
		for (var i = 0; i < gates[gateIndex].outputs.length; i++) {
			if (dist(point.x, point.y, gates[gateIndex].outputs[i].x, gates[gateIndex].outputs[i].y) < attachDist) {
				if (gates[gateIndex].outputs[i].c == -1) {
					gates[gateIndex].setOutput(i, gates.length - 1); // Set gate output to wire
					return {x: gates[gateIndex].outputs[i].x, y: gates[gateIndex].outputs[i].y, t: "output"};
				}
			}
		}
		
		return null;
	}
	
	this.attach = function(gateIndex) {
		var points1 = this.checkNode({x: this.x, y: this.y}, gateIndex);
		var points2 = this.checkNode({x: this.x2, y: this.y2}, gateIndex);
		
		
		var connects = {s: true, e: true};
		if (points1 === null) {
			connects.s = false;
			} else {
			this.startType = points1.t;
			gates[gates.length - 1].setInput(gateIndex); // Set wire input to gate
			this.x = points1.x;
			this.y = points1.y;
		}
		if (points2 === null) {
			connects.e = false;
			} else {
			this.endType = points2.t;
			gates[gates.length - 1].setOutput(gateIndex);  // Set wire output to gate
			this.x2 = points2.x;
			this.y2 = points2.y;
		}
		if (this.input == this.output && this.input !== -1) {
			return null;
		}
		if (this.startType == this.endType && this.startType !== null) {
			return null;
		}
		return connects;
	}
	
	this.render = function() {
		push();
		if (this.value !== null) {
			if (this.value) {
				stroke("green");
				} else {
				stroke("red")
			}
			} else {
			stroke("grey")
		}
		strokeWeight(wireSize);
		line(this.x, this.y, this.x2, this.y2);
		ellipseMode(CENTER);
		strokeCap(ROUND);
		ellipse(this.x, this.y, nodeSize);
		ellipse(this.x2, this.y2, nodeSize);
		pop();
	}
}

LogicCircuit = function(x, y, gate) {
	this.x = x;
	this.y = y;
	this.gate = gate;
	
	this.value = null;
	
	this.width = gateWidth;
	this.height = gateHeight;
	
	this.numInputs = gateInputs[gateTypes.indexOf(gate)];
	this.numOutputs = gateOutputs[gateTypes.indexOf(gate)];
	
	this.inputs = null;
	this.outputs = null;
	
	this.genNodes = function(out) {
		var nodeType = "inputs";
		var num = this.numInputs;
		if (out) {
			nodeType = "outputs";
			num = this.numOutputs;
		}
		var margin = this.width/num;
		if (margin < attachDist) {
			throw("Gate width too small for attaching to all " + nodeType);
		}
		var tNodes = [];
		for (var i = 0; i < num; i++) {
			if (out) {
				tNodes.push({x: i*margin + this.x - this.width/2 + margin/2, y: this.y - this.height/2, c: -1})
				} else {
				tNodes.push({x: i*margin + this.x - this.width/2 + margin/2, y: this.y + this.height - this.height/2,  c: -1})
			}
		}  
		return tNodes;
	}
	
	this.setOutput = function(node, ind) {
		this.outputs[node].c = ind;
	}
	this.setInput = function(node, ind) {
		this.inputs[node].c = ind;
	}
	
	this.render = function() {
		if (this.inputs === null || this.outputs === null) {
			this.inputs = this.genNodes(false);
			this.outputs = this.genNodes(true);
			if (this.gate == "true") {
				this.value = true;
			}
			if (this.gate == "false") {
				this.value = false;
			}
		}
		
		push();
		if (this.value !== null) {
			if (this.value) {
				fill("green");
				} else {
				fill("red")
			}
			} else {
			fill("grey")
		}
		rect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
		ellipseMode(CENTER);
		fill("blue");
		for(var i = 0; i < this.inputs.length; i++) {
			ellipse(this.inputs[i].x, this.inputs[i].y, nodeSize);
		}
		fill("yellow");
		for(var i = 0; i < this.outputs.length; i++) {
			ellipse(this.outputs[i].x, this.outputs[i].y, nodeSize);
		}
		textAlign(CENTER);
		fill("black");
		textSize(wordSize);
		var tScale = 1;
		while (textWidth(this.gate) > buttonWidth/2) {
			tScale/=scaleFactor;
			textSize(wordSize*tScale);
		}
		text(this.gate, x, y + buttonHeight/8); // Offset to center
		pop();
	}
}