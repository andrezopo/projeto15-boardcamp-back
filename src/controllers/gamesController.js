import connection from "../dbStrategy/postgres.js";

export async function getGames(req, res) {
  try {
    const { rows: games } = await connection.query(`
    SELECT * FROM games
    `);

    if (games.length === 0) {
      res.status(404).send("No games yet!");
      return;
    }

    res.status(200).send(games);
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}

export async function createGame(req, res) {
  try {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    if (!name || !image || !stockTotal || !categoryId || !pricePerDay) {
      res.status(422).send("Unprocessable entity! Review your request!");
      return;
    }

    await connection.query(
      `
      INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('$1', '$2', $3, $4, $5)
    `,
      (values = [name, image, stockTotal, categoryId, pricePerDay])
    );

    res.send("sou a rota de criar um jogo");
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}
