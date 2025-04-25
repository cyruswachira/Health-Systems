from flask_restful import Api, Resource
from flask import Blueprint, request
from flask_jwt_extended import create_access_token
from werkzeug.exceptions import BadRequest
from models import db, Program, Client, User
from flask_cors import CORS


api_bp = Blueprint('api', __name__)
api = Api(api_bp)


CORS(api_bp, resources={r"/*": {"origins": "*"}})

class RegisterUserResource(Resource):
    def post(self):
        try:
            data = request.get_json(force=True)

            if not data:
                return {"message": "No input data provided"}, 400

            required_fields = ["username", "email", "password"]
            missing = [f for f in required_fields if not data.get(f)]

            if missing:
                return {"message": f"Missing fields: {', '.join(missing)}"}, 400

            username = data["username"].strip()
            email = data["email"].strip()
            password = data["password"].strip()

            if not username or not email or not password:
                return {"message": "Username, email, and password cannot be empty."}, 400

            if User.query.filter_by(email=email).first():
                return {"message": "User with this email already exists."}, 400

            new_user = User(username=username, email=email)
            new_user.set_password(password)

            db.session.add(new_user)
            db.session.commit()

            return {"message": "User created successfully!"}, 201

        except Exception as e:
            return {"message": f"Error creating user: {str(e)}"}, 500


class LoginUserResource(Resource):
    def post(self):
        try:
            data = request.get_json()

            if not data or 'email' not in data or 'password' not in data:
                return {"message": "Email and password are required."}, 400

            user = User.query.filter_by(email=data['email']).first()

            if user and user.check_password(data['password']):
                access_token = create_access_token(identity=user.id)
                return {
                    "message": "Login successful",
                    "access_token": access_token
                }, 200
            else:
                return {"message": "Invalid email or password"}, 401

        except Exception as e:
            return {"message": f"Error during login: {str(e)}"}, 500

class ProgramListResource(Resource):
    def get(self):
        try:
            programs = Program.query.all()
            return [{
                'id': p.id,
                'name': p.name,
                'description': p.description
            } for p in programs], 200
        except Exception as e:
            return {'message': f'Error fetching programs: {str(e)}'}, 500

    def post(self):
        try:
            data = request.get_json(force=True)
            if not data or 'name' not in data:
                raise BadRequest('Missing required program name')

            new_program = Program(
                name=data['name'],
                description=data.get('description', '')
            )
            db.session.add(new_program)
            db.session.commit()
            return {'message': 'Program added successfully'}, 201

        except BadRequest as e:
            return {'message': str(e)}, 400
        except Exception as e:
            return {'message': f'Error adding program: {str(e)}'}, 500

class ClientListResource(Resource):
    def get(self):
        try:
            clients = Client.query.all()
            return [{
                'id': c.id,
                'name': c.name,
                'email': c.email,
                'phone': c.phone,
                'gender': c.gender,
                'selectedPrograms': c.selected_programs
            } for c in clients], 200
        except Exception as e:
            return {'message': f'Error fetching clients: {str(e)}'}, 500

    def post(self):
        try:
            data = request.get_json()
            required_fields = ['name', 'email', 'phone', 'gender']
            for field in required_fields:
                if field not in data:
                    return {'message': f'Missing field: {field}'}, 400

            new_client = Client(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                gender=data['gender'],
                selected_programs=data.get('selectedPrograms', [])
            )
            db.session.add(new_client)
            db.session.commit()
            return {'message': 'Client registered'}, 201
        except Exception as e:
            return {'message': f'Error registering client: {str(e)}'}, 500

class ClientResource(Resource):
    def get(self, client_id):
        try:
            client = Client.query.get_or_404(client_id)
            return {
                'id': client.id,
                'name': client.name,
                'email': client.email,
                'phone': client.phone,
                'gender': client.gender,
                'selectedPrograms': client.selected_programs
            }, 200
        except Exception as e:
            return {'message': f'Error fetching client: {str(e)}'}, 500

    def put(self, client_id):
        try:
            client = Client.query.get_or_404(client_id)
            data = request.get_json()
            client.name = data.get('name', client.name)
            client.email = data.get('email', client.email)
            client.phone = data.get('phone', client.phone)
            client.gender = data.get('gender', client.gender)
            client.selected_programs = data.get('selectedPrograms', client.selected_programs)
            db.session.commit()
            return {'message': 'Client updated'}, 200
        except Exception as e:
            return {'message': f'Error updating client: {str(e)}'}, 500

    def delete(self, client_id):
        try:
            client = Client.query.get_or_404(client_id)
            db.session.delete(client)
            db.session.commit()
            return {'message': 'Client deleted'}, 200
        except Exception as e:
            return {'message': f'Error deleting client: {str(e)}'}, 500


api.add_resource(ProgramListResource, '/programs')
api.add_resource(ClientListResource, '/clients')
api.add_resource(ClientResource, '/clients/<int:client_id>')
api.add_resource(RegisterUserResource, '/signup')
api.add_resource(LoginUserResource, '/login')
