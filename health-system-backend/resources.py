from flask import Blueprint, request
from flask_restful import Api, Resource
from models import db, Program, Client

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

class ProgramListResource(Resource):
    def get(self):
        programs = Program.query.all()
        return [{'id': p.id, 'name': p.name, 'description': p.description} for p in programs]

    def post(self):
        data = request.get_json()
        new_program = Program(name=data['name'], description=data.get('description'))
        db.session.add(new_program)
        db.session.commit()
        return {'message': 'Program added'}, 201

class ClientListResource(Resource):
    def get(self):
        clients = Client.query.all()
        return [{
            'id': c.id,
            'name': c.name,
            'email': c.email,
            'phone': c.phone,
            'gender': c.gender,
            'selectedPrograms': c.selected_programs
        } for c in clients]

    def post(self):
        data = request.get_json()
        new_client = Client(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            gender=data['gender'],
            selected_programs=data['selectedPrograms']
        )
        db.session.add(new_client)
        db.session.commit()
        return {'message': 'Client registered'}, 201

# For update and delete:
class ClientResource(Resource):
    def put(self, client_id):
        client = Client.query.get_or_404(client_id)
        data = request.get_json()
        client.name = data.get('name', client.name)
        client.email = data.get('email', client.email)
        client.phone = data.get('phone', client.phone)
        client.gender = data.get('gender', client.gender)
        client.selected_programs = data.get('selectedPrograms', client.selected_programs)
        db.session.commit()
        return {'message': 'Client updated'}, 200

    def delete(self, client_id):
        client = Client.query.get_or_404(client_id)
        db.session.delete(client)
        db.session.commit()
        return {'message': 'Client deleted'}, 200

api.add_resource(ProgramListResource, '/programs')
api.add_resource(ClientListResource, '/clients')
api.add_resource(ClientResource, '/clients/<int:client_id>')
