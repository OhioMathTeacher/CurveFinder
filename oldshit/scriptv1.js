document.addEventListener('DOMContentLoaded', function() {
    const chatlog = document.getElementById('chatlog');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', function() {
        const message = userInput.value;
        if (message) {
            displayUserMessage(message);
            sendMessageToChatGPT(message);
            userInput.value = '';
        }
    });

    function displayUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = message;
        chatlog.appendChild(userMessage);
    }

    function displayChatGPTMessage(message) {
        const chatGPTMessage = document.createElement('div');
        chatGPTMessage.className = 'message chatgpt-message';
        chatGPTMessage.textContent = message;
        chatlog.appendChild(chatGPTMessage);
    }

   function sendMessageToChatGPT(message) {
    // Create an object to hold the message data
    const data = {
        message: message
    };

    // Make an AJAX request to your Flask server or directly to the OpenAI API
    // Adjust the URL and other parameters based on your setup
    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const answer = data.answer; // Assuming the server/API responds with an 'answer' property
        displayChatGPTMessage(answer);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
});

