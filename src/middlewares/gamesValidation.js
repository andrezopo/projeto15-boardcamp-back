import connection from "../dbStrategy/postgres.js";
import gamesSchema from "../schemas/gamesSchema.js";

export default async function gamesValidation(req, res, next) {
  const { error } = gamesSchema.validate(req.body);
  const { categoryId, name } = req.body;

  if (error) {
    res.status(400).send("Bad request! Review it!");
    return;
  }

  const { rows: thereIsCategory } = await connection.query(`
  SELECT * FROM categories WHERE categories.id = ${categoryId}
  `);

  if (thereIsCategory.length === 0) {
    res.status(400).send("Bad request! Review it!");
    return;
  }

  const { rows: nameAlreadyExists } = await connection.query(`
    SELECT * FROM games WHERE LOWER (name) = LOWER ('${name}')
  `);

  if (nameAlreadyExists.length !== 0) {
    res.status(409).send("Conflict! Name already exists!");
    return;
  }

  next();
}
