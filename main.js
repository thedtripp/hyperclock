/******************
WELCOME TO HYPERCLOCK
******************/
/******************
CLICK THE MOUSE ONCE
******************/

/******************
SETUP
******************/
//background
background(250, 245, 250);

//Set initial state
var initialize = -1;
/******************
CONSTRUCTOR FUNCTION FOR CLOCK
******************/
//this constructor function will be used repeatedly to create clocks and store them in an array. The draw function will draw the clocks created by this function on the screen.
var Clock = function(positionX, positionY, radius, thetaHour, thetaMinute) {
    //"Theta" is a greek letter. It is often used in math to denote a certain angle.
    this.positionX = positionX;
    this.positionY = positionY;
    this.radius = radius;
    this.thetaHour = thetaHour;
    this.thetaMinute = thetaMinute;
};

/******************
DRAW CLOCK FUNCTION DRAWS A SINGLE CLOCK
******************/
var drawClock = function(Clock) {
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
fill(245, 245, 245);
strokeWeight(1);
stroke(0, 0, 0);
noStroke();
ellipse(Clock.positionX, Clock.positionY, Clock.radius, Clock.radius);

//hour hand
stroke(170);
stroke(0);
strokeWeight(5);
line(Clock.positionX, Clock.positionY, Clock.positionX - (handX2 * handLengthShort) , Clock.positionY - (handY2 * handLengthShort));

//minute hand
stroke(0);
strokeWeight(5);
line(Clock.positionX, Clock.positionY, Clock.positionX - (handX * handLength) , Clock.positionY - (handY * handLength));


/*
//disgnostic hands
//to determine which point the hands are focusing on (if any).
//they create an interesting visual effect, as well.
var handLengthLong = Clock.radius * 20;
strokeWeight(0.9);
stroke(250, 0, 0);
line(Clock.positionX, Clock.positionY, Clock.positionX - (handX * handLengthLong) , Clock.positionY - (handY * handLengthLong));
stroke(58, 250, 10);
line(Clock.positionX, Clock.positionY, Clock.positionX - (handX2 * handLengthLong) , Clock.positionY - (handY2 * handLengthLong));
*/
};

/******************
CREATE CLOCK OBJECT INSTANCES AND STORE IN 3D ARRAY
******************/
//creates object with constructor function in a loop.
    //variable scalingFactor adjusts the size and spacing of the clocks
    var scalingFactor = 30;
    //creates an array of clocks called digitsX. This will be a multidimensional array of clock objects.
    var digitsX = [];
    //outer loop, loops digits in the x direction
    //this is a sub array of digitsX
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

/******************
CALL DRAW CLOCK FUNCTION AND SPIN HANDS
******************/

var drawSpin = function() {
    background(100, 30, 250);
    text("drawSpin function called", 10, 30);
    for (var h = 0; h < 4; h ++) {
        for (var i = 0; i < 6; i ++) {
            for (var j = 0; j < 3; j ++) {
            //draw every clock in the 3D array
            drawClock(digitsX[h][i][j]);
            //move the hands of every clock inthe 3D array
            digitsX[h][i][j].thetaMinute+= (h + 1) * (i + 1) * j +1      ;
            digitsX[h][i][j].thetaHour  += ((h + 1) * (i + 1) * j +1  )/12    ;
            }
        }  
    }

};

/******************
DECLARE VARIABLES
******************/
//variable "t" is used to set hand positions in the display of actual time. It is a coefficient.
var t;
//period goes inside the trigomonetric function. allows for oscillation of the central point used in the animation function.
var period = 0;

//these variables are coefficients. They are used in the transitions.
var decay = 1;
//var decay2 = sq(decay);
var accum; //accumulation
accum = 1 - decay;
//model equation y = ((1/2)^(2/3))*(x - (1/2))^(1/3) + (1/2)
var accum3;
var decay3;
/******************
THE ANIMATION FUNCTION
******************/
//animation: make clock hands follow a point
    //find the center of the clock and place it in an object called clock center
    //this variable is essential for the animation function.
    //added clockCenter.xFixed and clockCenter.yFixed. These are to remain constant. I probably should have use "let" instead of "var".
    var clockCenter = {
    xFixed: (digitsX[1][2][2].positionX+digitsX[2][3][0].positionX)/2,
    yFixed: (digitsX[1][2][2].positionY+digitsX[2][3][0].positionY)/2,
    x: (digitsX[1][2][2].positionX+digitsX[2][3][0].positionX)/2,
    y: (digitsX[1][2][2].positionY+digitsX[2][3][0].positionY)/2
    };
    //println(clockCenter.x + ", " + clockCenter.y);
    
    
