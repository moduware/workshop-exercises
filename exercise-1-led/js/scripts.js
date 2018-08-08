
document.addEventListener('DOMContentLoaded', function() {
  // Creating header on top of tile
  WebViewTileHeader.create('Tile Template');
});

// WebViewApiReady is the main event that we need to listen to
// to make sure that moduware APIs are initialized and ready to work with
document.addEventListener('WebViewApiReady', function() {

  // start listening to received data from all modules by 
  // subscribing to DataReceived event
  Moduware.v0.API.Module.addEventListener('DataReceived', dataReceivedHandler);

  // this will turn on the light in the LED Module once the tile is loaded as an indication that it work
  // Original: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetRGB', [255, 255, 255]);
  // Red: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetRGB', [255, 0, 0]);
  // Blue: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetRGB', [0, 255, 0]);
  // Green: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetRGB', [0, 0, 255]);
  // Flash LEDs: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetFlashes', [2000, 2000]);
  // Specific LEDs: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetOneLEDInRGB', [0b00010101, 150, 150, 150]);

  // Major:
  var numberOfLedsOn = 0;
  document.getElementById('toggleLightButton').addEventListener('click', function() {
    numberOfLedsOn = numberOfLedsOn + 1;
    if(numberOfLedsOn > 6) {
      numberOfLedsOn = 0;
      Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetOneLEDInRGB', [0b00111111, 0, 0, 0]);
    } else {
      Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetOneLEDInRGB', [Math.pow(2, numberOfLedsOn) - 1, 30, 30, 30]);
    }
  });
  

  Moduware.v0.API.addEventListener('BeforeExit', function() {
    // do your clean up code here, like switching off sensors or light
    // Original, Red, Blue, Green: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'TurnOffLeds', []);
    // Flash LEDs: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'TurnOffFlashs', []);
    // Specific LEDs & Major:
    Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetOneLEDInRGB', [0b00111111, 0, 0, 0]);
  });

});

// handles the event of receivng data from modules
function dataReceivedHandler(event) {
  
  // we need to make sure that the data received is from the module
  // that we are targeting
  if (event.moduleUuid !== Moduware.Arguments.uuid) return;

  // each module can have more than one event, so we 
  // must check for the event source property to know which event 
  // is invoked
  if(event.dataSource === 'SensorValue') {}
}