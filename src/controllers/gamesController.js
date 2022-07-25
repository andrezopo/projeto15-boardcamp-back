import connection from "../dbStrategy/postgres.js";

export async function getGames(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      const { rows: games } = await connection.query(`
      SELECT g.*, c.name as "categoryName" FROM games g JOIN categories c ON g."categoryId" = c.id
      `);

      res.status(200).send(games);
      return;
    }
    const { rows: games } = await connection.query(`
    SELECT g.*, c.name as "categoryName" FROM games g JOIN categories c ON g."categoryId" = c.id WHERE LOWER (g.name) LIKE LOWER('${name}%')
    `);

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
      INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ('${name}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay})
    `
    );

    res.status(201).send();
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}
