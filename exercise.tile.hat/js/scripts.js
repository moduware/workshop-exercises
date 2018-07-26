/** Actions when html and all external files are loaded */
document.addEventListener('DOMContentLoaded', function(event) {
  // Creating header on top of tile. This only deals with our Moduware custom headers.
  Nexpaq.Header.create('Tile Template');
});

/** Actions when nexpaq API completely initialized */
document.addEventListener('NexpaqAPIReady', function() {
  /** We can setup listener for received data here */
  Nexpaq.API.Module.addEventListener('DataReceived', dataReceivedHandler);
  
  // Getting our target module. In our case, we are getting the HAT module.
  var hatModuleUuid = Nexpaq.Arguments[0];
  
  /**
   *  As API ready and we are listening for events we can send some initial commands
   * for our module if required. We can turn on sensor for example.
   * @params UUID of module
   * @params Name of command
   * @params Arguments for command
   */
  Moduware.v0.API.Module.SendCommand(hatModuleUuid, 'StartSensor', []);

  /** We also may want to perform some actions when user leaves tile */
  Nexpaq.API.addEventListener('BeforeExit', beforeExitActions);
});

/** Handles data received from modules */
function dataReceivedHandler(event) {
  var targetModuleUuid = Nexpaq.Arguments[0];
  // In most cases we don't need to work with any data but from our taget module
  if(event.moduleUuid != targetModuleUuid) return;

  // Data from module available in form of variables:
  // You can see data output in JS console
  console.log('Data from module - dataSource: ', event.dataSource);
  console.log('Data from module - variables: ', event.variables.object_temperature);

  
  /**
   * Type of data from module can be different - values from sensor, replies to commands, reports about state changes ('heated' for example)
   * So it is better to filter data you are working with by checking it's source
   */

  // The code below get from our HAT sensor and diplay it on our tile UI
  if(event.dataSource == 'SensorValue') {
    let currentObjectTemperature = parseFloat(event.variables.object_temperature).toFixed(2);
    let currentAmbientTemperature = parseFloat(event.variables.ambient_temperature).toFixed(2);
    // Display received data in tile UI
    document.getElementById("ambientTemperatureValue").innerHTML = currentAmbientTemperature;
    document.getElementById("objectTemperatureValue").innerHTML = currentObjectTemperature;
  }
}

/** Handles tile exit event and perfoms last actions */
function beforeExitActions() {
  // TODO: turn off our module sensors on exit to cut power use
}
