from .PET import PET
from .Cliente import Cliente
import random

class SistemaPET:
    def __init__(self):
        self.lista = [
            PET(1, "Rex", 3, "Cachorro", "Aguardando atendimento"),
            PET(2, "Mia", 2, "Gato", "Aguardando atendimento"),
            PET(3, "Bob", 5, "Cachorro", "Em consulta"),
            PET(4, "Luna", 1, "Gato", "Aguardando atendimento"),
            PET(5, "Thor", 4, "Cachorro", "Atendido"),
        ]
        # lista de clientes (inicialmente vazia). Pode ser populada via cadastrarCliente
        self.clientes = []

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