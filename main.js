const { app, BrowserWindow, shell } = require("electron");

const HOME_URL = "https://799342382.github.io/live-gifts/#home";

function isHttpUrl(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}

function createWindow(startUrl = HOME_URL) {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    title: "AI工具箱",
    backgroundColor: "#0b0f19",
    autoHideMenuBar: true,
    // 这里用系统自带窗口（像正常软件/浏览器），不做自定义顶部按钮
    frame: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL(startUrl);

  // 新开页面：在软件里再开一个窗口（接近浏览器“新标签”的感觉）
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isHttpUrl(url)) {
      createWindow(url);
      return { action: "deny" };
    }
    shell.openExternal(url);
    return { action: "deny" };
  });

  // 特殊链接（比如 mailto: / weixin: 等）交给系统打开
  win.webContents.on("will-navigate", (e, url) => {
    if (isHttpUrl(url)) return;
    e.preventDefault();
    shell.openExternal(url);
  });

  return win;
}

app.whenReady().then(() => {
  if (process.platform === "win32") {
    app.setAppUserModelId("com.guojin.aitoolbox");
  }
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
