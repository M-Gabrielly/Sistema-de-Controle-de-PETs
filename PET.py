class PET:
    def __init__(self, id, nome, idade, especie, status):
        self.id = id
        self.nome = nome
        self.idade = idade
        self.especie = especie
        self.status = status

    def editarPet(self, nome=None, idade=None, especie=None, status=None):
        if nome is not None:
            self.nome = nome
        if idade is not None:
            self.idade = idade
        if especie is not None:
            self.especie = especie
        if status is not None:
            self.status = status


    def __str__(self):
        return f"\nId: {self.id}\nNome: {self.nome}\nIdade: {self.idade}\nEspécie: {self.especie}\nStatus: {self.status}"