/* global $*/
//Modules
const {remote, shell} = require('electron');

//Menu template
const template = [
  {
    label: 'Items',
    submenu : [
      {
        label: 'Add Menu',
        accelerator: 'CmdOrCtrl+O',
        click () {$('.open-add-modal').click();}
      },
      {
        label: 'Read item',
        accelerator: 'CmdOrCtrl+Enter',
        click () { window.openItem();}
      },
      {
        label: 'Delete item',
        accelerator: 'CmdOrCtrl+Backspace',
        click () { window.deleteItem();}
      },
      {
        label: 'Open in browser',
        accelerator: 'CmdOrCtrl+Shift + Enter',
        click () { window.openInBrowser();}
      },
      { type: 'separator'},
      {
        label: 'Search Items',
        accelerator: 'CmdOrCtrl+S',
        click () { $('#search').focus();}
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
    ]
  },
  {
    role: 'window'
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn more',
        click () {shell.openExternal('http://google.com');}
      }
    ]
  }
];
// mac specific
if (process.platform === 'darwin') {
  template.unshift({
    label: remote.app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  });
}

//Mac extra window options
template[3].submenu = [
  { role: 'close' },
  { role: 'minimize' },
  { role: 'zoom' },
  { type: 'separator' },
  { role: 'front' },
  { type: 'separator' }
];

//Including Menu
const menu = remote.Menu.buildFromTemplate(template);
remote.Menu.setApplicationMenu(menu);
