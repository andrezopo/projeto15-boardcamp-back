import connection from "../dbStrategy/postgres.js";

export async function getCustomers(req, res) {
  try {
    const { rows: customers } = await connection.query(`
  SELECT * FROM customers
  `);

    res.status(200).send(customers);
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}

export async function createCustomer(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;

    const { rows: alreadyCpf } = await connection.query(
      `
  SELECT * FROM customers WHERE cpf = $1
  `,
      (values = [cpf])
    );

    if (alreadyCpf) {
      res.status(409).send("Conflict! CPF already exists!");
      return;
    }

    await connection.query(
      `
    INSERT INTO customers (name, phone, cpf, birthday) VALUES ('$1', '$2', '$3', '$4')
    `,
      (values = [name, phone, cpf, birthday])
    );

    res.status(200).send();
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}

export async function getCustomerById(req, res) {
  try {
    const { id } = req.params;

    const { rows: customer } = await connection.query(
      `
    SELECT * FROM customers WHERE id=$1
  `,
      (values = [id])
    );

    if (!customer[0]) {
      res.status(404).send("Customer not found!");
      return;
    }

    res.status(200).send(customer[0]);
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}

export async function updateCustomerById(req, res) {
  try {
    const { name, phone, cpf, birthday } = req.body;

    const { id } = req.params;

    const { rows: alreadyCpf } = await connection.query(
      `
  SELECT * FROM customers WHERE cpf = $1
  `,
      (values = [cpf])
    );

    if (alreadyCpf) {
      res.status(409).send("Conflict! CPF already exists!");
      return;
    }

    const { rows: customer } = await connection.query(
      `
  SELECT * FROM customers WHERE id=$1
`,
      (values = [id])
    );

    if (!customer[0]) {
      res.status(404).send("Customer not found!");
      return;
    }

    await connection.query(
      `
    UPDATE customers SET name='$1', phone='$2', cpf='$3', birthday='$4' WHERE id=$5
    `,
      (values = [name, phone, cpf, birthday, id])
    );

    res.status(200).send();
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}
