const {BrowserWindow} = require('electron');

//Browser window instance
module.exports.win;

module.exports.createWindow = () => {
  this.win = new BrowserWindow({
    width: 500,
    height: 650,
    minWidth: 350,
    maxWidth: 650,
    minHeght: 310
  });

  // Devtools
  this.win.webContents.openDevTools();
  require('devtron').install();

  //Load main window content
  this.win.loadURL(`file://${__dirname}/renderer/main.html`);

  // handle window closed
  this.win.on('closed', () => this.win = null);
};
