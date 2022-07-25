import connection from "../dbStrategy/postgres.js";

export async function getCustomers(req, res) {
  try {
    const { cpf } = req.query;

    if (!cpf) {
      const { rows: customers } = await connection.query(`
      SELECT * FROM customers
      `);

      res.status(200).send(customers);
      return;
    }

    const { rows: customers } = await connection.query(`
    SELECT * FROM customers WHERE cpf LIKE '${cpf}%'
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
  SELECT * FROM customers WHERE cpf = '${cpf}'
  `
    );

    if (alreadyCpf.length > 0) {
      res.status(409).send("Conflict! CPF already exists!");
      return;
    }

    await connection.query(
      `
    INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}', '${phone}', '${cpf}', '${birthday}')
    `
    );

    res.status(201).send();
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}

export async function getCustomerById(req, res) {
  try {
    const { id } = req.params;

    const { rows: customer } = await connection.query(
      `
    SELECT * FROM customers WHERE id=${id}
  `
    );

    if (customer.length === 0) {
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

    if (cpf) {
      const { rows: alreadyCpf } = await connection.query(
        `
    SELECT * FROM customers WHERE cpf = '${cpf}' AND id <> ${id}
    `
      );

      if (alreadyCpf.length > 0) {
        res.status(409).send("Conflict! CPF already exists!");
        return;
      }
    }

    const { rows: customer } = await connection.query(
      `
  SELECT * FROM customers WHERE id=${id}
`
    );

    if (customer.length === 0) {
      res.status(404).send("Customer not found!");
      return;
    }

    await connection.query(
      `
    UPDATE customers SET name='${name}', phone='${phone}', cpf='${cpf}', birthday='${birthday}' WHERE id=${id}
    `
    );

    res.status(200).send();
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}
