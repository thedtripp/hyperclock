/****************** WELCOME TO HYPERCLOCK
******************/
/****************** SETUP
******************/
function setup() { 
	createCanvas(800, 600);
}
var transparency = 100; //for fading transition
/****************** THE DRAW FUNCTION
******************/
var draw = function() {
	background(transparency,transparency,transparency);
	//background(75, 75, 75);
	/******************
	FUNCTION CALLS
	******************/
	//getTime();	
	//drawAnimation();
	
	strokeWeight(4);
	stroke(255, 255, 255);
	every10seconds();
	timeText(transparency);
	
};
/****************** END DRAW LOOP
******************/

/****************** CONSTRUCTOR FUNCTION FOR CLOCK
//this constructor function will be used repeatedly to create clocks and store them in an array. The draw function will draw the clocks created by this function on the screen.
******************/
var Clock = function(positionX, positionY, radius, thetaHour, thetaMinute) {
    //"Theta" is a greek letter. It is often used in math to denote a certain angle.
    this.positionX = positionX;
    this.positionY = positionY;
    this.radius = radius;
    this.thetaHour = thetaHour;
    this.thetaMinute = thetaMinute;
};
/****************** DRAW CLOCK FUNCTION DRAWS A SINGLE CLOCK
******************/
var drawClock = function(Clock, transparency) {
//these variables control properties of the clock and clock hands such as clock size, hand length and angle.
//long hand
var theta = Clock.thetaMinute;
var handX = sin(theta);
var handY = cos(theta);
var handLength = Clock.radius * 0.50;
//short hand
var theta2 = Clock.thetaHour;
var handX2 = sin(theta2);
var handY2 = cos(theta2);
var handLengthShort = Clock.radius * 0.50;

//clock face
strokeWeight(1);
stroke(0, 0, 0);
noStroke();
ellipse(Clock.positionX, Clock.positionY, Clock.radius, Clock.radius);
//hour hand
stroke(255,0,0);
//stroke(13, 13, 13);
stroke(transparency, transparency, transparency);
//stroke(100,100,100);
strokeWeight(5);
line(Clock.positionX, Clock.positionY, Clock.positionX - (handX2 * handLengthShort) , Clock.positionY - (handY2 * handLengthShort));

//minute hand
//stroke(13, 13, 13);
strokeWeight(5);
line(Clock.positionX, Clock.positionY, Clock.positionX - (handX * handLength) , Clock.positionY - (handY * handLength));

//light show
//handLinesOn(Clock.positionX, Clock.positionY, handX, handY, handX2, handY2, Clock.radius);

};
/****************** CREATE CLOCK OBJECT INSTANCES AND STORE IN 3D ARRAY
******************/
if (true) { //useless if statement to allow minimize code.
	//declare digitsX outside of the function. This will be a multidimensional array of clock objects.
	//creates object with constructor function in a loop.
	//variable scalingFactor adjusts the radius and spacing of the clocks.
	var scalingFactor = 30;
	//creates an array of clocks called digitsX
	var digitsX = [];
	//outer loop, loops digits in the x direction
	//this is a sub array of digitsX called digitsX[h]
	for (var h = 0; h < 4; h ++) {
		digitsX[h] = [];
	//middle loop, loops through the array displaying clocks in the Y direction
		for (var i = 0; i < 6; i ++) {
			digitsX[h][i] = [];
	//inner loop, X direction
			for (var j = 0; j < 3; j ++) {
			digitsX[h][i][j] = [];
	//digitsX[h][i][j] = new Clock(distance from margin + j * spacing, distance from margin + i * spacing, size of clock));
			digitsX[h][i][j] = new Clock((
				15 + j * scalingFactor * 1.06 + h * scalingFactor * 3.3), (115 + i * scalingFactor * 1.06), scalingFactor, 90, 0);
			//drawClock(digitsX[h][i][j]);
			}
		}
	}
var t; //variable "t" is used to set hand positions in the display of actual time. It is a coefficient.
var period = 0; //period goes inside the trigomonetric function. allows for oscillation of the central point used in the animation function.
}
/****************** GET CURRENT TIME AND SEPARATE SINGLE DIGITS INTO VARIABLES
******************/
var getTime = function() {
//get the first digit of the minute
	var actualMinute = minute();
	var strippedMinute = actualMinute;
	while (strippedMinute % 10 !== 0) {strippedMinute -= 1;}
	var firstDigitMinute = strippedMinute / 10;
	//get the second digit of the minute
	var secondDigitMinute = actualMinute - strippedMinute;
	//get the first digit of the hour
	var actualHour = hour();
	var strippedHour = actualHour;
	while (strippedHour % 10 !== 0) {strippedHour -= 1;}
	var firstDigitHour = strippedHour / 10;
	//get the second digit of the minute
	var secondDigitHour = actualHour - strippedHour;
	//variables of interest are firstDigitHour, secondDigitHour, firstDigitMinute, secondDigitMinute.
	var time = [];

	//store actual time as digits in an array called "time"
	time[0] = firstDigitHour;
	time[1] = secondDigitHour;
	time[2] = firstDigitMinute;
	time[3] = secondDigitMinute;

	//digital display of current time. May be commented out.
	//textSize(30);
	//stroke(255);
	
	//format seconds	
	//var s = ('0' + second().toString()).slice(-2);
	//text(firstDigitHour + "" + secondDigitHour + ":" + firstDigitMinute + "" + //secondDigitMinute + ":" + s, 20, 30);
	
/****************** DIGITAL DISPLAY OF TIME ON THE HYPERCLOCK
//this function is responsible for displaying the current time. Code includes programming of clock hands to display the numbers.
******************/

var currentTime = function(hr1, hr2, mn1, mn2) {
    
	var drawZero = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		digitsX[index][1][0].thetaHour =    4*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		digitsX[index][1][1].thetaHour =    4*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		digitsX[index][1][2].thetaHour =    4*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		digitsX[index][2][0].thetaHour =    4*t;
		digitsX[index][2][0].thetaMinute =  0*t;
		digitsX[index][2][1].thetaHour =    4*t;
		digitsX[index][2][1].thetaMinute =  0*t;
		digitsX[index][2][2].thetaHour =    4*t;
		digitsX[index][2][2].thetaMinute =  0*t;
		digitsX[index][3][0].thetaHour =    4*t;
		digitsX[index][3][0].thetaMinute =  0*t;
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  0*t;
		digitsX[index][3][2].thetaHour =    4*t;
		digitsX[index][3][2].thetaMinute =  0*t;
		digitsX[index][4][0].thetaHour =    4*t;
		digitsX[index][4][0].thetaMinute =  0*t;
		digitsX[index][4][1].thetaHour =    0*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		digitsX[index][4][2].thetaHour =    4*t;
		digitsX[index][4][2].thetaMinute =  0*t;
		digitsX[index][5][0].thetaHour =    0*t;
		digitsX[index][5][0].thetaMinute =  6*t;
		digitsX[index][5][1].thetaHour =    2*t;
		digitsX[index][5][1].thetaMinute =  6*t;
		digitsX[index][5][2].thetaHour =    0*t;
		digitsX[index][5][2].thetaMinute =  2*t;
	};

	var drawOne = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		digitsX[index][1][0].thetaHour =    6*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    2*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		
		digitsX[index][1][2].thetaHour =    4*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		digitsX[index][2][0].thetaHour =    2*t;
		digitsX[index][2][0].thetaMinute =  2*t;
		
		digitsX[index][2][1].thetaHour =    4*t;
		digitsX[index][2][1].thetaMinute =  0*t;
		
		digitsX[index][2][2].thetaHour =    4*t;
		digitsX[index][2][2].thetaMinute =  0*t;
		
		digitsX[index][3][0].thetaHour =    2*t;
		digitsX[index][3][0].thetaMinute =  2*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  0*t;
		
		digitsX[index][3][2].thetaHour =    4*t;
		digitsX[index][3][2].thetaMinute =  0*t;
		
		digitsX[index][4][0].thetaHour =    2*t;
		digitsX[index][4][0].thetaMinute =  2*t;
		
		digitsX[index][4][1].thetaHour =    4*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    4*t;
		digitsX[index][4][2].thetaMinute =  0*t;
		
		digitsX[index][5][0].thetaHour =    2*t;
		digitsX[index][5][0].thetaMinute =  2*t;
		
		digitsX[index][5][1].thetaHour =    6*t;
		digitsX[index][5][1].thetaMinute =  0*t;
		
		digitsX[index][5][2].thetaHour =    2*t;
		digitsX[index][5][2].thetaMinute =  0*t;
	};

	var drawTwo = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		digitsX[index][1][0].thetaHour =    6*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    2*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		
		digitsX[index][1][2].thetaHour =    4*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		digitsX[index][2][0].thetaHour =    6*t;
		digitsX[index][2][0].thetaMinute =  4*t;
		
		digitsX[index][2][1].thetaHour =    2*t;
		digitsX[index][2][1].thetaMinute =  0*t;
		
		digitsX[index][2][2].thetaHour =    4*t;
		digitsX[index][2][2].thetaMinute =  0*t;
		
		digitsX[index][3][0].thetaHour =    4*t;
		digitsX[index][3][0].thetaMinute =  0*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  6*t;
		
		digitsX[index][3][2].thetaHour =    2*t;
		digitsX[index][3][2].thetaMinute =  0*t;
		
		digitsX[index][4][0].thetaHour =    4*t;
		digitsX[index][4][0].thetaMinute =  0*t;
		
		digitsX[index][4][1].thetaHour =    6*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    2*t;
		digitsX[index][4][2].thetaMinute =  4*t;
		
		digitsX[index][5][0].thetaHour =    6*t;
		digitsX[index][5][0].thetaMinute =  0*t;
		
		digitsX[index][5][1].thetaHour =    6*t;
		digitsX[index][5][1].thetaMinute =  2*t;
		
		digitsX[index][5][2].thetaHour =    2*t;
		digitsX[index][5][2].thetaMinute =  0*t;
	};

	var drawThree = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		
		digitsX[index][1][0].thetaHour =    6*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    2*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		
		digitsX[index][1][2].thetaHour =    4*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		
		digitsX[index][2][0].thetaHour =    6*t;
		digitsX[index][2][0].thetaMinute =  4*t;
		
		digitsX[index][2][1].thetaHour =    0*t;
		digitsX[index][2][1].thetaMinute =  2*t;
		
		digitsX[index][2][2].thetaHour =    4*t;
		digitsX[index][2][2].thetaMinute =  0*t;
		
		
		digitsX[index][3][0].thetaHour =    6*t;
		digitsX[index][3][0].thetaMinute =  0*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  2*t;
		
		digitsX[index][3][2].thetaHour =    4*t;
		digitsX[index][3][2].thetaMinute =  0*t;
		
		
		digitsX[index][4][0].thetaHour =    6*t;
		digitsX[index][4][0].thetaMinute =  4*t;
		
		digitsX[index][4][1].thetaHour =    2*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    4*t;
		digitsX[index][4][2].thetaMinute =  0*t;
		
		
		digitsX[index][5][0].thetaHour =    6*t;
		digitsX[index][5][0].thetaMinute =  0*t;
		
		digitsX[index][5][1].thetaHour =    2*t;
		digitsX[index][5][1].thetaMinute =  6*t;
		
		digitsX[index][5][2].thetaHour =    2*t;
		digitsX[index][5][2].thetaMinute =  0*t;
		};

	var drawFour = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    4*t;
		digitsX[index][0][1].thetaMinute =  4*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		
		digitsX[index][1][0].thetaHour =    4*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    4*t;
		digitsX[index][1][1].thetaMinute =  0*t;
		
		digitsX[index][1][2].thetaHour =    4*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		
		digitsX[index][2][0].thetaHour =    4*t;
		digitsX[index][2][0].thetaMinute =  0*t;
		
		digitsX[index][2][1].thetaHour =    0*t;
		digitsX[index][2][1].thetaMinute =  0*t;
		
		digitsX[index][2][2].thetaHour =    4*t;
		digitsX[index][2][2].thetaMinute =  0*t;
		
		
		digitsX[index][3][0].thetaHour =    6*t;
		digitsX[index][3][0].thetaMinute =  0*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  2*t;
		
		digitsX[index][3][2].thetaHour =    4*t;
		digitsX[index][3][2].thetaMinute =  0*t;
		
		
		digitsX[index][4][0].thetaHour =    2*t;
		digitsX[index][4][0].thetaMinute =  2*t;
		
		digitsX[index][4][1].thetaHour =    4*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    4*t;
		digitsX[index][4][2].thetaMinute =  0*t;
		
		
		digitsX[index][5][0].thetaHour =    2*t;
		digitsX[index][5][0].thetaMinute =  2*t;
		
		digitsX[index][5][1].thetaHour =    6*t;
		digitsX[index][5][1].thetaMinute =  0*t;
		
		digitsX[index][5][2].thetaHour =    2*t;
		digitsX[index][5][2].thetaMinute =  0*t;
	};

	var drawFive = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		
		digitsX[index][1][0].thetaHour =    4*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    6*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		
		digitsX[index][1][2].thetaHour =    2*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		
		digitsX[index][2][0].thetaHour =    4*t;
		digitsX[index][2][0].thetaMinute =  0*t;
		
		digitsX[index][2][1].thetaHour =    6*t;
		digitsX[index][2][1].thetaMinute =  0*t;
		
		digitsX[index][2][2].thetaHour =    2*t;
		digitsX[index][2][2].thetaMinute =  4*t;
		
		
		digitsX[index][3][0].thetaHour =    6*t;
		digitsX[index][3][0].thetaMinute =  0*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  2*t;
		
		digitsX[index][3][2].thetaHour =    4*t;
		digitsX[index][3][2].thetaMinute =  0*t;
		
		
		digitsX[index][4][0].thetaHour =    6*t;
		digitsX[index][4][0].thetaMinute =  4*t;
		
		digitsX[index][4][1].thetaHour =    2*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    4*t;
		digitsX[index][4][2].thetaMinute =  0*t;
		
		
		digitsX[index][5][0].thetaHour =    6*t;
		digitsX[index][5][0].thetaMinute =  0*t;
		
		digitsX[index][5][1].thetaHour =    2*t;
		digitsX[index][5][1].thetaMinute =  6*t;
		
		digitsX[index][5][2].thetaHour =    2*t;
		digitsX[index][5][2].thetaMinute =  0*t;
		};

	var drawSix = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		
		digitsX[index][1][0].thetaHour =    4*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    6*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		
		digitsX[index][1][2].thetaHour =    2*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		
		digitsX[index][2][0].thetaHour =    4*t;
		digitsX[index][2][0].thetaMinute =  0*t;
		
		digitsX[index][2][1].thetaHour =    6*t;
		digitsX[index][2][1].thetaMinute =  0*t;
		
		digitsX[index][2][2].thetaHour =    2*t;
		digitsX[index][2][2].thetaMinute =  4*t;
		
		
		digitsX[index][3][0].thetaHour =    4*t;
		digitsX[index][3][0].thetaMinute =  0*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  4*t;
		
		digitsX[index][3][2].thetaHour =    4*t;
		digitsX[index][3][2].thetaMinute =  0*t;
		
		
		digitsX[index][4][0].thetaHour =    4*t;
		digitsX[index][4][0].thetaMinute =  0*t;
		
		digitsX[index][4][1].thetaHour =    0*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    4*t;
		digitsX[index][4][2].thetaMinute =  0*t;
		
		
		digitsX[index][5][0].thetaHour =    6*t;
		digitsX[index][5][0].thetaMinute =  0*t;
		
		digitsX[index][5][1].thetaHour =    2*t;
		digitsX[index][5][1].thetaMinute =  6*t;
		
		digitsX[index][5][2].thetaHour =    2*t;
		digitsX[index][5][2].thetaMinute =  0*t;
	};

	var drawSeven = function(index) {
		var t = PI/4;
		//var index = 0;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		
		digitsX[index][1][0].thetaHour =    6*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    2*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		
		digitsX[index][1][2].thetaHour =    4*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		
		digitsX[index][2][0].thetaHour =    2*t;
		digitsX[index][2][0].thetaMinute =  2*t;
		
		digitsX[index][2][1].thetaHour =    0*t;
		digitsX[index][2][1].thetaMinute =  3*t;
		
		digitsX[index][2][2].thetaHour =    0*t;
		digitsX[index][2][2].thetaMinute =  3*t;
		
		
		digitsX[index][3][0].thetaHour =    4*t;
		digitsX[index][3][0].thetaMinute =  7*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  7*t;
		
		digitsX[index][3][2].thetaHour =    6*t;
		digitsX[index][3][2].thetaMinute =  6*t;
		
		
		digitsX[index][4][0].thetaHour =    4*t;
		digitsX[index][4][0].thetaMinute =  0*t;
		
		digitsX[index][4][1].thetaHour =    4*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    6*t;
		digitsX[index][4][2].thetaMinute =  6*t;
		
		
		digitsX[index][5][0].thetaHour =    6*t;
		digitsX[index][5][0].thetaMinute =  0*t;
		
		digitsX[index][5][1].thetaHour =    2*t;
		digitsX[index][5][1].thetaMinute =  0*t;
		
		digitsX[index][5][2].thetaHour =    6*t;
		digitsX[index][5][2].thetaMinute =  6*t;
	};

	var drawEight = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		
		digitsX[index][1][0].thetaHour =    4*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    4*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		
		digitsX[index][1][2].thetaHour =    4*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		
		digitsX[index][2][0].thetaHour =    5*t;
		digitsX[index][2][0].thetaMinute =  0*t;
		
		digitsX[index][2][1].thetaHour =    0*t;
		digitsX[index][2][1].thetaMinute =  0*t;
		
		digitsX[index][2][2].thetaHour =    3*t;
		digitsX[index][2][2].thetaMinute =  0*t;
		
		
		digitsX[index][3][0].thetaHour =    4*t;
		digitsX[index][3][0].thetaMinute =  7*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  4*t;
		
		digitsX[index][3][2].thetaHour =    4*t;
		digitsX[index][3][2].thetaMinute =  1*t;
		
		
		digitsX[index][4][0].thetaHour =    4*t;
		digitsX[index][4][0].thetaMinute =  0*t;
		
		digitsX[index][4][1].thetaHour =    0*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    4*t;
		digitsX[index][4][2].thetaMinute =  0*t;
		
		
		digitsX[index][5][0].thetaHour =    6*t;
		digitsX[index][5][0].thetaMinute =  0*t;
		
		digitsX[index][5][1].thetaHour =    2*t;
		digitsX[index][5][1].thetaMinute =  6*t;
		
		digitsX[index][5][2].thetaHour =    2*t;
		digitsX[index][5][2].thetaMinute =  0*t;
		};

	var drawNine = function(index) {
		var t = PI/4;
		digitsX[index][0][0].thetaHour =    4*t;
		digitsX[index][0][0].thetaMinute =  6*t;
		
		digitsX[index][0][1].thetaHour =    2*t;
		digitsX[index][0][1].thetaMinute =  6*t;
		
		digitsX[index][0][2].thetaHour =    2*t;
		digitsX[index][0][2].thetaMinute =  4*t;
		
		
		digitsX[index][1][0].thetaHour =    4*t;
		digitsX[index][1][0].thetaMinute =  0*t;
		
		digitsX[index][1][1].thetaHour =    4*t;
		digitsX[index][1][1].thetaMinute =  4*t;
		
		digitsX[index][1][2].thetaHour =    4*t;
		digitsX[index][1][2].thetaMinute =  0*t;
		
		
		digitsX[index][2][0].thetaHour =    4*t;
		digitsX[index][2][0].thetaMinute =  0*t;
		
		digitsX[index][2][1].thetaHour =    0*t;
		digitsX[index][2][1].thetaMinute =  0*t;
		
		digitsX[index][2][2].thetaHour =    4*t;
		digitsX[index][2][2].thetaMinute =  0*t;
		
		
		digitsX[index][3][0].thetaHour =    6*t;
		digitsX[index][3][0].thetaMinute =  0*t;
		
		digitsX[index][3][1].thetaHour =    4*t;
		digitsX[index][3][1].thetaMinute =  2*t;
		
		digitsX[index][3][2].thetaHour =    4*t;
		digitsX[index][3][2].thetaMinute =  0*t;
		
		
		digitsX[index][4][0].thetaHour =    6*t;
		digitsX[index][4][0].thetaMinute =  4*t;
		
		digitsX[index][4][1].thetaHour =    2*t;
		digitsX[index][4][1].thetaMinute =  0*t;
		
		digitsX[index][4][2].thetaHour =    4*t;
		digitsX[index][4][2].thetaMinute =  0*t;
		
		
		digitsX[index][5][0].thetaHour =    6*t;
		digitsX[index][5][0].thetaMinute =  0*t;
		
		digitsX[index][5][1].thetaHour =    2*t;
		digitsX[index][5][1].thetaMinute =  6*t;
		
		digitsX[index][5][2].thetaHour =    2*t;
		digitsX[index][5][2].thetaMinute =  0*t;
	};

        //digits
        for (var i = 0; i < 6; i ++) {
            for (var j = 0; j < 3; j ++) {
                drawClock(digitsX[0][i][j], transparency);
				drawClock(digitsX[1][i][j], transparency);
				drawClock(digitsX[2][i][j], transparency);
				drawClock(digitsX[3][i][j], transparency);
            }
        }
		
		//first digit
        if (hr1 === 0) {drawZero(0);}
        else if (hr1 === 1) {drawOne(0);}
        else if (hr1 === 2) {drawTwo(0);}
        else if (hr1 === 3) {drawThree(0);}
        else if (hr1 === 4) {drawFour(0);}
        else if (hr1 === 5) {drawFive(0);}
        else if (hr1 === 6) {drawSix(0);}
        else if (hr1 === 7) {drawSeven(0);}
        else if (hr1 === 8) {drawEight(0);}
        else if (hr1 === 9) {drawNine(0);}
        
        //second digit
        if (hr2 === 0) {drawZero(1);}
        else if (hr2 === 1) {drawOne(1);}
        else if (hr2 === 2) {drawTwo(1);}
        else if (hr2 === 3) {drawThree(1);}
        else if (hr2 === 4) {drawFour(1);}
        else if (hr2 === 5) {drawFive(1);}
        else if (hr2 === 6) {drawSix(1);}
        else if (hr2 === 7) {drawSeven(1);}
        else if (hr2 === 8) {drawEight(1);}
        else if (hr2 === 9) {drawNine(1);}
    
        //third digit
        if (mn1 === 0) {drawZero(2);}
        else if (mn1 === 1) {drawOne(2);}
        else if (mn1 === 2) {drawTwo(2);}
        else if (mn1 === 3) {drawThree(2);}
        else if (mn1 === 4) {drawFour(2);}
        else if (mn1 === 5) {drawFive(2);}
        else if (mn1 === 6) {drawSix(2);}
        else if (mn1 === 7) {drawSeven(2);}
        else if (mn1 === 8) {drawEight(2);}
        else if (mn1 === 9) {drawNine(2);}
        
        //fourth digit
        if (mn2 === 0) {drawZero(3);}
        else if (mn2 === 1) {drawOne(3);}
        else if (mn2 === 2) {drawTwo(3);}
        else if (mn2 === 3) {drawThree(3);}
        else if (mn2 === 4) {drawFour(3);}
        else if (mn2 === 5) {drawFive(3);}
        else if (mn2 === 6) {drawSix(3);}
        else if (mn2 === 7) {drawSeven(3);}
        else if (mn2 === 8) {drawEight(3);}
        else if (mn2 === 9) {drawNine(3);}
