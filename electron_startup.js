const { app, BrowserWindow, screen } = require('electron')

const createWindow = (width, height) => {
  const win = new BrowserWindow({
    width: width,
    height: height,
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.size;
    createWindow(width, height)
})