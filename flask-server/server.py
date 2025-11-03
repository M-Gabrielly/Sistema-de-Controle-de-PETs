from flask import Flask, request, jsonify
from flask_cors import CORS
from app.controllers.PET_controller import pet_bp

app = Flask("__name__")
CORS(app) # habilita CORS para todas as rotas
# Chave secreta usada para gerar tokens simples (mude em produção)
app.config['SECRET_KEY'] = 'troque-esta-chave-por-uma-segura'

app.register_blueprint(pet_bp)

if __name__ == "__main__":
    app.run(debug=True)