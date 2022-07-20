import connection from "../dbStrategy/postgres.js";

export async function getRentals(req, res) {
  res.send("sou a rota de receber rentals");
}

export async function createRental(req, res) {
  res.send("sou a rota de criar rentals");
}

export async function returnRentalById(req, res) {
  res.send("sou a rota de devolver rentals");
}

export async function deleteRentalById(req, res) {
  res.send("sou a rota de deletar rentals");
}
