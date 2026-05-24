# AI工具箱（桌面版）

把本压缩包里的文件，覆盖上传到你的 GitHub 仓库根目录即可。

需要覆盖/新增：
- main.js
- preload.js（新增）
- package.json
- app/index.html（新增）
- .github/workflows/build-windows.yml

上传后去 GitHub Actions 里手动运行：Build Windows Installer
运行成功后，在 Actions 的 Artifacts 里下载安装包（exe）。
