import connection from "../dbStrategy/postgres.js";

export default async function rentalIdValidation(req, res, next) {
  const { id } = req.params;

  const { rows: thereIsRental } = await connection.query(`
    SELECT * FROM rentals WHERE id = ${id}
    `);

  if (thereIsRental.length === 0) {
    res.status(404).send("Rental not found!");
    return;
  }

  res.locals.isReturned = thereIsRental[0].returnDate;

  next();
}
