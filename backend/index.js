const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'jornada_backend_ocean';

async function main() {
  console.info('Conectando ao banco de dados...');
  await client.connect();
  console.info('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('herois');

  // Habilitamos o processamento de JSON
  app.use(express.json());

  // Endpoint Principal
  app.get("/", function (req, res) {
    res.send("Hello World");
  });

  // Endpoints de Herois
  const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];
  //             0                    1                2

  // Read All -> [GET] /herois
  app.get("/herois", async function (req, res) {
    const itens = await collection.find().toArray();
    res.send(itens);
  });

  // Create -> [POST] /herois
  app.post("/herois", async function (req, res) {
    // console.log(req.body, typeof req.body);

    // Extrai o nome do Body da Request (Corpo da Requisição)
    const item = req.body;

    // Inserir o item na lista
    await collection.insertOne(item)

    // Enviamos uma resposta de sucesso
    res.send(item);
  });

  // Read By Id -> [GET] /herois/:id
  app.get("/herois/:id", async function (req, res) {
    // Pegamos o parâmetro de rota ID
    const id = req.params.id;

    // Pegamos a informação da lista
    const item = await collection.findOne({
      _id: new ObjectId(id),
    });

    // Exibimos o item na resposta do endpoint
    res.send(item);
  });

  // Update -> [PUT] /herois/:id
  app.put("/herois/:id", async function (req, res) {
    // Pegamos o parâmetro de rota ID
    const id = req.params.id;

    // Extrai o nome do Body da Request (Corpo da Requisição)
    const item = req.body.nome;

    // Atualizamos a informação na lista de registros
    await collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          nome: item,
        },
      }
    );

    res.send(item);
  });

  // Delete -> [DELETE] /herois/:id
  app.delete("/herois/:id", async function (req, res) {
    // Pegamos o parâmetro de rota ID
    const id = req.params.id;

    // Excluir o item da lista
    await collection.deleteOne({
      _id: new ObjectId(id),
    });


    res.send("Item excluído com sucesso!");
  });

  app.listen(3000);
}

main();