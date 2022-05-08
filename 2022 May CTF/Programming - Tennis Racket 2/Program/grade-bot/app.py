from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route("/")
def index():
    ua = request.headers.get('User-Agent')

    template = '''
    
    <h1>Hi! Grade-bot is still a work-in-progress.</h1>
    <p>Here is some debug information:</p>
    
    {}
    
    '''.format(ua)

    return render_template_string(template)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)