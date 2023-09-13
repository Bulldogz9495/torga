const { contextBridge, ipcRenderer } = require('electron')



// Expose a function to get the version of node, chrome, and electron used by the app in the renderer
contextBridge.exposeInMainWorld('ipcBridge', {
    node: () => process.ipcBridge.node,
    chrome: () => process.ipcBridge.chrome,
    electron: () => process.ipcBridge.electron,
    requestFileList: () => ipcRenderer.invoke('request-file-list'),
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)