import connection from "../dbStrategy/postgres.js";
import rentalSchema from "../schemas/rentalSchema.js";

export default async function rentalValidation(req, res, next) {
  const { error } = rentalSchema.validate(req.body);
  const { customerId, gameId } = req.body;

  if (error) {
    res.status(400).send("Bad request! Review it!");
    return;
  }

  const { rows: thereIsCustomer } = await connection.query(`
  SELECT * FROM customers WHERE customers.id = ${customerId}
  `);

  const { rows: thereIsGame } = await connection.query(`
  SELECT * FROM games WHERE games.id = ${gameId}
  `);

  if (thereIsCustomer.length === 0 || thereIsGame.length === 0) {
    res.status(400).send("Bad request! Review it!");
    return;
  }

  const gameTotalStock = thereIsGame[0].stockTotal;

  const { rows: rentedGames } = await connection.query(`
  SELECT * FROM rentals WHERE "gameId" = ${gameId} AND "returnDate" IS NULL
  `);

  const rentedAmount = rentedGames.length;

  if (gameTotalStock - rentedAmount <= 0) {
    res.status(400).send("Bad request! Review it!");
    return;
  }

  next();
}
