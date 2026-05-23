const { app, BrowserWindow, shell } = require("electron");

// 把下面这行改成你的网页链接（你现在这个链接我已帮你填好）
const APP_URL = "https://799342382.github.io/live-gifts/#home";

// 这里是你的主域名（一般不用改；如果你换了域名再改）
const ALLOW_ORIGIN = "https://799342382.github.io";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL(APP_URL);

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    const current = win.webContents.getURL();
    const isSame = url === current;
    const isAllow = url.startsWith(ALLOW_ORIGIN) || url.startsWith("file:");
    if (!isSame && !isAllow) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
