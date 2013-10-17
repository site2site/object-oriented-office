var five = require("johnny-five"),
    fsr1, fsr2, fsr3, fsr4, mag;
    //led;

(new five.Board()).on("ready", function() {

  // Create a new `fsr` hardware instance.
  fsr1 = new five.Sensor({
    pin: "A0",
    freq: 25
  });
  fsr2 = new five.Sensor({
    pin: "A1",
    freq: 25
  });
  fsr3 = new five.Sensor({
    pin: "A2",
    freq: 25
  });
  fsr4 = new five.Sensor({
    pin: "A3",
    freq: 25
  });
  //mag = new five.Magnetometer();

  // Scale each sensor's value from 1 to 100 & log to console
  
  fsr1.scale([ 0, 100 ]).on("data", function() {
    console.log( 'FSR-01: '+ this.value );
  });
  
  fsr2.scale([0,100]).on("data", function(){
    console.log( 'FSR-02: '+ this.value );
  });
  
  fsr3.scale([0,100]).on("data", function(){
    console.log( 'FSR-03: '+ this.value );
  });
  
  fsr4.scale([0,100]).on("data", function(){
    console.log( 'FSR-04: '+ this.value );
  });
  
/*
    // Magnetometer Event API

  // "headingchange"
  //
  // Fires when the calculated heading has changed
  //
  mag.on("headingchange", function() {

    console.log( "heading: ", Math.floor(this.heading) );
    console.log( "bearing: ", this.bearing );

  });

  // "read"
  //
  // Fires continuously, every 66ms.
  //
  mag.on("read", function( err, timestamp ) {
    // console.log( "read", this.axis );
  });
});
*/
});