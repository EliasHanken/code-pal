const { dialog } = require("electron");
const fs = require("fs");

const openFileDialog = () => {
  return dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Text Files", extensions: ["txt", "md"] }],
  });
};

const readFileContents = (filePath) => {
  return fs.readFileSync(filePath, "utf8");
};

const openFile = async (mainWindow) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
  });
  const file = filePaths[0];
  const contents = readFileContents(file);
  mainWindow.webContents.send("file-contents", contents);
};

module.exports = {
  openFile,
};
