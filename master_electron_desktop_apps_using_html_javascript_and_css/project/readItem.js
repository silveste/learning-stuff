const {BrowserWindow} = require('electron');

//Create reference for the BrowserWindow to avoid being garbage collected
let bgItemWin;

module.exports = (url, callback) => {
  bgItemWin = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: false,
    webPreferences: {
      offscreen: true
    }
  });

  //Load new item
  bgItemWin.loadURL(url);

  // Wait for page to fininsh loading
  bgItemWin.webContents.on('did-finish-load', () => {
    // get the screnshot  (thumbnail)
    bgItemWin.webContents.capturePage( (image) => {
      //Get image as dataURI
      let screenshot = image.toDataURL();

      //Get the page title
      let title = bgItemWin.getTitle();

      //return the new item via callback
      callback({title, screenshot, url });

      // Clean up
      bgItemWin.close();
      bgItemWin = null;
    });
  });

};
