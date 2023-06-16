import os
import openai
from flask import render_template, Flask, request, jsonify 

openai.api_key = "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"

app = Flask(__name__, static_folder='static')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        message = request.form['message']
        response = ask_question(message)
        return jsonify({'answer': response})
    else:
        return render_template('index.html')

def ask_question(message):
    # Your code to interact with the OpenAI API or perform any necessary backend processing goes here
    # Make the necessary API call or handle the logic to generate a response
    # Replace the code below with your actual implementation

    response = "This is the response from the server"
    return response
    
def index():
  if request.method == 'POST':
    message = request.form['message']
    response = ask_question(message)
    return jsonify({'answer': response})
  else:
    return jsonify({'error': 'Invalid request'})


if __name__ == '__main__':
    app.run()