var c; //current state; decay
var d; //new state; accum
    
var drawAnimation = function() {
    
    
    
    background(0, 0, 0);
    //set the angle for all clocks by looping through the arrays
for (var h = 0; h < 4; h ++) {
    for (var i = 0; i < 6; i ++) {
        for (var j = 0; j < 3; j ++) {
                drawClock(digitsX[h][i][j]);
                //rewite these in terms of clockCenter and scaleFactor, not with hard coded numbers
                clockCenter.x = 196 + (190 * sin(1.00 * period));
                clockCenter.y = 195 + (90 * cos(1.00 * period));
                clockCenter.y = clockCenter.yFixed;
                //clockCenter.x = clockCenter.xFixed;
                
                //you may want to allow the hands to track mouse movement. Uncomment the next two lines to accomplish this. I may write a function for this later.
                //clockCenter.x = mouseX;
                //clockCenter.y = mouseY;
                
                

                //set hands to track variable clockCenter.x and clockCenter.y.

                    //this above equation can be manipulated. you can change the constant or the cooefficient. explore different values for these.
                    /*

//implement lerp
//lerp(num1, num2, amout);
digitsX[h][i][j].thetaHour = lerp(digitsX[h][i][j].thetaHour, (90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y))))), 0.1);

if ((digitsX[h][i][j].positionX < clockCenter.xFixed && digitsX[h][i][j].positionY > clockCenter.yFixed) || (digitsX[h][i][j].positionX > clockCenter.xFixed && digitsX[h][i][j].positionY < clockCenter.yFixed)) {

*/
/*
                // some of the clocks needed to have their angles reversed. This if statement takes care of that.
if ((digitsX[h][i][j].positionX < clockCenter.xFixed && digitsX[h][i][j].positionY > clockCenter.yFixed) || (digitsX[h][i][j].positionX > clockCenter.xFixed && digitsX[h][i][j].positionY < clockCenter.yFixed)) {
    digitsX[h][i][j].thetaHour =                            1 * (digitsX[h][i][j].thetaHour *(1-accum3) + accum3 * (90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y))))) );
}

else {
    //ellipse(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, 20, 20);
    digitsX[h][i][j].thetaHour =                            1 * (digitsX[h][i][j].thetaHour * (1-accum3) + accum3 * (90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y))))) );
}
*/

c = digitsX[h][i][j].thetaHour * decay3;
d = accum3 * (
90 + -1 * ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y)))));

/*
90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y))))
*/



if ((digitsX[h][i][j].positionX < clockCenter.x && digitsX[h][i][j].positionY < clockCenter.y) || (digitsX[h][i][j].positionX > clockCenter.x && digitsX[h][i][j].positionY > clockCenter.y)) {
    fill(255, 0, 0);
    noStroke();
    //ellipse(digitsX[h][i][j].positionX,digitsX[h][i][j].positionY    ,10,10);
    digitsX[h][i][j].thetaHour = (c + d) ;
}
else {digitsX[h][i][j].thetaHour = c - d ;}

    //set hour hand to opposite of minute hand
    digitsX[h][i][j].thetaMinute = digitsX[h][i][j].thetaHour +       180;


//set hour hand to opposite of minute hand
digitsX[h][i][j].thetaMinute = digitsX[h][i][j].thetaHour - 180;
                
        }
    }
}
//end nested for loops which set angle of clock hands.
            
//period goes inside the trigomonetric function. allows for oscillation of the central point used in the animation function.
period ++;

//decay of previous state
//decays counts down to 0 and stops once at zero
if (decay > 0) {decay -= 0.0025;}
else {decay = 0;}
//decays is used to set the minute hand equal to the hour hand (opposite)

