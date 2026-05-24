const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");

const HOME_URL = "https://799342382.github.io/live-gifts/#home";

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    title: "AI工具箱",
    backgroundColor: "#0b0f19",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    }
  });

  win.loadFile(path.join(__dirname, "app", "index.html"), {
    query: { home: HOME_URL }
  });

  win.once("ready-to-show", () => win.show());

  // 外部链接用系统浏览器打开（更像软件，不会在应用里迷路）
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (e, url) => {
    const isFile = url.startsWith("file:");
    if (!isFile) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  if (process.platform === "win32") {
    app.setAppUserModelId("com.guojin.aitoolbox");
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// 窗口控制
ipcMain.handle("win:minimize", () => win && win.minimize());
ipcMain.handle("win:toggleMaximize", () => {
  if (!win) return;
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
});
ipcMain.handle("win:close", () => win && win.close());
ipcMain.handle("app:openExternal", (_, url) => shell.openExternal(url));
