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
      res.status(422).send("Unprocessable entity! Review your request!");
      return;
    }

    await connection.query(
      `
    INSERT INTO categories (name) VALUES ('$1')
    `,
      [name]
    );

    res.status(201).send("Created");
  } catch (err) {
    res.status(500).send("Internal Error");
  }
}
