import {app, BrowserWindow, dialog} from "electron"
import * as path from "path"
import * as Server from "./server"

let win;

function createWindow() {

    win = new BrowserWindow({
        width: 800, 
        height : 600,
        minWidth: 300,
        minHeight: 400,
        icon: path.join(__dirname, "../assets", "mde-logo-bg-sm.png"),
    });
    
    win.loadURL("file://" + __dirname + "/../index.html");
    
    // win.webContents.openDevTools();

    global["appLocales"] = app.getLocale();
    Server.initializeLocalesWindowService(app.getLocale());
    Server.initializeMarkdownTokenizerService();
    Server.initializeBrowserWindowService(win);
    Server.initializeDialogService();
    Server.initializeFileService();
    Server.initializeExportService();
    
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})
