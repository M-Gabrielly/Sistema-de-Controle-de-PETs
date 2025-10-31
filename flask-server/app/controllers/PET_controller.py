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

    # Verifica se todos os campos foram preenchidos
    campos_obrigatorios = ["nome", "idade", "especie", "status"]
    
    for campo in campos_obrigatorios:
        if not data.get(campo) or data.get(campo) == '':
            return jsonify({"message": f"O campo '{campo}' é obrigatório!"}), 400
    
    # Verifica se o status é válido
    status_validos = ["Atendido", "Aguardando atendimento", "Em consulta"]
    status = data.get("status")
    
    if status not in status_validos:
        return jsonify({"message": f"Status inválido! Use: {', '.join(status_validos)}"}), 400
    
    return jsonify({"message": "Pet criado com sucesso!"}), 201

@pet_bp.route("/atualiza_status", methods=['POST'])
def atualiza_status():
    # Pega json enviado do front
    data = request.get_json()
    print("Valores recebidos:", data)

    # verifica se status é válido
    status_validos = ["Atendido", "Aguardando atendimento", "Em consulta"]
    status = data.get("status")
    
    if not status or status not in status_validos:
        return jsonify({"message": "Status inválido! Deve ser: Atendido, Aguardando atendimento ou Em consulta"}), 400

    # Busca o pet
    pet_selecionado = sistema.buscarPorId(data.get("id"))
    
    if pet_selecionado is None:
        return jsonify({"message": "Nenhum PET encontrado"}), 404

    # Atualiza o status
    pet_selecionado.status = status
    
    print("Pet atualizado:", pet_selecionado)
    
    return jsonify({"message": "Status atualizado com sucesso!"}), 200

@pet_bp.route("/listar_pets", methods=["GET"])
def listar_pets():
    # Pega lista de pets do SistemaPET.py
    pets = sistema.listarPETs()
    print(pets)
    return jsonify({"pets": pets}), 200