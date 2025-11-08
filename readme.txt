Documentação:

Cria pasta flask-server
Cria pasta client
Cria arquivo server.py na pasta flask-server

Abre o terminal, entra na pasta client e cria o projeto com o seguinte comando:
    npm create vite@latest PETS -- --template react
React rodando legal!

Abre outro terminal, entra na pasta flask-server criada anteriormente e cria um ambiente virtual com o seguinte comando:
    python -m venv venv
Após isso, roda o ambiente virtual com o seguinte comando:
    .\venv\Scripts\Activate.ps1
Ambiente virtual rodando legal!

Agora instala o flask ainda na pasta flask-server, com o seguinte comando:
    pip install Flask
Agora, coloca o código para rodar um servidor no server.py e roda o servidor, com o seguinte comando:
    python .\server.py
Servidor rodando legal!

Agora vai na pasta client e abre o arquivo package.json. Lá, você deve adicionar o proxy com o endereço do servidor 
Python que você acabou de rodar. É importante confirmar a porta que o servidor está rodando! Vai ficar assim:
    "proxy": "https://localhost:5000"
Além disso, como estamos usando Vite, temos que alterar o vite.config.js. Temos que colocar o proxy nele também! 
O defineConfig deve ficar assim:
    plugins: [react()],
    server: {
        proxy: {
            '/members': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
Legal! Agora você pode editar a página inicial (App.jsx) se você quiser, e depois rodar o servidor do React na pasta client/PETS,
com o seguinte comando:
    npm run dev

Outra coisa: vamos usar rotas no react, então vamos precisar instar o react router. É simples, é só acessar a pasta cliente/PETS
e rodar o seguinte comando:
    npm install react-router-dom

Se você receber um erro de CORS (como no meu caso), você deverá instalar o pacote flask-cors no seu ambiente Flask!
Nesse caso, pare a aplicação python e rode o seguinte comando:
    pip install flask-cors
Aí é só importar no seu server.py assim: from flask_cors import CORS
E colocar o app dentro da função: CORS(app)
O erro do CORS pode acontecer porque, por padrão, o navegador bloqueia requisições entre origens diferentes por segurança

==================================================================================================================================
Melhorando o proxy:
No seu arquivo vite.config.js, configuramos apenas a rota /members, ou seja, caso você queira colocar uma rota /addMember, você
teria que colocar cada rota no vite! Para evitar isso, podemos fazer:
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
O rewrite vai remover o /api em frente a rota e mandar para a rota desejada. Dessa forma, no front, sempre que for requisitar o back é 
necessário chamar: fetch('api/members'), ou qualquer outra rota iniciando com api/, e funcionará!

==================================================================================================================================
Clonando o projeto do GIT:
    git clone https://github.com/M-Gabrielly/Sistema-de-Controle-de-PETs
Aí entra na pasta PETs:
    cd client/PETS
E instala as dependências:
    npm install
Como estamos usando Tailwind CSS v4, é necessário instalar o pacote adicional do PostCSS:
    npm install -D @tailwindcss/postcss
Agora é só rodar o servidor do React:
    npm run dev
O front vai rodar em http://localhost:5173/

Abre outro terminal para o back:
    cd flask-server
Ativa o ambiente virtual:
    .\venv\Scripts\Activate.ps1
Caso o ambiente virtual não exista, crie com:
    python -m venv venv
Agora é só instalar as dependências (se ainda não instalou):
    pip install -r requirements.txt
E rodar o servidor:
    python server.py
O back vai rodar em http://127.0.0.1:5000
