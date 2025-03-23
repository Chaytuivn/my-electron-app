const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const squirrelEvent = process.argv[1];
const { autoUpdater } = require("electron-updater");

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

autoUpdater.on("update-available", () => {
    dialog
        .showMessageBox({
            type: "info",
            title: "Update Available",
            message: "Có bản cập nhật mới, bạn có muốn tải về không?",
            buttons: ["Có", "Không"],
        })
        .then((result) => {
            if (result.response === 0) autoUpdater.downloadUpdate();
        });
});

autoUpdater.on("update-downloaded", () => {
    dialog
        .showMessageBox({
            type: "info",
            title: "Update Ready",
            message: "Cập nhật đã tải xong. Khởi động lại ứng dụng để áp dụng?",
            buttons: ["Khởi động lại", "Để sau"],
        })
        .then((result) => {
            if (result.response === 0) autoUpdater.quitAndInstall();
        });
});

app.whenReady().then(() => {
    try {
        autoUpdater.checkForUpdates();
    } catch (e) {
        console.error("Update check failed:", e);
    }

    ipcMain.handle("ping", (event, req) => {
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
