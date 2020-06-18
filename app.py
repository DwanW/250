from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from farmers import Farmers 


app = Flask(__name__)
CORS(app)
# CORS(app, supports_credentials=True)


app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'jose'
api = Api(app)


@app.route("/")
def helloWorld():
  return "Hello, Welcome to Farmers' Market API!"


api.add_resource(Farmers, '/farmers')

if __name__ == '__main__':
    app.run(debug=True)  # important to mention debug=True