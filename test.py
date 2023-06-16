import os
import openai

openai.api_key = "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"

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

