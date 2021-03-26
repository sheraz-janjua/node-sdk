const grandeur = require("../index");

// Initialize the SDK and get
// a reference to the project
var project = grandeur.init("testProject", "testAccessID", "eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpwWkNJNkluUmxjM1JCWTJObGMzTkpSQ0lzSW5SNWNHVWlPaUpoWTJObGMzTWlMQ0pwWVhRaU9qRTJNRGczTVRRNU16VjkucXFqcHkyNDRSRUN4TS1GT2JhZU9Hem1weEk2bkFvWjh1dUx1dUdEczViRSJ9");

// Variable to store state and deviseID
var deviceState = "0";
var deviceID = "device123456789";

// Get email and password
var email = "test@testproject.com";
var password = "test:80";

// Get reference to the auth class
var auth = project.auth();
var device = project.devices().device(deviceID);

async function loop() {
  if(project.isConnected()) {
    // Getting state.
    console.log("Get response: ", (await device.data().get("state")).data);

    // Toggling state.
    deviceState = deviceState == "1" ? "0" : "1";

    // Setting state.
    await device.data().set("state", deviceState);

    // Getting state.
    console.log("Get response: ", (await device.data().get("state")).data);
  }
}

(async () => {
  try {
    // Logging in.
    console.log("Login response: ", await auth.login(email, password));

    setInterval(loop, 5000);
  }
  catch(err) {
    // Error usually got generated when
    // we are not connected to the internet
    console.log(err);
  }
})();