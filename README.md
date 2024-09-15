# App Express com OracleDB

Este projeto é uma API desenvolvida em Node.js usando o framework Express para gerenciar empresas e armazenar suas informações em um banco de dados Oracle. A conexão com o OracleDB é feita usando a biblioteca `oracledb`.

## Funcionalidades

- Inserir uma nova empresa no banco de dados Oracle.
- Listar todas as empresas cadastradas.

## Requisitos

Antes de iniciar o projeto, certifique-se de que possui os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (versão 12 ou superior)
- [OracleDB](https://www.oracle.com/database/technologies/) ou [Oracle Cloud](https://www.oracle.com/cloud/)
- [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client.html) (se estiver rodando em um ambiente local)

## Instalação

Siga os passos abaixo para rodar o projeto:

### 1. Clonar o repositório

```
git clone https://github.com/leoleoyuuki/expressSprint3Plussoft.git
```

### 2. Instalar dependências

Entre no diretório do projeto e instale as dependências:

```
cd expressSprint3Plussoft
npm install
```

### 3. Configurar a conexão com o OracleDB

No arquivo `app.js`, você encontrará a configuração de conexão com o banco de dados. Será necessário modificar os campos `user`, `password` e `connectString` para os dados da sua instância do Oracle.

```
module.exports = {
  user: "seu_user",               // Substitua por seu usuário do OracleDB
  password: "sua_senha",           // Substitua pela sua senha do OracleDB
  connectString: "sua_connectString" // Substitua pela sua connectString do OracleDB
};
```

### 4. Executar o servidor

Após configurar o banco de dados, você pode iniciar o servidor com o seguinte comando:

```
node app.js
```

O servidor irá rodar na porta definida no arquivo `app.js` (geralmente na porta 3000).

### 5. Testar as rotas

Utilize um cliente REST como o [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/) para testar as seguintes rotas:

#### Inserir empresa (POST)

- **URL**: `http://localhost:3000/empresas`
- **Método**: `POST`
- **Body (JSON)**:
```
{
  "nome": "Nome da Empresa",
  "tamanho": "Grande",
  "setor": "Tecnologia",
  "localizacaoGeografica": "São Paulo",
  "numeroFuncionarios": 500,
  "tipoEmpresa": "Privada",
  "cliente": true
}
```

#### Listar empresas (GET)

- **URL**: `http://localhost:3000/empresas`
- **Método**: `GET`

### Estrutura do Projeto

- `app.js`: Arquivo principal do servidor Express com GET e POST + Consultas e Inserções no banco Oracle.
- `package.json`: Arquivo de dependências do projeto.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento.
- **Express**: Framework para construção de APIs.
- **OracleDB**: Banco de dados relacional utilizado.
- **oracledb**: Biblioteca para conectar o Node.js ao OracleDB.

## Licença

Este projeto é licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

---

Sinta-se à vontade para contribuir ou entrar em contato em caso de dúvidas!
