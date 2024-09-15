import sqlite from 'better-sqlite3';

const db = sqlite('data.db');

// Função para inicializar a tabela no banco de dados
export function initDb() {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      cnpj TEXT,
      name TEXT,
      fantasyname TEXT,
      cep TEXT,
      logradouro TEXT,
      bairro TEXT,
      city TEXT,
      uf TEXT,
      complement TEXT,
      email TEXT,
      phone TEXT
    )`,
  ).run();
}

export const getAllClients = () => db.prepare('SELECT * FROM clients').all();

export const getClientById = (id: number) => {
  return db.prepare('SELECT * FROM clients WHERE id = ?').get(id);
};

export const insertClient = (
  image: string,
  cnpj: string,
  name: string,
  fantasyname: string,
  cep: string,
  logradouro: string,
  bairro: string,
  city: string,
  uf: string,
  complement: string,
  email: string,
  phone: string,
) => {
  const stmt = db.prepare(
    'INSERT INTO clients (image, cnpj, name, fantasyname, cep, logradouro, bairro, city, uf, complement, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  );

  const info = stmt.run(
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

  return info; // Retorna o resultado da execução, que contém `lastInsertRowid`
};

export const updateClient = (
  id: number,
  image: string, // Corrigido para `string`
  cnpj: string, // Corrigido para `string`
  name: string, // Corrigido para `string`
  fantasyname: string, // Corrigido para `string`
  cep: string, // Corrigido para `string`
  logradouro: string, // Corrigido para `string`
  bairro: string, // Corrigido para `string`
  city: string, // Corrigido para `string`
  uf: string, // Corrigido para `string`
  complement: string, // Corrigido para `string`
  email: string, // Corrigido para `string`
  phone: string, // Corrigido para `string`
) => {
  db.prepare(
    'UPDATE clients SET image = ?, cnpj = ?, name = ?, fantasyname = ?, cep = ?, logradouro = ?, bairro = ?, city = ?, uf = ?, complement = ?, email = ?, phone = ? WHERE id = ?',
  ).run(
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
    id, // Lembre-se de incluir o `id` no final para o WHERE
  );

  // Opcionalmente, você pode retornar algo se quiser verificar o sucesso
  return getClientById(id); // Retorna o cliente atualizado
};

export const deleteClient = (id: number) => {
  db.prepare('DELETE FROM clients WHERE id = ?').run(id);
};
