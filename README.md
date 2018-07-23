# Moduware Webview Tile Boilerplate

This repository is a webview tile boilerplate for beginners, intermediate and experienced developers who wants to get started with Moduware tile development. This template includes default folder and file structure, plus additional Moduware related files to make your developement process easier and faster. Clone or fork this repository and start your development. Everyone is also welcome to contribute and improve this template, just do a pull request.

## How to use this boilerplate

* Make sure that you have already downloaded either the Moduwate IOS app or Moduwate Android app on your phone
* Download the webview tile boilerplate on your computer
* Open the webview-tile-boilerplate directory on your code editor of choice (VS Code, Atom, Sublime Text, etc.)
* Edit the manifest.json file and don't forget to save it
* Copy the tile files to your phone
* For a detailed instructions with screenshots on how to do those steps above click [here](https://github.com/moduware/webview-tile-boilerplate/blob/master/WEBVIEW-TILE-INSTALL-INSTRUCTIONS.md)

## What is Moduwate WebView Tile

Simple single page "website" that consists of bunch of HTML, CSS and JavaScript.

* Absolute mininum files for tile are:

  * index.html (entry point)
  * manifest.json (tile description file)
  * icon.svg (icon of your tile to show on dashboard)

## File structure

* css/ - folder to store your styles

  * normilize.css - makes styles same in all browsers

  * styles.css - root file for your custom styles with few helpful initial styles

* fonts/ - folder to store your non-standard fonts or icon fonts

* img/ - folder to store your images, content releated sub-folders adviced

* js/ - folder to keep you JavaScript
  * WebViewTileHeader.js - script that can create standard header for tile which will automatically adapt it's appeareance to match platform

  * scripts.js - root file for your custom scripts

* vendor/ - folder to store third party libraries, styles, etc...

* icon.svg - tile to be displayed at dashboard

* index.html - main html file of your tile

* manifest.json - description of your tile, you can read more about manifests [here](https://moduware.github.io/manifest-generator/)

## Manifest

  Example `manifest.json` file:

  ```json

  {
    "id": "sample.tile.hat",
    "name": "Tile Template",
    "description": "Moduware tile Template",

    "version": "1.0.0",
    "changes": "Changes in this version",
    "minumumAppVersion": "1.1.8",
    "modules": [
      "nexpaq.module.hat"
    ],

    "title": "Tile Template",
    "color": "#bada55",
    "textColor": "black"
  }

  ```

  * `id` field - `"namespace.tile.tileName"` and an example above `"sample.tile.hat"`
    * `namespace` first part can be anything that describe the creator etc.
    * `tile` the second part must be the word `'tile'` (required)
    * `tileName` the last part is the tile name which preferably should contain the module name, like `led` or `hat` plus some description of what it does. An example tileName would be `hat-workshop` or `led-workshop`

  Example tile id

  ```json

  {
    "id": "lina.tile.led-workshop"
  }

  ```

  ```json

  {
    "id": "alex.tile.hat-moduware-workshop"
  }

  ```

  ```json

  {
    "id": "“moemen.tile.led-moduware-workshop"
  }

  ```

  * `name` field - how your tile is going to appear on the list of tile for a given module

  * `“description”` is additional text that is going to appear below the name field on the given list of tiles available

  * `modules` -  is array field containing the modules you are targeting, for now lets keep it simple by adding only one tile in the array, below is a list of standard module names to be used

    ```json

    "modules": [
      "moduware.module.led",
      "nexpaq.module.hat",
      "moduware.module.speaker",
      "moduware.module.usb"
    ],

    ```
  * `title` field - the name of the tile that appears when the different connected tiles are displayed on the webview main page

  * `color` field - the background color of the tile that appears when the different connected tiles are displayed on the webview main page

  * `textColor` field - the text color of the tile title that appears when the different connected tiles are displayed on the webview main page