//end currentTime
};
//Calling the function to display the current time on the hyperclock. It takes single digits of current time as arguments.
currentTime(time[0], time[1], time[2], time[3]);
}
/****************** THE ANIMATION FUNCTION
//animation: make clock hands follow a point
//find the center of the clock and place it in an object called clock center
//this variable is essential for the animation function.
******************/
var clockCenter = {
//calculater the coordinates of the center of the clock grid.
x: (digitsX[1][2][2].positionX+digitsX[2][3][0].positionX)/2,
y: (digitsX[1][2][2].positionY+digitsX[2][3][0].positionY)/2
};
var drawAnimation = function() {
    
//set the angle for all clocks by looping through the arrays
for (var h = 0; h < 4; h ++) {
    for (var i = 0; i < 6; i ++) {
        for (var j = 0; j < 3; j ++) {
			drawClock(digitsX[h][i][j], transparency);

			
			everyMinute();
			//motionPattern1();
			//motionPattern2();	//circular
			//motionPattern3();	//infinity sign
			//motionPattern4();	//yo-yo (hoizontal)
			//motionPattern5();	//yo-yo (vertical)
			//trackMouseMovement();
			//bball();			//bouncing ball
			
			//set hands to track variable clockCenter.x and clockCenter.y.
			digitsX[h][i][j].thetaHour = (PI / 2) - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y))));
			//this above equation can be manipulated. you can change the constant or the cooefficient. explore different values for these.

			// some of the clocks needed to have their angles reversed. This if statement takes care of that.
			if ((digitsX[h][i][j].positionX < clockCenter.x && digitsX[h][i][j].positionY > clockCenter.y) || (digitsX[h][i][j].positionX > clockCenter.x && digitsX[h][i][j].positionY < clockCenter.y)) {
				digitsX[h][i][j].thetaHour = -1 * (digitsX[h][i][j].thetaHour);
			}
			//set hour hand to opposite of minute hand
			digitsX[h][i][j].thetaMinute = digitsX[h][i][j].thetaHour + PI;
        }
    }
}
//end nested for loops which set angle of clock hands.
            
