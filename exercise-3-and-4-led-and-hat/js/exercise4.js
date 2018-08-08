
/**
 * Example 2:
 * Increasing the brightness of the led flash when temp increases
 * Decreasing the brightness of the led flash when temp decreases
 */

document.addEventListener('DOMContentLoaded', function(event) {
    // Creating header on top of tile
    WebViewTileHeader.create('Tile Template');

});

document.addEventListener('WebViewApiReady', function() {

    var ledModuleUuid = '';
    var hatModuleUuid = '';
    var brightness = 500;

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

        // put flash on (leds) to indicate that the HAT sensor is working
        Moduware.v0.API.Module.SendCommand(ledModuleUuid, 'SetFlashes', [brightness, brightness]);
    });

    // start listening to the DataReceived event
    Moduware.v0.API.Module.addEventListener('DataReceived', function(event) {

        // check if the event is triggered by the H&T module
        if(event.moduleUuid !== hatModuleUuid) return;

        // check if the event source is the sensor 
        if(event.dataSource === 'SensorValue') {

            // parse the value of object temperature to number
            var currentTemperature = parseFloat(event.variables.object_temperature);

            brightness = currentTemperature * 100;

            if(currentTemperature <= 0) {
                brightness = 100;
            }

            if(brightness > 4000) {
                brightness = 4000;
            }

            Moduware.v0.API.Module.SendCommand(ledModuleUuid, 'SetFlashes', [brightness, brightness]);
            console.log('current temperature: ' + currentTemperature);
            console.log('current brightness: ' + brightness);
        }
    });

    // clean up before exit tile 
    Moduware.v0.API.addEventListener('BeforeExit', function() {
        Moduware.v0.API.Module.SendCommand(hatModuleUuid, 'StopSensor', []);
        Moduware.v0.API.Module.SendCommand(ledModuleUuid, 'StopFlashingFlashLeds', []);
    });

});