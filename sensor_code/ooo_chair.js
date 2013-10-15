var five = require("johnny-five"),
    board, fsr1, fsr2, fsr3, fsr4, mag;
    //led;

(new five.Board()).on("ready", function() {

  // Create a new `fsr` hardware instance.
  fsr1 = new five.Sensor({
    pin: "A0",
    freq: 25,
    location: "seat_left"
  });
  fsr2 = new five.Sensor({
    pin: "A1",
    freq: 25,
    location: "seat_right"

  });
  fsr3 = new five.Sensor({
    pin: "A2",
    freq: 25,
    location: "back_left"
  });
  fsr4 = new five.Sensor({
    pin: "A3",
    freq: 25,
    location: "back_right"
  });

  //Create a new 'mag' hardware instance.

  //inject sensors hardware
  board.repl.inject({
    pad1: fsr1,
    pad2: fsr2,
    pad3: fsr3,
    pad4: fsr4
    //add mag here
  });

  fsr1.on("data",function(){
    console.log(this.location + this.value)
  });

  fsr2.on("data",function(){
    console.log(this.location + this.value)
  });

  fsr3.on("data",function(){
    console.log(this.location + this.value)
  });

  fsr4.on("data",function(){
    console.log(this.location + this.value)
  });

});