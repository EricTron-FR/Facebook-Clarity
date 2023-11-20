chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 'extensionEnabled': true });
  setIcon(true);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('extensionEnabled');

  if (message.hasOwnProperty('extensionEnabled')) {
      setIcon(message.extensionEnabled);
  }
});

function setIcon(isEnabled) {
  const iconPath = isEnabled ? 'images/icon128.png' : 'images/icon128-red.png';
  chrome.action.setIcon({ path: iconPath });
}