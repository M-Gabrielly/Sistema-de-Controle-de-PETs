from flask import Blueprint, jsonify, request
from app.models.PET import PET
from app.models.SistemaPET import SistemaPET

pet_bp = Blueprint('pets', __name__)
sistema = SistemaPET()

@pet_bp.route("/criar_pet", methods=['POST'])
def criar_pet():
    # Pega json enviado do front
    data = request.get_json()
    print("Pet recebido:", data)

    #verifica se nome é nulo
    if data.get("nome") == '':
        print("não dai nao")
        return jsonify({"message": "Nome do PET é obrigatório!"}), 400
    
    return jsonify({"message": "ok"}), 201

@pet_bp.route("/listar_pets", methods=["GET"])
def listar_pets():
    pets = sistema.listarPETs()
    return jsonify({"pets": pets}), 200