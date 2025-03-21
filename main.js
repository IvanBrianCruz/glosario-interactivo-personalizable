const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Crear la ventana de la aplicación
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // Cargar el archivo preload
    }
  });

  mainWindow.loadFile('index.html'); // Cargar la página de inicio
}

// Manejar la solicitud de obtener los audios
ipcMain.handle('get-audios', async (event, letra) => {
  if (!letra) {
    console.error('La letra es inválida o no se ha proporcionado.');
    return [];
  }

  const folderPath = path.join(__dirname, 'audios', letra);
  
  try {
    const files = await fs.promises.readdir(folderPath);
    return files.map(file => ({ name: file }));
  } catch (err) {
    console.error('Error al leer los archivos:', err);
    return [];
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
