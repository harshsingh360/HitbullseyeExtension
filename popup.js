
document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startAutFill' });
});


document.getElementById('click').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'appAnswers' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'statUpdate') {
        document.getElementById('status').textContent = `Status: ${request.status}`;
    }
});

