# Andrii Kycha Portfolio Inspired by 1990s Video Games

![Andrii Kycha Portfolio Inspired by 1990s Video Games](./docs/assets/img/preview.png)

Created thanks to this YT guide (also explains well how to use the Tiled map editor)
https://www.youtube.com/watch?v=yP5DKzriqXA&ab_channel=ChrisCourses

Game assets were downloaded from [itch.io](https://itch.io)

## Running Locally

- Clone the repo
- ```cd pixel-portfolio```
- ```npm run ci```
- ```npm run build```
- Open `static/index.html` in your browser

## Adding Changes

- ```npm run build -- --watch```
- Open `static/index.html` in your browser
- Add your changes to the codebase
- Reload the browser page to apply the changes

### Changing the Map

- Install the [Tiled map editor](https://www.mapeditor.org/)
- Open the app
- Open the Tiled project at `src/assets/tilesets/First Office.tmx`
- Add the changes

### Tile Configuration

- Tile Width: 32px
- Tile Height: 32px

### Resizing the Map

You want to resize the map if you want to add more rooms.

`Tiled > Map (MacOS Toolbar when in Tiled) > Resize Map`

### Adding New Objects on the Map

You will want to do this when you are customizing the map for your purpopes. Maybe you want to add a new room or change the furniture in one of the rooms.

`Tiled > Sidebar at the right bottom (under the Layers section) > Zoom in/out as needed > Select the necessary tab with the objects of interest > Copy the object > Select Stamp Brush (B) (Tiled Toolbar) > Click the spot on the map to add the select object there`

Recommendation:
Add a new layer when adding changes to not make destructive changes to the existing layers

### Copying the Existing Objects on the Map

`Tiled > Rectangular Select (R) > Select area on the map > Cmd + C > Cmd + V to paste it`

### Turn off Grid

`Cmd + G`