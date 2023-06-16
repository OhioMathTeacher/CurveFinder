import os
import openai
import config
# The `config` module will set the environment variables
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
print(f'API Key: {os.getenv("OPENAI_API_KEY")}')


app = Flask(__name__, static_folder='static')

@app.route('/ask', methods=['POST'])
def ask():
    try:
        message = request.json['message']
        response = ask_question(message)
        return jsonify({'answer': response['choices'][0]['message']['content']})
    except Exception as e:
        print(f'Error: {str(e)}')
        return jsonify({'error': str(e)}), 500


@app.route('/')    
def index():
    return render_template('index.html')

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
    return response['choices'][0]['message']['content']  # Extract the assistant's reply

if __name__ == '__main__':
    app.run(host='0.0.0.0')

