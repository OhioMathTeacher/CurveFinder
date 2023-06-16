window.onload = function() {
    
function sendMessageToChatGPT(message) {
    displayChatMessage('user', message);
    const data = {
        message: message
    };

    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
     console.log(data);  // Log the data object to the console
     const answer = data.answer;
     displayChatMessage('chatgpt', answer); // Display the ChatGPT response
})

    .catch(error => {
        console.error('Error:', error);
    });
}

function displayChatMessage(sender, message) {
    const chatLog = document.getElementById('chatlog');
    const messageElement = document.createElement('div');
    messageElement.className = sender; // Here is where you're applying the class
    messageElement.textContent = sender.charAt(0).toUpperCase() + sender.slice(1) + ": " + message;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // Automatically scroll to the bottom
}


console.log('Event listener added.');
document.getElementById('sendButton').addEventListener('click', function() {
    console.log('Button clicked!');
    const userInput = document.getElementById('userInput');
    const message = userInput.value;
    sendMessageToChatGPT(message);
    userInput.value = '';
});
};
