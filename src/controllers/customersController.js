import connection from "../dbStrategy/postgres.js";

export async function getCustomers(req, res) {
  res.send("sou a rota de receber clientes");
}

export async function createCustomer(req, res) {
  res.send("sou a rota de criar um cliente");
}

export async function getCustomerById(req, res) {
  res.send("sou a rota de pegar um cliente por id");
}

export async function updateCustomerById(req, res) {
  res.send("sou a rota de atualizar um cliente pelo id");
}
