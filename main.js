const { app, shell } = require("electron");

const HOME_URL = "https://799342382.github.io/live-gifts/#home";

// 防止连点/重复启动：同一时间只打开一次网页
let openedAt = 0;
function openOnce() {
  const now = Date.now();
  if (now - openedAt < 1500) return; // 1.5秒内不重复打开
  openedAt = now;
  shell.openExternal(HOME_URL);
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // 用户重复点图标时，不再打开第二个
    openOnce();
  });

  app.whenReady().then(() => {
    if (process.platform === "win32") {
      app.setAppUserModelId("com.guojin.aitoolbox");
    }

    // 只用默认浏览器打开网页，不在软件里嵌一个浏览器
    openOnce();

    // 稍微等一下再退出，避免用户连点打开多个
    setTimeout(() => app.quit(), 1200);
  });
}
