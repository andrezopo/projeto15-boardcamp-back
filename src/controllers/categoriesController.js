import connection from "../dbStrategy/postgres.js";

export async function getCategories(req, res) {
  res.send("sou a rota de receber categorias");
}

export async function createCategory(req, res) {
  res.send("sou a rota de criar uma categoria");
}
