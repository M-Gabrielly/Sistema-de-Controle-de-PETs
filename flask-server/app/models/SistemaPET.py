from .PET import PET
from .Cliente import Cliente
from .User import User
import random

class SistemaPET:
    def __init__(self):
        self.lista = [
            PET(1, "Rex", 3, "Cachorro", "Aguardando atendimento", dono_id=1001),
            PET(2, "Mia", 2, "Gato", "Aguardando atendimento", dono_id=1002),
            PET(3, "Bob", 5, "Cachorro", "Em consulta", dono_id=1003),
            PET(4, "Luna", 1, "Gato", "Aguardando atendimento", dono_id=1004),
            PET(5, "Thor", 4, "Cachorro", "Atendido", dono_id=1005),
        ]
        # lista de clientes (exemplos iniciais)
        self.clientes = [
            Cliente(1001, "Ana Silva", "(11)99999-0001"),
            Cliente(1002, "Bruno Costa", "(11)98888-0002"),
            Cliente(1003, "Carla Fernandes", "(21)97777-0003"),
            Cliente(1004, "Diego Souza", "(31)96666-0004"),
            Cliente(1005, "Eva Pereira", "(41)95555-0005"),
        ]
        # usuários (para autenticação mínima)
        self.users = []

    def cadastrarPET(self, nome, idade, especie, status, dono_id=None):
        id = random.randint(1000, 9999)

        pet = PET(id, nome, idade, especie, status, dono_id=dono_id)
        self.lista.append(pet)
        print("PET cadastrado!")

    def listarPETs(self):
        return [pet.to_array() for pet in self.lista]

    def buscarPorId(self, id):
        for pet in self.lista:
            if pet.id == id:
                return pet
        return None

    # --- métodos simples para clientes ---
    def cadastrarCliente(self, nome, telefone):
        id = random.randint(1000, 9999)
        cliente = Cliente(id, nome, telefone)
        self.clientes.append(cliente)
        print("Cliente cadastrado!")

    def listarClientes(self):
        return [c.to_array() for c in self.clientes]

    def buscarClientePorId(self, id):
        for c in self.clientes:
            if c.id == id:
                return c
        return None

    # --- métodos simples para usuários ---
    def cadastrarUser(self, username, password_hash):
        id = random.randint(1000, 9999)
        user = User(id, username, password_hash)
        self.users.append(user)
        print("User cadastrado!")
        return user

    def buscarUserPorUsername(self, username):
        for u in self.users:
            if u.username == username:
                return u
        return None

    def buscarUserPorId(self, id):
        for u in self.users:
            if u.id == id:
                return u
        return None