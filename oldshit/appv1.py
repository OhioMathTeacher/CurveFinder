import os
import openai
openai.api_key = "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"

from flask import Flask
app = Flask(__name__)
@app.route('/', methods=['POST'])

def index():
    return render_template('index.html')
    
def ask_question():
    # Get the user's message from the request
    message = request.json['message']

    # Your code to interact with the OpenAI API or perform any necessary backend processing goes here
    # Make the necessary API call or handle the logic to generate a response

    # Once you have the response, you can send it back to the frontend
    response = {
        'answer': 'This is the response from the server'  # Replace with the actual response
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run()



def send_message(message):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ]
    )

    return completion.choices[0].message.content

# Conversation loop
while True:
    user_input = input("User: ")

    # Send user input and get response
    response = send_message(user_input)

    print(f'ChatGPT: {response}')
