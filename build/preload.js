"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ConfigAPI", {
  updateConfig: (config) => electron.ipcRenderer.invoke("update-config", config),
  getConfig: () => electron.ipcRenderer.invoke("get-config"),
  getConfigValue: (key) => electron.ipcRenderer.invoke("get-config-value", key),
  setConfigValue: (key, value) => electron.ipcRenderer.invoke("set-config-value", key, value)
});
