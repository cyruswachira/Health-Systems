from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from models import db, Program, Client
from werkzeug.exceptions import BadRequest
from flask_cors import CORS

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# Enable CORS for the entire API
CORS(api_bp, resources={r"/*": {"origins": "*"}})

class ProgramListResource(Resource):
    def get(self):
        try:
            programs = Program.query.all()
            return jsonify([{
                'id': p.id,
                'name': p.name,
                'description': p.description
            } for p in programs])
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
            return jsonify([{
                'id': c.id,
                'name': c.name,
                'email': c.email,
                'phone': c.phone,
                'gender': c.gender,
                'selectedPrograms': c.selected_programs
            } for c in clients])
        except Exception as e:
            return {'message': f'Error fetching clients: {str(e)}'}, 500

    def post(self):
        try:
            data = request.get_json()
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
            return jsonify({
                'id': client.id,
                'name': client.name,
                'email': client.email,
                'phone': client.phone,
                'gender': client.gender,
                'selectedPrograms': client.selected_programs
            })
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
