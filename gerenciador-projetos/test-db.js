// test-db.js
const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "gerenciador_projetos",
  password: "admin",
  port: 5432,
});

async function testConnection() {
  try {
    await client.connect();
    console.log("Conexão com o banco de dados bem-sucedida!");
    await client.end();
  } catch (error) {
    console.error("Erro ao conectar:", error.message);
  }
}

testConnection();