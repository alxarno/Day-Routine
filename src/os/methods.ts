const electron = (window as any).require("electron");
const req = electron.remote;

const {notif} = req.getGlobal("CONFIG");

const notifier = req.require("node-notifier");

const path = req.require("path");
const fs = req.require("fs");
const {dialog, shell} = req;

// const {notif} = (window as any).require("electron").remote.getGlobal("CONFIG");

export const NotifAction = notif;
// (title: string, message: string) => {
//   notifier.notify(
//     {
//       title,
//       message,
//       icon: ICON,
//       sound: true,
//     },
//   );
// };

export const SaveFile = async () => {
   const promise: Promise<string> = new Promise(function(resolve, reject) {
    const d = new Date();
    dialog.showSaveDialog({
      defaultPath: "./" + d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + ".day-routine-data.json",
      filters: [
        { name: "Data", extensions: ["json"] },
      ],
    }, function(filename: string) {
        if (filename === undefined) { reject(); }
        resolve(filename);
      });
   });

   return promise;
};

export const ChooseFile = async () => {
  const promise = new Promise(function(resolve, reject) {
    dialog.showOpenDialog({
      filters: [
        { name: "Data", extensions: ["json"] },
      ],
    }, function(fileNames: string) {
      if (fileNames === undefined) {
        reject();
      } else {
        resolve(fileNames);
      }
     });
  });

  return promise;
};

export const OpenFile = async (path: string) => {
  const promise = new Promise(function(resolve, reject) {
    fs.readFile(path, "utf8", function(err: Error, data: string) {
      if (err) { reject(err); }
      resolve(data);
      // data is the contents of the text file we just read
    });
  });
  return promise;
};

export const WriteToFile = async (path: string, data: string) => {
  const promise = new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf-8", (err: Error) => {
      if (err) { reject(err); } else { resolve(); }
    });
  });

  return promise;
};

export const ExecuteFile = (path: string) => {
  shell.openItem(path);
};

export const OpenLink = (url: string) => {
  shell.openExternal(url);
};
