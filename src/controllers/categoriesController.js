import connection from "../dbStrategy/postgres.js";

export async function getCategories(req, res) {
  try {
    const { rows: categories } = await connection.query(`
    SELECT * FROM categories
    `);

    if (categories.length === 0) {
      res.status(404).send("No categories yet!");
      return;
    }

    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send("Internal Error");
  }
}

export async function createCategory(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send("Unprocessable entity! Review your request!");
      return;
    }

    const { rows: repeatedCategory } = await connection.query(`
      SELECT * FROM categories WHERE name = '${name}'
    
    `);
    if (repeatedCategory.length !== 0) {
      res.status(409).send("Conflict! Category already exists!");
      return;
    }

    await connection.query(
      `
    INSERT INTO categories (name) VALUES ('${name}')
    `
    );

    res.status(201).send();
  } catch (err) {
    res.status(500).send("Internal Error");
  }
}
