/** Actions when html and all external files are loaded */
document.addEventListener('DOMContentLoaded', function(event) {
  // Creating header on top of tile. This only deals with our Moduware custom headers.
  WebViewTileHeader.create('Tile Template');
});

/** Actions when nexpaq API completely initialized */
document.addEventListener('WebViewApiReady', function() {
  /**
   *  As API ready and we are listening for events we can send some initial commands
   * for our module if required. We can turn on sensor for example.
   * @params UUID of module
   * @params Name of command
   * @params Arguments for command
   */
  Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'StartSensor', []);

  /** We can setup listener for received data here */
  Moduware.v0.API.Module.addEventListener('DataReceived', dataReceivedHandler);

  /** We also may want to perform some actions when user leaves tile */
  Moduware.v0.API.addEventListener('BeforeExit', function beforeExitActions() {
    // Turn off our module sensors on exit to cut power use
    Moduware.v0.API.Module.SendCommand(Moduware.Arguments.uuid, 'StopSensor', []);
  });
});

/** Handles data received from modules */
function dataReceivedHandler(event) {
  // We need to check if the data is coming from our target T&H  module
  if(event.moduleUuid != Moduware.Arguments.uuid) return;

  let currentObjectTemperature;
  
  /**
   * Type of data from module can be different - values from sensor, replies to commands, reports about state changes
   * So it is better to filter data you are working with by checking it's source
   */
  if(event.dataSource == 'SensorValue') {
    // The code below get from our HAT sensor and display it on our tile UI
    currentObjectTemperature = parseFloat(event.variables.object_temperature).toFixed(2);
    
    document.getElementById("objectTemperatureValue").innerText = currentObjectTemperature;
  }

  let warningLevel = 37;
  let dangerLevel = 40;
  let messageDisplayHeader = document.getElementById("messageDisplayHeader");

  if (currentObjectTemperature < warningLevel) {
    messageDisplayHeader.innerText = 'All good here.';
    messageDisplayHeader.style.color = 'green';
  }
  
  if (currentObjectTemperature >= warningLevel && currentObjectTemperature < dangerLevel) {
    messageDisplayHeader.innerText = 'Warning: Getting warmer...';
    messageDisplayHeader.style.color = 'orange';
  }
  
  if (currentObjectTemperature >= dangerLevel) {
    messageDisplayHeader.innerText = 'DANGER! Too hot!';
    messageDisplayHeader.style.color = 'red';
  }
  
}
