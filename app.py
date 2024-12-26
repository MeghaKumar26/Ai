from flask import Flask, render_template, request, jsonify
import openai  # Install with `pip install openai`

app = Flask(__name__)

# OpenAI API Key (replace with your own)
openai.api_key = "your_openai_api_key"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get-response', methods=['POST'])
def get_response():
    user_message = request.json.get("message")

    try:
        # Query GPT-3.5 Turbo for a response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Serene AI, a mental health chatbot. Provide calming and helpful responses."},
                {"role": "user", "content": user_message}
            ]
        )
        bot_message = response.choices[0].message["content"]
        return jsonify({"response": bot_message})

    except Exception as e:
        return jsonify({"response": "I'm sorry, I encountered an error. Please try again later."})

if __name__ == '__main__':
    app.run(debug=True)
