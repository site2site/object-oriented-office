## September 28, 2013

Your project senses the occupancy of a chair, and how it is being occupied. This includes weight distribution, directionality, and a derivation of the current state based on proximity to two types of desks: work station and large collaborative desk. We can't afford to put full hardware assemblies on every chair in Studio-X, so we think you should focus on making prototypes for 3 work station chairs at Studio-X: Benedict's chair, the person next to him, and the person behind him.

From this, you will be able to determine:

1.	Which of the three chairs are occupied using pressure sensors in the seats
2.	How the person is sitting by sensing weight distribution
3.	When the chairs rotate, and in which direction they are pointing

You can then start to make inferences based on how this small group of 3 chairs works together.

We think you should focus on a slip-cover for the chairs that include all the sensors you will need. You can have many force sensors to set up a grid that will run along the seat and the back rest, and a magnetometer to figure out rotational direction.



## September 20, 2013

Your project is about triggering responses in objects based on inputs sensed from the same or other objects. This will be done by connecting the sensor data to the cloud, where it can be processed, and then pushing it back down to physical space to trigger the appropriate actuators. The first step is to get an input to trigger an output. Jim's idea dealt with producing a sort of homeostatic environment, where increases in localized temperature triggered ventilation. Is homeostasis what you want? Could this be tuned by the manager of the space, or crowd sourced to it's inhabitants?

The best approach may be to come up with a very specific goal: perhaps you want to create a hyper efficient localized environment. If that's the case, perhaps your hypothesis is that people work better when they are cold and are standing up. How would you get one part of the room to stand and be cold while other parts of the room are in normal conditions?

You also have Kate's contribution of looking at printers. It's out of the scope of this course to tap into the serial port of a printer, but you could introduce your own. Check out the cheap thermal printer from Adafruit http://www.adafruit.com/products/597 and Google around to see what people have done with it (there are some decent art projects). These printers typically print receipts... what would an architecture office use a receipt for?

Thinking longer term, you may want to incorporate some of Allen's idea to have a web-based interface that would allow human users to tap into the loop, perhaps altering the triggered response in physical space by intercepting the signals and injecting new inputs. TogetherJS could be an interesting means of doing so. Take a look at the video on the homepage.
