from PET import PET
from SistemaPET import SistemaPET

def editar(pet):
    print("Editando PET: " + pet_encontrado.nome)
    nome = input('Novo nome (deixe vazio para manter): ') or None
    idade = input('Nova idade (deixe vazio para manter): ') or None
    especie = input('Nova espécie (deixe vazio para manter): ') or None
    status = input('Novo status (deixe vazio para manter): ') or None

    # converte idade se o usuário digitou algo
    idade = int(idade) if idade is not None else None

    pet_encontrado.editarPet(nome, idade, especie, status)



sistema = SistemaPET()

#Gera 4 pets aleatorios
for i in range(1, 5):
    sistema.cadastrarPET()

sistema.listarPETs()

print("Digite o ID do PET que deseja editar: ")
id_search = int(input())
pet_encontrado = sistema.buscarPorId(id_search)

if pet_encontrado is None:
    print("Nenhum PET encontrado!")
else:
    editar(pet_encontrado)

sistema.listarPETs()

