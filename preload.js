const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("APP", {
  minimize: () => ipcRenderer.invoke("win:minimize"),
  toggleMaximize: () => ipcRenderer.invoke("win:toggleMaximize"),
  close: () => ipcRenderer.invoke("win:close"),
  openExternal: (url) => ipcRenderer.invoke("app:openExternal", url)
});
