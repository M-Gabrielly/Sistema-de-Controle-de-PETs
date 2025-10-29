from .PET import PET
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

    def cadastrarPET(self, nome, idade, especie, status):
        id = random.randint(1000, 9999)

        pet = PET(id, nome, idade, especie, status)
        self.lista.append(pet)
        print("PET cadastrado!")

    def listarPETs(self):
        return [pet.to_array() for pet in self.lista]

    def buscarPorId(self, id):
        for pet in self.lista:
            if pet.id == id:
                return pet
        return 'Nenhum PET encontrado!'