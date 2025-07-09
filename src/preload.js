import { contextBridge, ipcRenderer } from 'electron';

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

contextBridge.exposeInMainWorld('ConfigAPI', {
  updateConfig: (config) => ipcRenderer.invoke('update-config', config),
  getConfig: () => ipcRenderer.invoke('get-config'),
  getConfigValue: (key) => ipcRenderer.invoke('get-config-value', key),
  setConfigValue: (key, value) => ipcRenderer.invoke('set-config-value', key, value)
});
