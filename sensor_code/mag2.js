var five = require("johnny-five"),
    mag;

five.Board().on("ready", function() {

  // Create a new `Magnetometer` hardware instance.
  //
  // five.Magnetometer();
  //
  // (Alias of:
  //   new five.Compass({
  //    device: "HMC5883L",
  //    freq: 50,
  //    gauss: 1.3
  //   });
  // )
  //

  //mag = new five.Magnetometer();

  mag = new five.Compass({
    device: "HMC6352",
    freq: 50,
    gauss: 5.6
  });

  // Properties

  // mag.raw
  //
  // x, y, z
  //

  // mag.scaled
  //
  // axis x, y, z
  //
  // based on value stored at (mag.scale)
  //

  // mag.heading
  //
  // Calculated heading in degrees (calibrated for magnetic north)
  //

  // mag.bearing
  //
  // Bearing data object
  //


  // Magnetometer Event API

  // "headingchange"
  //
  // Fires when the calculated heading has changed
  //
  //mag.on("headingchange", function() {

    //console.log( "heading", Math.floor(this.heading) );
    //console.log( "bearing", this.bearing );

  //});

  // "read"
  //
  // Fires continuously, every 66ms.
  //
  mag.on("data", function( err, timestamp ) {
     console.log( "data", this.raw );
     
     //process.exit();
  });
});


    // References
    //
    // https://github.com/rwaldron/johnny-five/blob/master/docs/magnetometer.md