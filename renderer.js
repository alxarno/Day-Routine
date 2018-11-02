// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const notifier = require('node-notifier');
const path = require('path');
const fs = require("fs")
const {dialog} = require('electron')

const {shell} = require('electron')

exports.notifAction = (title, message) =>{
  // return
  notifier.notify(
    {
      title,
      message,
      icon:  path.join(__dirname,'/res/images/routinelogo@medium.png'),
      sound:true
    }
  )
}

exports.saveFile = async ()=>{
   let promise = new Promise(function(resolve, reject){
    var d = new Date();
    dialog.showSaveDialog({
      defaultPath:"./"+d.getDay()+"_"+d.getMonth()+"_"+d.getFullYear()+".day-routine-data.json",
      filters: [
        { name: 'Data', extensions: ['json'] },
      ]
    },function (filename) {
        if (filename === undefined) reject();  
        resolve(filename);
      })
   })

   return await promise;
}

exports.chooseFile = async()=>{
  let promise = new Promise(function(resolve, reject){
    dialog.showOpenDialog({
      filters: [
        { name: 'Data', extensions: ['json'] },
      ]
    },function (fileNames) {
      if(fileNames === undefined){
        reject()
      }else{
        resolve(fileNames)
      }
     })
  })

  return await promise
}

exports.openFile = async (path)=>{
  let promise = new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data)
      // data is the contents of the text file we just read
    });
  })
  return await promise;
}

exports.writeToFile = async (path, data)=>{
  let promise = new Promise((resolve, reject)=>{
    fs.writeFile(path, data,'utf-8', (err)=>{
      if (err) reject(err)
      else resolve();
    })
  })

  return await promise;
}


exports.executeFile = (path)=>{
  shell.openItem(path);
}

exports.openLink = (url)=>{
  shell.openExternal(url);
}