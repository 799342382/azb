AI工具箱（默认浏览器启动器）

效果：
- 你点“AI工具箱”，它会用你电脑默认浏览器打开这个网址：
  https://799342382.github.io/live-gifts/#home
- 不会在软件里再嵌一个浏览器
- 1.5秒内重复点击不会打开第二个（防止两个窗口/两个标签）

你只需要覆盖上传这 3 个：
1) main.js
2) package.json
3) .github/workflows/build-windows.yml

然后 Actions 里运行 Build Windows Installer，下载安装包即可。
