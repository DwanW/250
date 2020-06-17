from flask import Flask
from flask_cors import CORS
from flask_restful import Api

app = Flask(__name__)
CORS(app)


app = Flask(__name__)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'jose'
api = Api(app)



# api.add_resource(Item, '/item/<string:name>')

# @app.route("/")
# def helloWorld():
#   return "Hello, cross-origin-world!"

if __name__ == '__main__':
    app.run(debug=True)  # important to mention debug=True