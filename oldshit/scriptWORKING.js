window.onload = function() {
    
function sendMessageToChatGPT(message) {
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
        const answer = data.answer;
        displayChatMessage(answer); // Display the ChatGPT response
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayChatMessage(message, role = 'bot') {
    const chatLog = document.getElementById('chatlog');
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${role}`;
    messageElement.textContent = message;
    chatLog.prepend(messageElement);  // Here, we are prepending the new message

    // This will automatically scroll to the bottom of the chat log
    chatLog.scrollTop = chatLog.scrollHeight;
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
