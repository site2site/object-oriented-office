/*

PROJECT: Object Oriented Office (OOO)
SCRIPT: ooo_chair.js
VERSION: 0.02
FUNCTION: Operating code, via the Johhny-Five framework,
  for collecting data from embedded sensors in an office
  chair, and determining whether the chair is occupied and
  how it is oriented.
SENSORS: FSR (force-sensitive resistor), Magnetometer (compass)

ISSUES:
  (1) Determine Threshold Values
  (2) Working Magnetometer
*/


var five = require("johnny-five"),
    board, fsr1, fsr2, fsr3, fsr4, mag;
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
  for(var i = 1; i < buf.length; i++){
    rtn = Math.min( rtn, buf[i] );
  }
  return rtn;
}

//function for grabbing maximum value from buffer array
function getMax( buf ){
  var rtn = buf[0];
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
  //FSR 02
  fsrs[2] = new five.Sensor({
    pin: "A3",
    freq: 100
  });

  buffers[2] = [];
  thresholds[2] = 80;
  
  fsrs[2].scale([ 0, 100 ]).on("data",function(){
    //console.log("seat_left: " + this.value);
    var oc = occupied( 1, this.value );
    if(oc == true){
      console.log( 'occupied fsr 2' );
    }    
  });
  

  //FSR 03
  fsrs[3] = new five.Sensor({
    pin: "A4",
    freq: 100
  });

  buffers[3] = [];
  thresholds[3] = 80;
  
  
  fsrs[3].scale([ 0, 100 ]).on("data",function(){
    //console.log("seat_left: " + this.value);

    var oc = occupied( 1, this.value );

    if(oc == true){
      console.log( 'occupied fsr 2' );
    }    
  });
  */

});