//accumulation of new state
//accum counts up from zero and stops at one. 
if (accum <= 1) {
    accum = 1 - decay;
    decay3 = 1 - accum3;
}

//model equation y = ((1/2)^(2/3)) * (x - (1/2))^(1/3) + (1/2)
    //function 0 -> 1 slow -> fast -> slow.
    //absolute value required to make power function work with        negative number in this case.
    var coef = pow((1/2), (2/3)); 
    //function was not working as predicted so, I have to go          piecewise
    //this if statement dictates the behavior of variable accum3
    if (accum < 0.5) {
        accum3 = -1 * (coef * (pow((abs(accum - (1/2))), (1/3))))         + 0.5;
    }
    else {
        accum3 = 1 * (coef * (pow((abs(accum - (1/2))), (1/3)))) +         0.5;
    }


//this ellipse shows the moving focal point followed by the clock hands. May be commented out.
noFill();
strokeWeight(2);
stroke(255, 0, 0);
//ellipse(clockCenter.x , clockCenter.y - 0 , 20, 20);
fill(250, 250, 250);
};
//end animation function
//println(clockCenter.xFixed);
//println(clockCenter.yFixed);
/******************
THE TRANSITION FUNCTION
******************/
var x;
var y;

var drawTransition = function() {

    //background(0, 0, 0);
    //set the angle for all clocks by looping through the arrays
for (var h = 0; h < 4; h ++) {
    for (var i = 0; i < 6; i ++) {
        for (var j = 0; j < 3; j ++) {
                drawClock(digitsX[h][i][j]);
                clockCenter.x = 196 + (290 * sin(1.00 * period));
                clockCenter.y = 195 + (90 * cos(1.00 * period));
                //clockCenter.y = 0;
                
                //you may want to allow the hands to track mouse movement. Uncomment the next two lines to accomplish this. I may write a function for this later.
                //clockCenter.x = mouseX;
                //clockCenter.y = mouseY;
                
                /*

                //set hands to track variable clockCenter.x and clockCenter.y.
                digitsX[h][i][j].thetaHour = 90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y))));
                    //this above equation can be manipulated. you can change the constant or the cooefficient. explore different values for these.

                // some of the clocks needed to have their angles reversed. This if statement takes care of that.
if ((digitsX[h][i][j].positionX < clockCenter.x && digitsX[h][i][j].positionY > clockCenter.y) || (digitsX[h][i][j].positionX > clockCenter.x && digitsX[h][i][j].positionY < clockCenter.y)) {
    digitsX[h][i][j].thetaHour = -1 * (digitsX[h][i][j].thetaHour);
                    }
*/

var spacer; //this variable does nothing.



//set hands to track fixed or variable clockCenter.x and clockCenter.y.
//accum

/*
//variable center
x = (90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y))))) * accum3;
*/
//fixed center
x = (90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.yFixed,  clockCenter.xFixed, clockCenter.yFixed) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.xFixed, clockCenter.yFixed))))) * accum3;

//decay
//y = digitsX[h][i][j].thetaHour * 1 * sqrt(decay);
y = digitsX[h][i][j].thetaHour * 1 * (1-accum3);
//(1-accum3) is basically what decay3 would be had I made the function

if ((digitsX[h][i][j].positionX < clockCenter.xFixed && digitsX[h][i][j].positionY > clockCenter.yFixed) || (digitsX[h][i][j].positionX > clockCenter.xFixed && digitsX[h][i][j].positionY < clockCenter.yFixed)) {
/*fill(255, 0, 0);
    noStroke();
    //ellipse(digitsX[h][i][j].positionX,digitsX[h][i][j].positionY,5,5);
    //noFill();
    */
    digitsX[h][i][j].thetaHour = y - x;
    digitsX[h][i][j].thetaMinute = decay* decay * digitsX[h][i][j].thetaMinute + accum * (digitsX[h][i][j].thetaHour + (180 * accum3)); 
}
else { 
/*
    fill(13, 255, 0);
    noStroke();
    //ellipse(digitsX[h][i][j].positionX,digitsX[h][i][j].positionY,5,5);
    //noFill();
    */
    digitsX[h][i][j].thetaHour = y + x;
    digitsX[h][i][j].thetaMinute = decay* decay * digitsX[h][i][j].thetaMinute + accum * (digitsX[h][i][j].thetaHour - (180 * accum3)); 
}

