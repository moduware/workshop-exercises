
document.addEventListener('DOMContentLoaded', function() {
  // Creating header on top of tile
  WebViewTileHeader.create('LED Exercise');
});

// WebViewApiReady is the main event that we need to listen to
// to make sure that moduware APIs are initialized and ready to work with
document.addEventListener('WebViewApiReady', function() {
  // this will turn on the light in the LED Module once the tile is loaded as an indication that it work
  // Original: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetRGB', [255, 255, 255]);
  // Red: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetRGB', [255, 0, 0]);
  // Blue: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetRGB', [0, 255, 0]);
  // Green: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetRGB', [0, 0, 255]);
  // Flash LEDs: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetFlashes', [2000, 2000]);
  // Specific LEDs: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetOneLEDInRGB', [0b00010101, 150, 150, 150]);

  // Major:
  var target = Moduware.Arguments.uuid;
  var leds = 0;
  document.getElementById('button').addEventListener('click', function() {
    Moduware.v0.API.Module.SendCommand(target, 'SetOneLEDInRGB', [Math.pow(2, leds) - 1, 30, 30, 30]);
    leds = leds + 1;
    if(leds > 6) {
      leds = 0;
      Moduware.v0.API.Module.SendCommand(target, 'SetOneLEDInRGB', [63, 0, 0, 0]);
    }
  });

  Moduware.v0.API.addEventListener('BeforeExit', function() {
    // do your clean up code here, like switching off sensors or light
    // Original, Red, Blue, Green: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'TurnOffLeds', []);
    // Flash LEDs: // Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'TurnOffFlashs', []);
    // Specific LEDs & Major:
    Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'SetOneLEDInRGB', [63, 0, 0, 0]);
  });

});