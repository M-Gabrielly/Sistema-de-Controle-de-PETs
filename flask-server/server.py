from flask import Flask, request, jsonify
from flask_cors import CORS
from app.controllers.PET_controller import pet_bp

app = Flask("__name__")
CORS(app) # habilita CORS para todas as rotas

app.register_blueprint(pet_bp)

if __name__ == "__main__":
    app.run(debug=True)