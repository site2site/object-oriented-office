/*

PROJECT: Object Oriented Office (OOO)
SCRIPT: ooo_chair.js
VERSION: 0.02
FUNCTION: Operating code, via the Johhny-Five framework,
  for collecting data from embedded sensors in an office
  chair, and determining whether the chair is occupied and
  how it is oriented.
SENSORS: FSR (force-sensitive resistor), Magnetometer (compass)
HARDWARE: Arduino Uno R3

ISSUES:
  (0) 2+ FSRs Produce Reading Drift -> Buffered Reading (see 1)
  (1) Determine Threshold Values for each FSR (tweak for setting)
  (2) Working Magnetometer

FSR LOCATIONS:
  (0) Chair Seat
  (1) Chair Back

WIRING DIAGRAM:
  https://raw.github.com/site2site/object-oriented-office/master/docs/images/ooo_office_v0-2.png

*/


var five = require("johnny-five"),
    board, fsr1, fsr2, mag;
    //led;

//array of output buffers
var buffers = [];
//array of sensors
var fsrs = [];
//array of thresholds values
var thresholds = [];
//length of buffer array
var MAX_BUFFER_LENGTH = 5;

//function for grabbing minimum value from buffer array
function getMin( buf ){
  var rtn = buf[0];
  //check if buffer value is lower than current min / ifso log as min
  for(var i = 1; i < buf.length; i++){
    rtn = Math.min( rtn, buf[i] );
  }
  return rtn;
}

//function for grabbing maximum value from buffer array
function getMax( buf ){
  var rtn = buf[0];
  //check if buffer value is higher than current max / ifso log as max
  for(var i = 1; i < buf.length; i++){
    rtn = Math.max( rtn, buf[i] );
  }
  return rtn;
}

//function for determining occupancy through thresholds
function occupied( fsr_index, value ){
  //if buffer is full, push out last value (first in first out)
  if(buffers[ fsr_index ].length > MAX_BUFFER_LENGTH){
    buffers[ fsr_index ].shift();
  }
  //add current value to buffer
  buffers[ fsr_index ].push( value );

  //grab minimum value
  var min;
  if(buffers[ fsr_index ].length > 0){
    min = getMin( buffers[ fsr_index ] );
  }else{
    min = value;
  }

  //grab maximum value
  var max;
  if(buffers[ fsr_index ].length > 0){
    max = getMax( buffers[ fsr_index ] );
  }else{
    max = value;
  }

  //determine value range
  var delta = max - min;
  
  //console.log(delta);

  //check if value range is within occupancy threshold
  if(delta > thresholds[ fsr_index ]){
    return true;
  }else{
    return false;
  }
}


(new five.Board()).on("ready", function() {

  //FSR 00
  fsrs[0] = new five.Sensor({
    pin: "A0",
    freq: 100
  });

  buffers[0] = [];
  thresholds[0] = 70;

  fsrs[0].scale([ 0, 100 ]).on("data",function(){
    //console.log("seat_left: " + this.value);
    var oc = occupied( 0, this.value );
    if(oc == true){
      console.log( 'occupied fsr 0' );
    }    
  });



  //FSR 01
  fsrs[1] = new five.Sensor({
    pin: "A1",
    freq: 100
  });

  buffers[1] = [];
  thresholds[1] = 80;
  
  fsrs[1].scale([ 0, 100 ]).on("data",function(){
    //console.log("seat_left: " + this.value);
    var oc = occupied( 1, this.value );
    if(oc == true){
      console.log( 'occupied fsr 1' );
    }
  });
  
  /*
  //MAGNETOMETER
  mag = new five.Magnetometer();

  //on heading change
  mag.on("headingchange", function() {
    console.log( "heading", Math.floor(this.heading) );
    console.log( "bearing", this.bearing );
  });

  //raw data logging
  mag.on("data", function( err, timestamp ) {
     console.log( "data", this.raw );
     //process.exit();
  });

  */
});