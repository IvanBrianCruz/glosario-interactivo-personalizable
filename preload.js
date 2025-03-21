const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getAudios: (letra) => ipcRenderer.invoke('get-audios', letra)
});
