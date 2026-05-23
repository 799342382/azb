const { app, BrowserWindow } = require('electron');

const HOME_URL = 'https://799342382.github.io/live-gifts/#home';

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // 顶部导航栏
  const navBar = `
    <div style="
      width:100%;
      height:50px;
      background:#111827;
      display:flex;
      align-items:center;
      padding:0 10px;
      gap:10px;
      box-sizing:border-box;
      position:fixed;
      top:0;
      left:0;
      z-index:9999;
    ">
      <button onclick="history.back()">← 返回</button>
      <button onclick="history.forward()">→ 前进</button>
      <button onclick="location.reload()">⟳ 刷新</button>
      <button onclick="location.href='${HOME_URL}'">🏠 首页</button>
    </div>
    <iframe 
      id="app"
      src="${HOME_URL}"
      style="
        position:fixed;
        top:50px;
        left:0;
        width:100%;
        height:calc(100% - 50px);
        border:none;
      "
    ></iframe>
  `;

  win.loadURL(
    'data:text/html;charset=utf-8,' + encodeURIComponent(navBar)
  );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
