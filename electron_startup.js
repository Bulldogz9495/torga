const { app, BrowserWindow, screen, ipcMain, globalShortcut, ipcRenderer, Menu, MenuItem } = require('electron')
const fs = require('fs');
const path = require('path');



require('update-electron-app')()

var mainWindow

if (require('electron-squirrel-startup')) app.quit()
// if first time install on windows, do not run application, rather
// let squirrel installer do its work
const setupEvents = require('./installers/setup-events')
if (setupEvents.handleSquirrelEvent()) {
  process.exit()
}


const createWindow = (width, height) => {
    const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Load the preload script
        },
    })
    mainWindow.setMenuBarVisibility(false)
    mainWindow.loadFile('index.html')
    mainWindow.openDevTools()
}

const createIPCHandlers = () => {
    ipcMain.handle('request-file-list', (event) => {
        try {
            // Read the list of files in the specified directory
            const files = fs.readdirSync(path.join(__dirname, 'user_files'));
            var reFiles = []
            files.forEach(filename => {reFiles.push(filename)})
            return reFiles;
        } catch (error) {
            console.error('Error reading directory:', error);
            return [];
        }
    });
    ipcMain.handle('save-file', (event, tasks, fileName) => {
        const jsonData = JSON.stringify(tasks, null, 2)
        const fullPath = path.join(process.cwd(), 'user_files', fileName)
        fs.writeFileSync(fullPath, jsonData)
        console.log('File saved successfully:', fullPath);
    })
    ipcMain.handle('load-file', (event, fileName) => {
        const fullPath = path.join(process.cwd(), 'user_files', fileName)
        let jsonData
        try {
            const data = fs.readFileSync(fullPath, 'utf8')
            jsonData = JSON.parse(data)
            console.log('File loaded successfully:', fullPath);
            return jsonData
        } catch (e) {
            return {subtasks: {}}
        }
    })
    ipcMain.handle('delete-file', (event, fileName) => {
        const fullPath = path.join(process.cwd(), 'user_files', fileName)
        try {
            fs.unlinkSync(fullPath)
            console.log('File deleted successfully:', fullPath);
        } catch (e) {
            console.log("Error Deleting File ", fullPath, e.message)
        }
    })
}

app.whenReady().then(() => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.size;
    createWindow(width, height)
    // Define an IPC handler to request the list of files
    createIPCHandlers()
})

// On macOS, it's common to keep the app running even when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})