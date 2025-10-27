from PET import PET
import random

class SistemaPET:
    def __init__(self):
        self.lista = []

    def cadastrarPET(self):
        id = random.randint(1000, 9999)
        # nome = input("Nome: ")
        # idade = int(input("Idade: "))
        # especie = input("Espécie: ")
        # status = input("Status: ")

        # Gerar automaticamente
        i = len(self.lista) + 1  # número do próximo pet
        nome = f"Nome {i}"
        idade = i
        especie = f"Espécie {i}"
        status = f"Status {i}"

        pet = PET(id, nome, idade, especie, status)
        self.lista.append(pet)
        print("PET cadastrado!")

    def listarPETs(self):
        if len(self.lista) > 0:
            for pet in self.lista:
                print(pet)
        else:
            print("Nenhum PET cadastrado!")

    def buscarPorId(self, id):
        for pet in self.lista:
            if pet.id == id:
                return pet
        return 'Nenhum PET encontrado!'