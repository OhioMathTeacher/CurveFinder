import os
import openai
import config
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
print(f'API Key: {os.getenv("OPENAI_API_KEY")}')

app = Flask(__name__, static_folder='static')

def ask_question(message):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": message
            }
        ]
    )

    print(response)  # Print the entire response for debugging purposes
    print(response['choices'][0]['message']['content'])  # Print the assistant's reply
    return response['choices'][0]['message']['content']  # Extract the assistant's reply

@app.route('/ask', methods=['POST'])
def ask():
    try:
        message = request.json['message']
        response = ask_question(message)
        print(f"Response from ask_question: {response}")  # Print the response from ask_question function
        return jsonify({'answer': response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')

