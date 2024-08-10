chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        chrome.tabs.create({ url: 'https://t.me/lpuautomation' });
    }
});

console.log("Developed By Harsh Singh, Follow me on Telegram https://t.me/lpuautomation, Follow me on GitHub https://github.com/harshsingh360/, Follow me on LinkedIn https://www.linkedin.com/in/harshcodes/");



function extractAndStoreAnswers() {
    const answerSpans = document.querySelectorAll('span[id^="correct_answer_span_"]');
    const answerKeys = Array.from(answerSpans).map(span => span.textContent.trim());

    chrome.storage.local.set({ 'correctAnswers': answerKeys }, () => {
        if (chrome.runtime.lastError) {
            console.error('Error storing data:', chrome.runtime.lastError);
        } else {
            console.log('Correct answers stored:', answerKeys);
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getStoredAnswers") {
        chrome.storage.local.get('correctAnswers', (data) => {
            sendResponse({ answers: data.correctAnswers });
        });
        return true; // Indicates that the response will be sent asynchronously
    }
});

function applyAnswersAndNavigate() {
    chrome.storage.local.get('correctAnswers', (data) => {
        const correctAnswers = data.correctAnswers || [];

        correctAnswers.forEach((answer, index) => {
            const questionNumber = index + 1;
            console.log(`Looking for input with selector: input[type="radio"][data-qno="${questionNumber}"][value="${lowerCaseAnswer}"]`);
            
            const answerInput = document.querySelector(`input[type="radio"][data-qno="${questionNumber}"][value="${lowerCaseAnswer}"]`);
            
            if (answerInput) {
                answerInput.checked = true;
                console.log(`Answer for question ${questionNumber} selected.`);
                const saveNextButton = document.querySelector('a.button.savenext');
            } else {
                console.error(`Input for question ${questionNumber} with value ${lowerCaseAnswer} not found.`);
            }
        });
    });
}

