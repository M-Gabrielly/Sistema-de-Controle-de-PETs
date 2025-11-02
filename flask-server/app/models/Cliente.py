class Cliente:
    def __init__(self, id, nome, telefone):
        self.id = id
        self.nome = nome
        self.telefone = telefone

    def editarCliente(self, nome=None, telefone=None):
        if nome is not None:
            self.nome = nome
        if telefone is not None:
            self.telefone = telefone

    def to_array(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "telefone": self.telefone
        }

    def __str__(self):
        return f"\nId: {self.id}\nNome: {self.nome}\nTelefone: {self.telefone}"
