const
  electron = require("electron");
  app = electron.app;
  BrowserWindow = electron.BrowserWindow,
  path = require("path");
  url = require("url");

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 768, titleBarStyle: "hidden-inset"});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true,
  }));

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
