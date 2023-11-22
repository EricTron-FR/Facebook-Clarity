chrome.storage.local.get('extensionEnabled', data => {
    if (data.extensionEnabled) {
        initContentScript();
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'extensionEnabled' && newValue === true) {
            initContentScript();
        }
    }
});

function initContentScript() {

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeDivContainingSpan();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const searchTexts = ['Suggested for you', 'Suggestions', 'Sugerencia para ti','Vorschläge für dich','Contenuto suggerito per te'];


    function removeDivContainingSpan() {
        const spans = document.querySelectorAll('span');
    
        for (let span of spans) {
            if (searchTexts.some(text => span.textContent.includes(text))) {
                let currentElement = span;
    
                while (currentElement && currentElement.className !== 'x1lliihq') {
                    currentElement = currentElement.parentElement;
                }
    
                if (currentElement) {
                    currentElement.remove();
                    break;
                }
            }
        }
    }
}
