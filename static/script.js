const quotes = [
    '"The best way out is always through." – Robert Frost',
    '"You don’t have to control your thoughts. You just have to stop letting them control you." – Dan Millman',
    '"Happiness can be found even in the darkest of times, if one only remembers to turn on the light." – J.K. Rowling'
];

// Update the quote every 10 seconds
function updateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").textContent = quotes[randomIndex];
}
setInterval(updateQuote, 10000);

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (!userInput.trim()) return;

    // Display user message
    const userMessage = `<div class="message user">${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    // Clear input field
    document.getElementById("user-input").value = "";

    // Send user input to backend
    fetch("/get-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Display bot response
        const botMessage = `<div class="message bot">${data.response}</div>`;
        chatBox.innerHTML += botMessage;
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        const errorMessage = `<div class="message bot">Error: Could not get a response.</div>`;
        chatBox.innerHTML += errorMessage;
    });
}
