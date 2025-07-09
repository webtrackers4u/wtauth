import { app } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

const cacheLocation = path.join(app.getPath('userData'), 'cache');
const configFilePath = path.join(cacheLocation, 'config.json');

// Handle initializing the configuration directory and file
const initConfig = () => {
  if (!fs.existsSync(cacheLocation)) {
    fs.mkdirSync(cacheLocation, { recursive: true });
  }
  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(configFilePath, JSON.stringify({}));
  }
};

// Initialize the configuration file if it doesn't exist
const getConfig = () => {
  if (!fs.existsSync(configFilePath)) {
    return {};
  }
  const configData = fs.readFileSync(configFilePath, 'utf-8');
  try {
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error parsing config file:', error);
    return {};
  }
};

// Set the configuration file with new values
const setConfig = (newConfig) => {
  const currentConfig = getConfig();
  const updatedConfig = { ...currentConfig, ...newConfig };
  fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2));
  console.log('Config updated:', updatedConfig);
  return updatedConfig;
};

// Get a specific configuration value by key
const getConfigValue = (key) => {
  const configData = getConfig();
  return configData[key] ?? null;
};

// Set a specific configuration value by key
const setConfigValue = (key, value) => {
  const currentConfig = getConfig();
  currentConfig[key] = value;
  fs.writeFileSync(configFilePath, JSON.stringify(currentConfig, null, 2));
  console.log(`Config updated: ${key} = ${value}`);
  return currentConfig;
};

const AppConfig = {
  initConfig,
  getConfig,
  setConfig,
  getConfigValue,
  setConfigValue
};

export default AppConfig;