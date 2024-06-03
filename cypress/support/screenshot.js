const fs = require('fs');

function getScreenshotConfig() {
  const configPath = 'cypress/fixtures/config.json';
  const configData = fs.readFileSync(configPath);
  return JSON.parse(configData);
}

module.exports = { getScreenshotConfig };
