from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db, bcrypt
from resources import api_bp 

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hmis.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

app.register_blueprint(api_bp, url_prefix='/api')

with app.app_context():
    db.create_all()

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if email == 'test@example.com' and password == 'password':
            return {
                "message": "Login successful!",
                "token": "dummy-jwt-token"
            }, 200
        else:
            return {
                "message": "Invalid credentials"
            }, 401
    except Exception as e:
        return {
            "message": "Server error",
            "error": str(e)
        }, 500

if __name__ == '__main__':
    app.run(debug=True)
