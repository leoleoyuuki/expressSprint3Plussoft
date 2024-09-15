import express from "express";
import oracledb from "oracledb";


const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear dados URL-encoded
app.use(express.urlencoded({ extended: true }));

const config = {
  user: process.env.user,
  password: process.env.password,
  connectString: process.env.host // Ajuste de acordo com seu ambiente
};
async function getEmpresas() {
  let connection;
  try {
    connection = await oracledb.getConnection(config);
    const result = await connection.execute(
      `SELECT nome, tamanho, setor, localizacaogeografica, numerofuncionarios, tipoempresa, cliente 
       FROM empresas`
    );
    
    // Retorna as linhas encontradas
    return result.rows.map(row => ({
      nome: row[0],
      tamanho: row[1],
      setor: row[2],
      localizacaoGeografica: row[3],
      numeroFuncionarios: row[4],
      tipoEmpresa: row[5],
      cliente: row[6] === 1 // Ajuste caso seja um valor booleano
    }));

  } catch (err) {
    console.error(err);
    return [];
  } finally {
    if (connection) {
      try {
        await connection.close(); // Fechar conexão
      } catch (err) {
        console.error(err);
      }
    }
  }
}
async function insertEmpresa(empresa) {
  let connection;
  try {
    connection = await oracledb.getConnection(config);

    // Certifique-se de usar o nome correto da coluna, aqui estou assumindo que seja 'id_empresa'
    const result = await connection.execute(`SELECT MAX(id_empresa) + 1 AS nextId FROM empresas`);
    const id_empresa = result.rows[0][0];  // Pegando o valor do próximo ID

    let query = `
      INSERT INTO EMPRESAS (id_empresa, nome, tamanho, setor, localizacaogeografica, numerofuncionarios, tipoempresa, cliente) 
      VALUES (:id_empresa, :nome, :tamanho, :setor, :localizacaoGeografica, :numeroFuncionarios, :tipoEmpresa, :cliente)
    `;

    // Usando variáveis bind para evitar SQL injection e problemas de formatação
    await connection.execute(query, {
      id_empresa: id_empresa,
      nome: empresa.nome,
      tamanho: empresa.tamanho,
      setor: empresa.setor,
      localizacaoGeografica: empresa.localizacaoGeografica,
      numeroFuncionarios: empresa.numeroFuncionarios,
      tipoEmpresa: empresa.tipoEmpresa,
      cliente: empresa.cliente ? 1 : 0  // Convertendo boolean para 1 ou 0
    }, { autoCommit: true });

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close(); // Fechar conexão
      } catch (err) {
        console.error(err);
      }
    }
  }
}

app.get("/empresas", async(req, res) => {
  try{
    const empresas = await getEmpresas();
    console.log(empresas);
    res.json(empresas);
  }catch(err){
    console.log(err);
    res.status(500).send("Erro ao buscar empresas");
  }
});

app.post("/empresas", async(req, res) => {
  try {
    const corpo = req.body;

    insertEmpresa(corpo);
    res.send(corpo + "Empresa cadastrada com sucesso");
    console.log(JSON.stringify(corpo) + "Empresa cadastrada com sucesso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao cadastrar empresa");
    
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});