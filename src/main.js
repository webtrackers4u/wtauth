import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import AppConfig from './backend/utils/app-config';
import BiometricWatcher from './backend/utils/biometric-watcher';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}


const initApp = async () => {
  AppConfig.initConfig();
  BiometricWatcher.startWatcher();
}
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    resizable: false,

    backgroundMaterial: 'dark',
    titleBarOverlay: {
      color: '#2c2c2c',
      symbolColor: '#fff',
      height: 30,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  initApp();
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  BiometricWatcher.closeWatcher();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('update-config', async (event, newConfig) => {
  console.log(`Updating config: `, {
    newConfig
  });

  AppConfig.setConfig(newConfig);
  return { success: true, config: AppConfig.getConfig() };

});

ipcMain.handle('get-config', async (event) => {
  const config =  AppConfig.getConfig();
  return { success: true, config: AppConfig.getConfig() };
});

ipcMain.handle('get-config-value', async (event, key) => {
  const value =  AppConfig.getConfigValue(key);
  return { success: true, value: value };
});

ipcMain.handle('set-config-value', async (event, key, value) => {
  const updatedConfig = AppConfig.setConfigValue(key, value);
  return { success: true, config: updatedConfig };
});

