import React, { useEffect, useState } from "react";

const AppConfigPage = () => {
  const [biometricPath, setBiometricPath] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [status, setStatus] = useState({ message: "", color: "" });

  useEffect(() => {
    ConfigAPI.getConfig()
      .then((response) => {
        if (response.success) {
          setBiometricPath(response.config.biometricPath || "");
          setApiUrl(response.config.apiUrl || "");
        } else {
          console.error(`Error fetching config: ${response.error}`);
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newConfig = { biometricPath, apiUrl };
    ConfigAPI.updateConfig(newConfig)
      .then((response) => {
        if (response.success) {
          alert("Configuration saved successfully!");
        } else {
          alert(`Error: ${response.error}`);
        }
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-0">
      <main className="w-full flex-1 px-0 pt-2 pb-8">
        <form id="configForm" onSubmit={handleSubmit} className="w-full px-4 md:px-8">
          <div className="flex flex-col w-full border-b border-gray-200">
            <label htmlFor="biometricPath" className="pt-4 pb-1 text-sm text-gray-500 font-medium">Biometric Path</label>
            <textarea
              type="text"
              id="biometricPath"
              name="biometricPath"
              required
              value={biometricPath}
              onChange={(e) => setBiometricPath(e.target.value)}
              className="py-3 text-base bg-gray-50 border-0 border-b border-gray-200 focus:bg-white focus:border-blue-400 focus:ring-0 outline-none transition w-full field-sizing-content px-3"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col w-full border-b border-gray-200">
            <label htmlFor="apiUrl" className="pt-4 pb-1 text-sm text-gray-500 font-medium">API URL</label>
            <textarea
              type="text"
              id="apiUrl"
              name="apiUrl"
              required
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="py-3 text-base bg-gray-50 border-0 border-b border-gray-200 focus:bg-white focus:border-blue-400 focus:ring-0 outline-none transition w-full field-sizing-content px-3"
              autoComplete="off"
            />
          </div>
          <div className="py-4 bg-transparent">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-none w-full"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AppConfigPage;