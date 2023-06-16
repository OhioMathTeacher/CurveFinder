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
    .then(response => {
      console.log('Response:', response); // Add this line to check the response
      return response.json();
    })
    .then(data => {
      const answer = data.answer;
      displayChatGPTMessage(answer);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}




document.getElementById('sendButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value;
    sendMessageToChatGPT(message);
    userInput.value = '';
});

function displayChatGPTMessage(message) {
  const chatLog = document.getElementById('chatlog');
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-gpt-message';
  messageElement.textContent = message;
  chatLog.appendChild(messageElement);

  // Scroll to the bottom of the chat log
  chatLog.scrollTop = chatLog.scrollHeight;
}

