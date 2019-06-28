const electron = require('electron');
const {Tray} = require('electron')
const chokidar = require('chokidar')
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
  console.log('Main window created!')

  tray = new Tray(ICON)

  tray.setToolTip('Day-Routine')
  tray.on("click", ()=>{
    if(!mainWindow) {return;}
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  })
  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  })

  console.log('Tray inited!')

  // ipcMain.on('close-action', () => {
  //   close();
  // })


  mainWindow.setMenu(null);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, htmlPath),
    protocol: 'file:',
    slashes: true
  }));

  console.log('Page loaded!')






  // DEV HELPERS
  if (!build) {
    // Hot reload
    // Why we use "custom" instead electron-reload? 
    // Because we have TCP and UDP server that binded on same ports, if we reload page, ports stay "locked" but reloaded system need use the ports
    // So created simple hot reload, that send message to "free" ports, waite some time, and reload page.
    let lastReloadTime = new Date();

    const createWatcher = (glob, options = {}) => {
      let opts = Object.assign({ignored: [path.join(__dirname, 'main.js'), /node_modules|[/\\]\./]}, options)
      return chokidar.watch(glob, opts)
    }

    const softResetHandler = async () => {
      // Sometimes call reload double, added some restriction
      if(!mainWindow || (new Date()).getTime() - lastReloadTime.getTime() < 5000 ) {return}

      mainWindow.webContents.send("close-notif", "close");
      console.log("Close-notif sent")
      new Promise((res) => {
        mainWindow.webContents.on("close-action", (e, arg) => {
          res();
        })
        setTimeout(res, 2000);
      })
      .then(() => {
        mainWindow.webContents.reloadIgnoringCache()
      })
      lastReloadTime = new Date();
      lastReloadTime.setSeconds(lastReloadTime.getSeconds() + 2);
    }

    let watcher = createWatcher(__dirname, {})
    watcher.on('change', softResetHandler)
    console.log('Watcher created!')
  }

  // Open the DevTools.
  if (!prodEnv) {
    mainWindow.webContents.openDevTools()
  }

 

  

  // mainWindow.on('unresponsive', function(e){
  //   mainWindow.webContents.send("close-notif", "close");
  // })

  // mainWindow.webContents.on('did-start-loading', async (event) => {
   
  //   // var waitTill = new Date(new Date().getTime() + 1000 * 1000);
  //   // while(waitTill > new Date()){}
  //   // close();
  // })
  // mainWindow.webContents.on('will-navigate', async (event) => {
  //   //
  //   event.preventDefault()
    

  // })

  // mainWindow.on('close', function (e) {
    // e.preventDefault();
    // if(!mainWindow) {return;}
    // // mainWindow.webContents.send('close', 'whoooooooh!')
    // require('dialog').showMessageBox({
    //   message: "Close button has been pressed!",
    //   buttons: ["OK"]
    // });
    // mainWindow = null
    // mainWindow.hide()
    // mainWindow.webContents.send("close-notif", "close");
    // setTimeout(() => {
    //   close();
    // }, 1500)
  // })
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



