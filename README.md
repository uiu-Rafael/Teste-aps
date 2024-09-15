# 🚀Aplicação CRUD de Reuniões

Este projeto é um sistema de CRUD (Create, Read, Update, Delete) para uma aplicação de reuniões, que permite gerenciar dados de clientes de forma eficiente. A aplicação é composta por um front-end em React e um back-end desenvolvido em Node.js com Express, integrando um banco de dados SQLite. A API permite buscar, inserir, editar e deletar clientes.

## Funcionalidades

- Listar todas as reuniões (clientes).
- Adicionar novas reuniões com informações detalhadas.
- Editar dados de reuniões existentes.
- Excluir reuniões.
- Marcar reuniões como favoritas.

## Tecnologias Utilizadas

### Front-End:
- **React**: Framework JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Material-UI**: Biblioteca de componentes de interface.
- **Framer Motion**: Biblioteca para animações.

### Back-End:
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web minimalista para Node.js.
- **SQLite**: Banco de dados SQL leve.
- **Zod**: Biblioteca para validação de dados.

## Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- SQLite3

### Backend (Node.js + Express)

#### 1. Clone o repositório:

`git clone https://github.com/uiu-Rafael/Teste-aps.git`

#### 2. Entre na pasta do servidor:

`cd Teste-aps/sqlite-crud-app`

#### 3. Instale as dependências:

`npm install `

#### 4. Inicie o servidor:

`npx ts-node src/index.ts`

O servidor estará disponível em http://localhost:8080.

### Frontend (React)

#### 1. Entre na pasta do frontend:

`Teste-aps/my-app`


#### 2. Instale as dependências:

`npm install`

#### 3. Inicie o front-end:

`npm start`

A aplicação estará disponível em http://localhost:3000.

## API Endpoints
GET /clients: Retorna todas as reuniões.

GET /clients/: Retorna uma reunião específica por ID.

POST /clients: Insere uma nova reunião.

PATCH /clients/: Atualiza uma reunião existente.

DELETE /clients/: Remove uma reunião.

## Estrutura do Banco de Dados

O banco de dados é composto pela tabela clients, que armazena as seguintes informações:

id: Identificador único.

image: Imagem associada ao cliente.

cnpj: CNPJ da empresa.

name: Nome da empresa.

fantasyname: Nome fantasia.

cep, logradouro, bairro, city, uf: Endereço completo.

email: E-mail do cliente.

phone: Telefone de contato.

complement: Complemento de endereço.

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

##### Feito com 💻 e ☕ por Rafael Bezerra De Montreuil.
