/**
 * Example 1:
 * we set up 2 levels of temperature, lets say 34 and 38 degrees.
 * when the tile start, it will start the HAT sensor and start the flash light with white color
 * as an indication that the HAT sensor is working.
 * when the current temp of the HAT module increases to reach level one the light will turn blue.
 * when the current temp of the HAT module increases to reach level two the light will turn red.
 * when the current temp of the HAT module decreases the color of the light will turn back to blue if the current temp is between
 * level 1 and level 2 or white if the current temp is less than level 1.
 */

document.addEventListener('DOMContentLoaded', function(event) {
  // Creating header on top of tile
  Nexpaq.Header.create('Tile Template');
});

document.addEventListener('WebViewApiReady', function() {

  var ledModuleUuid = '';
  var hatModuleUuid = '';
  var levelOne = 34;
  var levelTwo = 38;

  // use GetCurrentConfiguration method to quickly get the information of
  // the current connected modules.
  Moduware.v0.API.GetCurrentConfiguration().then(function(result) {

    ledModuleUuid = result[0].modules.find(function(module) {
      return module !== null && module !== undefined && module.typeId === 'moduware.module.led';
    }).uuid;

    hatModuleUuid = result[0].modules.find(function(module) {
      return module !== null && module !== undefined && module.typeId === 'nexpaq.module.hat';
    }).uuid;

    //starting the the HAT sensor
    Moduware.v0.API.Module.SendCommand(hatModuleUuid, 'StartSensor', []);

    // put flash on (white) to indicate that the HAT sensor is working
    // what the first 2 parameters in the array means, interval and duration ??
    Moduware.v0.API.Module.SendCommand(ledModuleUuid, 'StartFlashingRgbLeds', [65535, 65535, 255, 255, 255]);
  });

  // start listening to the DataReceived event
  Moduware.v0.API.Module.addEventListener('DataReceived', function(event) {

    // check if the event is triggered by the H&T module
    if(event.moduleUuid !== hatModuleUuid) return;

    // check if the event source is the sensor 
    if(event.dataSource === 'SensorValue') {

      var currentTemperature = parseFloat(event.variables.object_temperature);
      console.log('current temperature: ' + currentTemperature);

      // level one 
      if(currentTemperature >= levelOne && currentTemperature < levelTwo) {
        // set flash to blue (not danger)
        Moduware.v0.API.Module.SendCommand(ledModuleUuid, 'SetRGB', [0, 0, 255]);
      }

      // level two
      if(currentTemperature >= levelTwo) {
        // set flash to red (danger)
        Moduware.v0.API.Module.SendCommand(ledModuleUuid, 'SetRGB', [255, 0, 0]);
      }

      // less than level one, means that we should go back to the non danger state (yellow)
      if(currentTemperature < levelOne) {
        Moduware.v0.API.Module.SendCommand(ledModuleUuid, 'SetRGB', [255, 255, 255]);
      }
    }
  });

  // clean up before exiting tile 
  Moduware.v0.API.addEventListener('BeforeExit', function() {
    Moduware.v0.API.Module.SendCommand(hatModuleUuid, 'StopSensor', []);
    Moduware.v0.API.Module.SendCommand(ledModuleUuid, 'StopFlashingRgbLeds', []);
  });

});