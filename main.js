const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const squirrelEvent = process.argv[1];

if (squirrelEvent && squirrelEvent.startsWith("--squirrel")) {
  app.quit(); // 🚀 Nếu đang cài đặt, thoát luôn
}
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile("index.html");
};

app.whenReady().then(() => {
    ipcMain.handle("ping", (event,req) => {
        console.log("receive req:", req);
        return " response from main";
    });
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