//period goes inside the trigomonetric function. allows for oscillation of the central point used in the animation function.
period = period + 0.05;

//drawRedCircle();
//end animation function
};
var drawRedCircle = function() {
	//this ellipse shows the moving focal point followed by the clock hands. May be commented out.
	noFill();
	strokeWeight(2);
	stroke(255, 0, 0);
	ellipse(clockCenter.x , clockCenter.y - 0 , 20, 20);
	fill(250, 250, 250);
}
var handLinesOn = function(ClockpositionX, ClockpositionY, handX, handY, handX2, handY2, Clockradius) {
	var handLengthLong = Clockradius * 40;
	strokeWeight(0.8);
	stroke(250, 255, 0);
	line(ClockpositionX, ClockpositionY, ClockpositionX - (handX * handLengthLong) , ClockpositionY - (handY * handLengthLong));
	stroke(58, 250, 210);
	line(ClockpositionX, ClockpositionY, ClockpositionX - (handX2 * handLengthLong) , ClockpositionY - (handY2 * handLengthLong));
}

var sizingForPatterns = scalingFactor * 6.533;

var trackMouseMovement = function() {
	clockCenter.x = mouseX;
	clockCenter.y = mouseY;
}
var motionPattern1 = function() {
	clockCenter.x = 196 + (290 * sin(3.00 * period));
	clockCenter.y = 195 + (90 * cos(1.60 * period));
	//clockCenter.y = 200;
}
var motionPattern2 = function() { //circular
	clockCenter.x = sizingForPatterns + (180 * sin(3.00 * period));
	clockCenter.y = sizingForPatterns + (90 * cos(3.00 * period));
}
var motionPattern3 = function() { //infinity sign
	clockCenter.x = 196 + (180 * sin(PI/4 + 1.00 * period));
	clockCenter.y = 195 + (90 * cos(2.00 * period));
}
var motionPattern4 = function() { //yo-yo (hoizontal)
	clockCenter.x = 196 + (180 * sin(1.00 * period));
	clockCenter.y = 195;
}
var motionPattern5 = function() { //yo-yo (vertical)
	clockCenter.x = 196;
	clockCenter.y = 195 + (90 * cos(2.00 * period));
}

