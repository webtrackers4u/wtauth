import fs from 'fs';
import axios from 'axios';
import AppConfig from './app-config.js';

let _watcher = null;

const sendFile = () => {
  const filePath = AppConfig.getConfigValue('biometricPath');
  const postUrl = AppConfig.getConfigValue('apiUrl');
  if (!filePath || !postUrl) {
    console.error('biometricPath or apiUrl not set in config');
    return;
  }

  if(!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${filePath}`);
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) return;
    axios.post(postUrl, data, {
      headers: { 'Content-Type': 'application/octet-stream' }
    }).then(res=>{
      if (res.status === 200) {
        console.log(`File sent successfully to ${postUrl}`);
      } else {
        console.error(`Failed to send file to ${postUrl}: ${res.statusText}`);
      }
    }).catch((err) => {
      console.error(`Error sending file to ${postUrl}:`, err.message);
    });
  });
};

const startWatcher = () => {
  const filePath = AppConfig.getConfigValue('biometricPath');
  _watcher = fs.watch(filePath, (eventType, filename) => {
    if (eventType === 'change') {
      console.log(`File changed: ${filename}`);
      sendFile();
    }
  });
  console.log(`Watching for changes on ${filePath}`);
};

const closeWatcher = () => {
  if (_watcher) {
    _watcher.close();
    const filePath = AppConfig.getConfigValue('biometricPath');
    console.log(`Stopped watching ${filePath}`);
  }
};

const BiometricWatcher = {
  startWatcher,
  closeWatcher
};

export default BiometricWatcher;