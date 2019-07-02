const {ipcRenderer} = (window as any).require("electron");

const closeFunctions: Array<(c: () => void) => void> = [];

ipcRenderer.on("close-notif", async () => {
  const promises: Array<Promise<void>> = [];
  for (const func of closeFunctions) {
    promises.push(new Promise((res, rej) => {
      func(res);
      setTimeout(rej, 5000);
    }));
  }
  await Promise.all(promises);
  ipcRenderer.send("close-action", "close");
});

export const close =  (f: (c: () => void) => void) => closeFunctions.push(f);
