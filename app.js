const
  { app, BrowserWindow, Menu } = require("electron");
  path = require("path");
  url = require("url");

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 960, height: 640, titleBarStyle: "hidden-inset"});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true,
  }));

  createMenu(); // create menu

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

/**
 * internal
 */

function createMenu() {
  // Create the Application's main menu
  let template = [
    {
      label: "Mania",
      submenu: [
        { label: "Hide", accelerator: "Command+H", selector: "hide:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }},
      ],
    },
    {
      label: "Queries",
      submenu: [
        { label: "Previous Step", accelerator: "Command+K", click: function() { mainWindow.webContents.send("KEYBOARD", "PREVIOUS_STEP"); }},
        { label: "Next Step", accelerator: "Command+J", click: function() { mainWindow.webContents.send("KEYBOARD", "NEXT_STEP"); }},
        { label: "Excute Step", accelerator: "Command+Enter", click: function() { mainWindow.webContents.send("KEYBOARD", "EXECUTE_STEP"); }},
        { type: "separator" },
        { label: "Previous Query", accelerator: "Command+Shift+K", click: function() { mainWindow.webContents.send("KEYBOARD", "PREVIOUS_QUERY"); }},
        { label: "Next Query", accelerator: "Command+Shift+J", click: function() { mainWindow.webContents.send("KEYBOARD", "NEXT_QUERY"); }},
        { label: "Next Query", accelerator: "Command+Shift+Enter", click: function() { mainWindow.webContents.send("KEYBOARD", "EXECUTE_QUERY"); }},
      ],
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
