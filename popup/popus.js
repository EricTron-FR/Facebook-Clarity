document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('toggleButton');
    chrome.storage.local.get('extensionEnabled', data => {
        button.textContent = data.extensionEnabled ? 'The extension is ON' : 'The extension is OFF';
    });

    button.addEventListener('click', () => {
        chrome.storage.local.get('extensionEnabled', data => {
            const newState = !data.extensionEnabled;
            chrome.storage.local.set({ 'extensionEnabled': newState });
            button.textContent = newState ? 'The extension is ON' : 'The extension is OFF';
            chrome.runtime.sendMessage({ extensionEnabled: newState });
        });
    });
});
