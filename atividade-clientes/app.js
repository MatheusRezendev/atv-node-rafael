require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

// importa rotas
const produtosRoutes = require("./rotas/produtosRoutes");
const clientesRoutes = require("./rotas/clientesRoutes");
const enderecosRoutes = require("./rotas/enderecosRoutes");

// importa o model Endereco
const Endereco = require("./models/Endereco");

// configura o ejs como view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// middlewares
app.use(express.static("public")); 
app.use(express.urlencoded({ extended: true })); 

// monta as rotas
app.use("/produtos", produtosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/enderecos", enderecosRoutes);

// sincroniza o banco de dados
const sequelize = require("./db");
sequelize.sync()
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar banco de dados:", error);
  });

// rota principal
app.get("/", (req, res) => {
  res.send(`
    <h1>Sistema de Gestão</h1>
    <ul>
      <li><a href="/clientes">Gerenciar Clientes</a></li>
      <li><a href="/produtos">Gerenciar Produtos</a></li>
      <li><a href="/enderecos">Gerenciar Endereços</a></li>
    </ul>
  `);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