/*
if (digitsX[h][i][j].thetaHour > 0) {
digitsX[h][i][j].thetaHour -= 5;
}
else if (digitsX[h][i][j].thetaHour <= 0) {
    //digitsX[h][i][j].thetaMinute = 0;
    digitsX[h][i][j].thetaHour = 0;
    }
    */
/*
digitsX[h][i][j].thetaHour = accum * (90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y))))) * 1;
*/
/*
(accum * ((decay * (digitsX[h][i][j].thetaHour)) + (accum * (90 - ((1 * acos (dist (digitsX[h][i][j].positionX, clockCenter.y,  clockCenter.x, clockCenter.y) / dist(digitsX[h][i][j].positionX, digitsX[h][i][j].positionY, clockCenter.x, clockCenter.y)))))))) - 0 * digitsX[h][i][j].thetaHour * decay;
*/


// some of the clocks needed to have their angles reversed. This if statement takes care of that.
//essenital for continuity
//use if statement to set thetaHour so it only gets set once.

/*
if ((digitsX[h][i][j].positionX < clockCenter.x && digitsX[h][i][j].positionY > clockCenter.y) || (digitsX[h][i][j].positionX > clockCenter.x && digitsX[h][i][j].positionY < clockCenter.y)) {digitsX[h][i][j].thetaHour = -1 * (digitsX[h][i][j].thetaHour);}

*/
/*
//set hour hand to opposite of minute hand
//add if statement to decide if to add or subtract (clockwise or counter clockwise)
digitsX[h][i][j].thetaMinute = decay* decay * digitsX[h][i][j].thetaMinute + accum * (digitsX[h][i][j].thetaHour - (180 * sqrt(accum))); 
*/
        }
    }
}
//end nested for loops which set angle of clock hands.
            
//period goes inside the trigomonetric function. allows for oscillation of the central point used in the animation function.
period ++;

//decay of previous state
//decays counts down to 0 and stops once at zero
if (decay > 0) {decay -= 0.01;}
else {decay = 0;}
//decays is used to set the minute hand equal to the hour hand (opposite)

//accumulation of new state
//accum counts up from zero and stops at one. 
if (accum < 1) {
    accum = 1 - decay;
    decay3 = 1 - accum3;
}

//model equation y = ((1/2)^(2/3)) * (x - (1/2))^(1/3) + (1/2)
    //function 0 -> 1 slow -> fast -> slow.
    //absolute value required to make power function work with        negative number in this case.
    var coef = pow((1/2), (2/3)); 
    //function was not working as predicted so, I have to go          piecewise
    //this if statement dictates the behavior of variable accum3
    if (accum < 0.5) {
accum3 = -1 * (coef * (pow((abs(accum - (1/2))), (1/3)))) + 0.5;
}
    else {accum3 = 1 * (coef * (pow((abs(accum - (1/2))), (1/3)))) + 0.5;
}
    //text("accum3: " + accum3, 135, 90);

//println(decay);

//this ellipse shows the moving focal point followed by the clock hands. May be commented out.
noFill();
strokeWeight(2);
stroke(255, 0, 0);
//ellipse(clockCenter.x , clockCenter.y - 0 , 20, 20);
fill(250, 250, 250);


};
//end transition function


