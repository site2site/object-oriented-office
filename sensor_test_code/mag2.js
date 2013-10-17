var five = require("johnny-five"),
    mag;

five.Board().on("ready", function() {

  mag = new five.Compass({
    device: "HMC6352",
    freq: 50,
    gauss: 1.3
  });


  // "read"
  mag.on("data", function( err, timestamp ) {
     console.log( "data", this.raw );
  });
});