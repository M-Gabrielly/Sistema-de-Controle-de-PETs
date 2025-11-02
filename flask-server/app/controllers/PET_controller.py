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
    if data.get("status") not in status_validos:
        return jsonify({"message": "Status inválido!"}), 400

    # Se veio dono_id, valida existência
    dono_id = data.get("dono_id")
    if dono_id is not None:
        dono = sistema.buscarClientePorId(dono_id)
        if dono is None:
            return jsonify({"message": "dono_id inválido: cliente não encontrado"}), 400

    sistema.cadastrarPET(data.get("nome"), data.get("idade"), data.get("especie"), data.get("status"), dono_id=dono_id)
    return jsonify({"message": "Pet criado com sucesso!"}), 201


@pet_bp.route("/atualiza_status", methods=['POST'])
def atualiza_status():
    # Pega json enviado do front
    data = request.get_json()
    print("Valores recebidos:", data)

    status_validos = ["Atendido", "Aguardando atendimento", "Em consulta"]
    if not data.get("status") or data.get("status") not in status_validos:
        return jsonify({"message": "Status inválido!"}), 400

    # Busca o pet
    pet_selecionado = sistema.buscarPorId(data.get("id"))
    if pet_selecionado is None:
        return jsonify({"message": "Nenhum PET encontrado"}), 404

    # Atualiza o status
    pet_selecionado.status = data.get("status")
    return jsonify({"message": "Status atualizado com sucesso!"}), 200


@pet_bp.route("/listar_pets", methods=["GET"])
def listar_pets():
    # Pega lista de pets do SistemaPET.py
    pets = sistema.listarPETs()
    print(pets)
    return jsonify({"pets": pets}), 200


# --- rotas simples para clientes ---
@pet_bp.route("/criar_cliente", methods=["POST"])
def criar_cliente():
    data = request.get_json()
    print("Cliente recebido:", data)

    campos_obrigatorios = ["nome", "telefone"]
    for campo in campos_obrigatorios:
        if not data.get(campo) or data.get(campo) == '':
            return jsonify({"message": f"O campo '{campo}' é obrigatório!"}), 400

    sistema.cadastrarCliente(data.get("nome"), data.get("telefone"))
    novo = sistema.clientes[-1].to_array() if sistema.clientes else None
    return jsonify({"message": "Cliente criado com sucesso!", "cliente": novo}), 201


@pet_bp.route("/listar_clientes", methods=["GET"])
def listar_clientes():
    clientes = sistema.listarClientes()
    print(clientes)
    return jsonify({"clientes": clientes}), 200


@pet_bp.route("/buscar_cliente/<int:id>", methods=["GET"])
def buscar_cliente(id):
    cliente = sistema.buscarClientePorId(id)
    if cliente is None:
        return jsonify({"message": "Cliente não encontrado"}), 404
    return jsonify({"cliente": cliente.to_array()}), 200