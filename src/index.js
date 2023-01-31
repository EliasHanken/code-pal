const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require("electron");
const path = require("path");
const fileHandler = require("./io/file-handler");

try {
  require("electron-reloader")(module);
} catch (_) {}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let globalMainWindow;

const createWindow = () => {
  // Create the browser window.
  globalMainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  globalMainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  globalMainWindow.webContents.openDevTools();
};

const menuItems = [
  {
    label: "File",
    submenu: [
      {
        label: "New Text File",
        click: async () => {},
      },
      {
        label: "New File",
        click: async () => {},
      },
      {
        type: "separator",
      },
      {
        label: "Open File...",
        click: async () => {
          fileHandler.openFile(globalMainWindow);
        },
      },
      {
        label: "Open Folder...",
        click: async () => {},
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "Minimize",
      },
      {
        role: "close",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
