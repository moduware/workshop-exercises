/** Actions when html and all external files are loaded */
document.addEventListener('DOMContentLoaded', function(event) {
	// Creating header on top of tile
  Nexpaq.Header.create('Tile Template');
});

/** Actions when nexpaq API completely initialized*/
document.addEventListener('NexpaqAPIReady', function() {
  /** We can setup lister for received data here */
  Nexpaq.API.Module.addEventListener('DataReceived', dataReceivedHandler);
  
  /**
   * As API ready and we are listening for events we can send some initial commands
   * for our module if required. We can turn on sensor for example.
   * There are 3 arguments passed when app runs tile:
   * - Target module UUID
   * - Target module slot in gateway
   * - Target module type (i.e. nexpaq.module.laser)
   */
  var targetModuleUuid = Nexpaq.Arguments[0];
  Nexpaq.API.Module.SendCommand(targetModuleUuid, 'CommandName', []);

  /** We also may want to perform some actions when user leaves tile */
  Nexpaq.API.addEventListener('BeforeExit', beforeExitActions);
});

/** Handles data received from modules */
function dataReceivedHandler(event) {
  var targetModuleUuid = Nexpaq.Arguments[0];
  // In most cases we don't need to work with any data but from our taget module and we can ignoge it
  if(event.moduleUuid != targetModuleUuid) return;

  // Data from module available in form of variables:
  console.log('Data from module: ', event.dataSource, event.variables); // You can see data output in JS console

  // TODO: Display received data in tile UI
  /**
   * Type of data from module can be different
   * - values from sensor
   * - replies to commands
   * - reports about state changes ('heated' for example)
   * So it is better to filter data you are working with by checking it's source
   */
  // if(event.dataSource == 'SensorValue') {
  //   ... do something ...
  // }
}

/** Handles tile exit event and perfoms last actions */
function beforeExitActions() {
  // TODO: turn off our module sensors on exit to cut power use
}
