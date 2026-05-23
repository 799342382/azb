const { app, BrowserWindow, BrowserView } = require('electron');

const HOME_URL = 'https://799342382.github.io/live-gifts/#home';

let win;
let view;

function createWindow() {

  win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    autoHideMenuBar: true,
    title: 'AI工具箱',
    backgroundColor: '#111827'
  });

  view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.setBrowserView(view);

  const updateView = () => {
    const bounds = win.getContentBounds();

    view.setBounds({
      x: 0,
      y: 50,
      width: bounds.width,
      height: bounds.height - 50
    });
  };

  updateView();

  win.on('resize', updateView);

  const navHTML = `
  <!DOCTYPE html>
  <html>
  <body style="
    margin:0;
    background:#111827;
    overflow:hidden;
    font-family:sans-serif;
  ">

    <div style="
      height:50px;
      background:#111827;
      display:flex;
      align-items:center;
      gap:10px;
      padding:0 12px;
      box-sizing:border-box;
      border-bottom:1px solid #222;
    ">

      <button id="back">←</button>
      <button id="forward">→</button>
      <button id="refresh">⟳</button>
      <button id="home">🏠</button>

      <div id="url" style="
        flex:1;
        height:34px;
        background:#1f2937;
        color:white;
        border-radius:8px;
        display:flex;
        align-items:center;
        padding:0 12px;
        font-size:13px;
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
      ">
        ${HOME_URL}
      </div>

    </div>

    <script>

      const { ipcRenderer } = require('electron');

      document.getElementById('back').onclick = () => {
        ipcRenderer.send('go-back');
      };

      document.getElementById('forward').onclick = () => {
        ipcRenderer.send('go-forward');
      };

      document.getElementById('refresh').onclick = () => {
        ipcRenderer.send('refresh');
      };

      document.getElementById('home').onclick = () => {
        ipcRenderer.send('go-home');
      };

    </script>

  </body>
  </html>
  `;

  const topBar = new BrowserWindow({
    parent: win,
    frame: false,
    transparent: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    width: 1400,
    height: 50,
    x: 0,
    y: 0,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  topBar.loadURL(
    'data:text/html;charset=utf-8,' +
    encodeURIComponent(navHTML)
  );

  topBar.setAlwaysOnTop(true);

  win.on('resize', () => {
    const bounds = win.getBounds();

    topBar.setBounds({
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: 50
    });
  });

  const { ipcMain } = require('electron');

  ipcMain.on('go-back', () => {
    if (view.webContents.canGoBack()) {
      view.webContents.goBack();
    }
  });

  ipcMain.on('go-forward', () => {
    if (view.webContents.canGoForward()) {
      view.webContents.goForward();
    }
  });

  ipcMain.on('refresh', () => {
    view.webContents.reload();
  });

  ipcMain.on('go-home', () => {
    view.webContents.loadURL(HOME_URL);
  });

  view.webContents.loadURL(HOME_URL);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

