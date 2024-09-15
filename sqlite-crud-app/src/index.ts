import express from 'express';
import cors from 'cors';
import {
  initDb,
  getAllClients,
  getClientById,
  insertClient,
  updateClient,
  deleteClient,
} from './db';
import { clientSchema, idSchema } from './validators';

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializa o banco de dados
initDb();

// Endpoints CRUD

// Listar todos os clientes
app.get('/clients', (req, res) => {
  const clients = getAllClients();
  res.json(clients);
});

// Buscar cliente por ID
app.get('/clients/:id', (req, res) => {
  const validation = idSchema.safeParse(req.params);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const client = getClientById(Number(req.params.id));

  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  res.json(client); // Certifique-se de que `client` existe
});

// Inserir novo cliente
app.post('/clients', (req, res) => {
  const validation = clientSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const {
    image,
    cnpj,
    name,
    fantasyname,
    cep,
    logradouro,
    bairro,
    city,
    uf,
    complement,
    email,
    phone,
  } = req.body;

  try {
    const result = insertClient(
      image,
      cnpj,
      name,
      fantasyname,
      cep,
      logradouro,
      bairro,
      city,
      uf,
      complement,
      email,
      phone,
    );

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: 'Failed to insert client' });
  }
});

// Atualizar cliente existente
app.put('/clients/:id', (req, res) => {
  const idValidation = idSchema.safeParse(req.params);
  if (!idValidation.success) {
    return res.status(400).json({ error: idValidation.error.errors });
  }

  const bodyValidation = clientSchema.safeParse(req.body);
  if (!bodyValidation.success) {
    return res.status(400).json({ error: bodyValidation.error.errors });
  }

  const {
    image,
    cnpj,
    name,
    fantasyname,
    cep,
    logradouro,
    bairro,
    city,
    uf,
    complement,
    email,
    phone,
  } = req.body;
  const { id } = req.params;
  try {
    updateClient(
      Number(id),
      image,
      cnpj,
      name,
      fantasyname,
      cep,
      logradouro,
      bairro,
      city,
      uf,
      complement,
      email,
      phone,
    );
    res.json({ message: 'Client updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client' });
  }
});

app.patch('/clients/:id', (req, res) => {
  const idValidation = idSchema.safeParse(req.params);
  if (!idValidation.success) {
    return res.status(400).json({ error: idValidation.error.errors });
  }

  const bodyValidation = clientSchema.safeParse(req.body);
  if (!bodyValidation.success) {
    return res.status(400).json({ error: bodyValidation.error.errors });
  }

  const {
    image,
    cnpj,
    name,
    fantasyname,
    cep,
    logradouro,
    bairro,
    city,
    uf,
    complement,
    email,
    phone,
  } = req.body;

  const { id } = req.params;

  try {
    const updatedClient = updateClient(
      Number(id),
      image,
      cnpj,
      name,
      fantasyname,
      cep,
      logradouro,
      bairro,
      city,
      uf,
      complement,
      email,
      phone,
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client updated successfully', updatedClient });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client' });
  }
});

// Deletar cliente
app.delete('/clients/:id', (req, res) => {
  const validation = idSchema.safeParse(req.params);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { id } = req.params;
  try {
    deleteClient(Number(id));
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
