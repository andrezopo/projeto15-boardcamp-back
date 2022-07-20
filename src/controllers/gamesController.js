import connection from "../dbStrategy/postgres.js";

export async function getGames(req, res) {
  res.send("sou a rota de receber jogos");
}

export async function createGame(req, res) {
  res.send("sou a rota de criar um jogo");
}
