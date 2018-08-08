# Install Webview Tile Boilerplate

## Instructions

1. Make sure to download and install IOS or Android app on your phone and follow instruction below on how to create your own custom tile

2. On your computer, create a new directory/folder called moduware inside your projects/ directory or any directory that you prefer

    From your computer terminal, go to your projects directory and run the following commands

    To create new moduware directory
    ```console
    mkdir moduware
    ```

    then to change directory or go inside of the new moduware directory
    ```console
    cd moduware
    ```

3. Once inside the new moduware directory, run the following command to clone or download the webview-tile-boilerplate repository from Github using git:

    ```console
    git clone https://github.com/moduware/webview-tile-boilerplate.git
    ```

    or Download the repository directly as a ZIP archive by clicking [here](https://github.com/moduware/webview-tile-boilerplate/archive/master.zip) and extract the zip archive to your `moduware` directory you created from step 2 above

    Inside your moduware folder you will now have a new directory/folder named `webview-tile-boilerplate` which contains the minimum tile files required to start your tile development

4. Open the webview-tile-boilerplate directory that you have downlowded from step 3 above using your code editor of choice (VS Code, Atom, Sublime Text, etc.)

5. Open manifest.json file, edit the file to something relevant to what you are doing

    ```json
    {
    "id": "moduware.tile.hat-workshop",
    "name": "My Workshop Tile",
    "description": "Moduware Workshop Tempreture Tile",

    "version": "1.0.0",
    "changes": "Changes in this version",
    "minumumAppVersion": "1.1.8",
    "modules": [
      "nexpaq.module.hat"
    ],

    "title": "Temperature",
    "color": "#bada55",
    "textColor": "black"
    }
    ```

    Note: Tile id uses reverse domain notation as following entity format: "namespace".**tile**."name" - where **tile** is a requiered type

    See a description of the the different manifest.json fields [here](https://github.com/moduware/webview-tile-boilerplate/blob/master/README.md#file-structure)

    Don't forget to save the changes you made to the `mainifest.json` file.

6. Rename the webview-tile-boilerplate to the same name as what you have in the `id` field of your manifest.json file that you edited in step 5

    * example `moduware.tile.hat-workshop`

7. Put tile files in your phone - follow the steps below for either IOS or Android platform

    i. **IOS**

      * Connect your phone to your Mac computer using iTunes

      * Select phone icon and then select **_File Sharing_** on the left side menu

        ![select_phone_itunes]

      * Under **_File Sharing_** select **Moduware**

      * From your Mac finder, drag the folder you renamed from step 6 above (example: `moduware.tile.hat-workshop`) which contains the tile files and then drop them into `Moduware Documents`

        ![itunes_drag_and_drop]

        * Tile folder MUST contain at the very least these 3 files
          * "manifest.json"
          * "icon.svg"
          * "index.html"

      * After installing customized tiles, restart and open Moduware iOS app.

    ii. **Android**

    * Connect phone to computer using *File Manager* or *Android File Transfer* (for Mac OS)

    * Create **_moduware_** directory/folder on your phone's hard drive root directory

    * Copy the tile files directory/folder (example: `moduware.tile.hat-workshop`) and paste them into **moduware** folder. Tile file directory/folder is the one that you renamed in step 6 above.

      ![moduware_folder_path_and_structure]

      * Tile folder MUST contain at the very least these 3 files
        * "manifest.json"
        * "icon.svg"
        * "index.html"

    * After installing customized tiles, restart Moduware Android app

8. After restarting and opening Moduware app, connect to Moduware Modpack device via bluetooth.

9. When you are connected to Moduware Modpack, Press edit button (pencil icon) on the upper left and select the module (Tempreture or LED tile depending on what you want to check). You will then see the list of available tiles to use for that particular module. Select the one on the list that says **"name" DEV** where "name" is the same as the `name` field inside your manifest.json file.

10. You should see "I'm Your Tile Template" on your phone screen when everything works!

[select_phone_itunes]:images/select_phone_in_itunes.png
[itunes_drag_and_drop]:images/itunes_drag_and_drop.png
[tile_file_structure]:images/tile_file_structure.png
[moduware_folder_path_and_structure]:images/moduware_folder_path_and_structure.png
