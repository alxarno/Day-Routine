// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const notifier = require('node-notifier');
const path = require('path');

exports.notifAction = (title, message) =>{
  notifier.notify(
    {
      title,
      message,
      icon:  path.join(__dirname,'/res/images/routinelogo@medium.png'),
      sound:true
    }
  )
}