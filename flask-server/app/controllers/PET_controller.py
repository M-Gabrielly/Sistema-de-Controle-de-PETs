from flask import Blueprint, jsonify, request, current_app
from app.models.PET import PET
from app.models.SistemaPET import SistemaPET
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer as Serializer
from itsdangerous import BadSignature, SignatureExpired

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


# --- rotas simples para auth (usuários) ---
@pet_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'username e password são obrigatórios'}), 400

    # verifica se já existe
    if sistema.buscarUserPorUsername(username) is not None:
        return jsonify({'message': 'username já cadastrado'}), 400

    password_hash = generate_password_hash(password)
    user = sistema.cadastrarUser(username, password_hash)
    return jsonify({'message': 'Usuário criado', 'user': user.to_public()}), 201


@pet_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'username e password são obrigatórios'}), 400

    user = sistema.buscarUserPorUsername(username)
    if user is None or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Credenciais inválidas'}), 401

    secret = current_app.config.get('SECRET_KEY', 'troque-esta-chave-por-uma-segura')
    s = Serializer(secret)
    token = s.dumps({'id': user.id})
    return jsonify({'message': 'Login bem-sucedido', 'token': token, 'user': user.to_public()}), 200


@pet_bp.route('/me', methods=['GET'])
def me():
    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return jsonify({'message': 'Token não fornecido'}), 401
    token = auth.split(' ', 1)[1]
    secret = current_app.config.get('SECRET_KEY', 'troque-esta-chave-por-uma-segura')
    s = Serializer(secret)
    try:
        # valida com max_age em segundos
        data = s.loads(token, max_age=3600)
    except SignatureExpired:
        return jsonify({'message': 'Token expirado'}), 401
    except BadSignature:
        return jsonify({'message': 'Token inválido'}), 401

    user = sistema.buscarUserPorId(data.get('id'))
    if user is None:
        return jsonify({'message': 'Usuário não encontrado'}), 404
    return jsonify({'user': user.to_public()}), 200