var ball = { //properties of ball
	x: 300,
	y: 90,
	xspeed: 0.06,
	yspeed: 0,
	acceleration: 0.0001
}
var bball = function() { //bouncing ball
	//display
	stroke(255);
	strokeWeight(4);
	noFill();
	//ellipse(ball.x, ball.y, 24, 24);
	fill(255)
	
	//move
	ball.x = ball.x + ball.xspeed;
	ball.y = ball.y + ball.yspeed;
	
	//bounce
	if (ball.x > 500 || ball.x < 0) {
		ball.xspeed = ball.xspeed * -1;
	}
	if (ball.y > 350 || ball.y < 0) {
		ball.yspeed = ball.yspeed * -1 -ball.acceleration;
	}
	
	//freefall
	ball.yspeed = ball.yspeed + ball.acceleration;
	
	//motion tracking
	clockCenter.x = ball.x;
	clockCenter.y = ball.y;
}
var fade = function() {
	//current seconds and milliseconds
	var d = new Date();
	var ms = d.getMilliseconds();
	//var msf = ('0' + ms.toString()).slice(-3);
	//var sec = d.getSeconds();
	//var msf = pow(10, 3);
	//text(sec + ':' + msf, 5, 440);
	
	//text(transparency, 5, 440);
	//transparency = (-0.25 * (pow((ms - 500), 2)) / (500 * 500 /255) ) + 255;
	transparency = (-1 * (pow((ms - 1000), 2)) / (1000 * 1000 / 255 )) + 255;
	//transparency = -1 * abs(ms -500) + 255;
}
var appear = function() {
	//current seconds and milliseconds
	var d = new Date();
	var ms = d.getMilliseconds();
	//var msf = ('0' + ms.toString()).slice(-3);
	//var sec = d.getSeconds();
	//var msf = pow(10, 3);
	//text(sec + ':' + msf, 5, 440);
transparency = (-1 * (pow(ms, 2)) / (1000 * 1000 / 255 )) + 255;	//transparency = -1 * abs(ms -500) + 255;
}
var every10seconds = function() {
	var d = new Date();
	var s = d.getSeconds();
	var secMod10 = s % 10;
	
	if (secMod10 == 0 || secMod10 == 1 || secMod10 == 2 || secMod10 == 3) {
		getTime();
	} else if (secMod10 == 4 ) {
		fade();
		getTime();
	} else if (secMod10 == 5 ) {
		appear();
		drawAnimation();
	} else if (secMod10 == 6 || secMod10 == 7) {
		drawAnimation();
		handLinesOn();
	} else if (secMod10 == 8) {
		fade();
		drawAnimation();
	} else if (secMod10 == 9) {
		appear();
		getTime();
	}
}
var everyMinute = function() {
	var d = new Date();
	var s = d.getSeconds();
	var actualSeconds = s;
	var strippedSeconds = actualSeconds;
	while (strippedSeconds % 10 !== 0) {strippedSeconds -= 1;}
	var firstDigitSecond = strippedSeconds / 10;
	
	if (firstDigitSecond == 0) {motionPattern1();}
	else if (firstDigitSecond == 1) {motionPattern2();}
	else if (firstDigitSecond == 2) {motionPattern3();}
	else if (firstDigitSecond == 3) {motionPattern4();}
	else if (firstDigitSecond == 4) {motionPattern5();}
	else if (firstDigitSecond == 5) {bball();}
	
}

var timeText = function(transparency) {
	//digital display of current time. May be commented out.
	textSize(30);
	stroke(transparency);
	
	//format seconds	
	var h = ('0' + hour().toString()).slice(-2);
	var m = ('0' + minute().toString()).slice(-2);
	var s = ('0' + second().toString()).slice(-2);
	text(h + ":" + m + ":" + s, 20, 30);
}
