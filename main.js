const electron = require('electron');
const {Tray, ipcRenderer} = require('electron')
const notifier = require("node-notifier");

const { app, BrowserWindow } = electron;

const path = require('path');
const url = require('url');

const prodEnv = false
const build = false

const htmlPath = "final/index.html";
let ICON = __dirname+'/final/res/images/icon.png';
ICON = (build ? path.join(process.resourcesPath, "icon.png"): ICON)


let mainWindow;
let tray = null

const NotifAction = (title, message) => {
  notifier.notify(
    {
      title,
      message,
      icon: ICON,
      sound: true,
    },
  );
}

global.CONFIG={PROD: prodEnv, ICON, notif: NotifAction}

function createWindow () {
  var params = {
    width: 690,
    height: 540,
    minHeight: 540,
    minWidth: 690,
    autoHideMenuBar: true,
    icon: ICON,
    webPreferences:{
      nodeIntegration: true,
    }
  };
  mainWindow = new BrowserWindow(params);
  mainWindow.setMenu(null);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, htmlPath),
    protocol: 'file:',
    slashes: true
  }));


  // Open the DevTools.

  if (!prodEnv) {
      mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', function (e) {
    // // e.preventDefault();
    // // mainWindow.webContents.send('close', 'whoooooooh!')
    // require('dialog').showMessageBox({
    //   message: "Close button has been pressed!",
    //   buttons: ["OK"]
    // });
    // mainWindow = null
    ipcRenderer.sendSync("asynchronous-message", "close");
  })

  tray = new Tray(ICON)

  tray.setToolTip('Day-Routine')
  tray.on("click", ()=>{
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })
}

if (!build) {
  require('electron-reload')(__dirname);
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});