/******************
THE DRAW FUNCTION
******************/
var draw = function() {
    background(5, 5, 5);    
    period ++;
/******************
GET CURRENT TIME AND SEPARATE SINGLE DIGITS INTO VARIABLES
******************/
//get the first digit of the minute
    var actualMinute = minute();
    //println(actualMinute);
    var strippedMinute = actualMinute;
    while (strippedMinute % 10 !== 0) {strippedMinute -= 1;}
    var firstDigitMinute = strippedMinute / 10;
    //println(firstDigitMinute);
//get the second digit of the minute
    var secondDigitMinute = actualMinute - strippedMinute;
    //println(secondDigitMinute);
//get the first digit of the hour
    var actualHour = hour();
    //println(actualHour);
    var strippedHour = actualHour;
    while (strippedHour % 10 !== 0) {strippedHour -= 1;}
    var firstDigitHour = strippedHour / 10;
    //println(firstDigitHour);
//get the second digit of the minute
    var secondDigitHour = actualHour - strippedHour;
    //println(secondDigitHour);
//variables of interest are firstDigitHour, secondDigitHour, firstDigitMinute, secondDigitMinute.

    var time = [];

//store actual time as digits in an array called "time"
    time[0] = firstDigitHour;
    time[1] = secondDigitHour;
    time[2] = firstDigitMinute;
    time[3] = secondDigitMinute;
//println(time);

/******************
DIGITAL DISPLAY OF TIME ON THE HYPERCLOCK
******************/
//this function is responsible for displaying the current time. Code includes programming of clock hands to display the numbers.
var currentTime = function(hr1, hr2, mn1, mn2) {
    
var drawZero = function(index) {
    var t = 45;
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
    var t = 45;
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
    var t = 45;
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
    var t = 45;
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
    var t = 45;
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
    var t = 45;
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
    var t = 45;
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
    var t = 45;
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
    var t = 45;
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
    var t = 45;
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

        //first digit
        for (var i = 0; i < 6; i ++) {
            for (var j = 0; j < 3; j ++) {
                drawClock(digitsX[0][i][j]);
            }
        }
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
        for (var i = 0; i < 6; i ++) {
            for (var j = 0; j < 3; j ++) {
                drawClock(digitsX[1][i][j]);
            }
        }   
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
        for (var i = 0; i < 6; i ++) {
            for (var j = 0; j < 3; j ++) {
                drawClock(digitsX[2][i][j]);
            }
        }   
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
        for (var i = 0; i < 6; i ++) {
            for (var j = 0; j < 3; j ++) {
                drawClock(digitsX[3][i][j]);
            }
        }   
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
    
//digital display of current time. May be commented out.
textSize(30);
text(firstDigitHour + "" + secondDigitHour + ":" + firstDigitMinute + "" + secondDigitMinute + ":" + second(), 20, 30);
//println(time);

//Calling the function to display the current time on the hyperclock. It takes single digits of current time as arguments.
//currentTime(time[0], time[1], time[2], time[3]);

/******************
HYPERCLOCK LOGIC
******************/
/*
if (second() >= 50) {
drawAnimation();
}

if (mouseIsPressed) {
drawAnimation();
}

if (false) {
drawSpin();
}

else {
currentTime(time[0], time[1], time[2], time[3]);
}
*/

//var empty;

//currentTime(time[0], time[1], time[2], time[3]);
//drawAnimation();
//drawSpin();

/******************
HYPERCLOCK DIAGNOSTIC LOGIC
******************/

/*
if (second() >= 50  && !mouseIsPressed) {
drawAnimation();
}

*/
/*
if (false) {
drawTransition();
}

if (false) {
currentTime(time[0], time[1], time[2], time[3]);
}

if (false) {
drawAnimation();
}

if (false) {
//drawTransition();
}
*/

if (initialize === -1) {
currentTime(time[0], time[1], time[2], time[3]);
decay = 1;
decay3 = 1;
accum = 0;
accum3 = 0;
}

if (initialize === 0) {
drawTransition();
}
if (initialize === 0 && decay === 0 && !mouseIsPressed) {
    decay = 1;
    decay3 = 1;
    accum = 0;
    accum3 = 0;
    
    initialize = 1;
}


if (initialize === 1 && decay !== 0 ) {
drawAnimation();
}

if (initialize === 1 && decay === 0) {
initialize = 2;
}

if (initialize === 2) {
drawAnimation();
}

//print variables on screen
fill(245, 235, 235);
textSize(15);
text("decay: " + decay, 145, 30);
text("accum: " + accum, 145, 45);
text("decay ^ 3: " + decay3, 145, 60);
text("accum ^ 3: " + accum3, 145, 75);
text("initialize: " + initialize, 145, 90);
};

//Changes state of clock on mouse click
mouseClicked = function() {
    if (initialize === 0) { initialize = -1;}
    else if (initialize === 1) { initialize = -1;}
    else if (initialize === 2) { initialize = -1;}
    else if (initialize !== 0) { initialize = 0;}
};
//end draw loop
/******************
END HYPERCLOCK PROGRAM
******************/




