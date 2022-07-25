import dayjs from "dayjs";
import connection from "../dbStrategy/postgres.js";

export async function getRentals(req, res) {
  try {
    const { customerId, gameId } = req.query;

    if (!customerId && !gameId) {
      const { rows: rentals } = await connection.query(`
      SELECT r.*, c.id as "cId", c.name , g.id as "gId", g.name as "gameName", g."categoryId", categories.name as "categoryName" FROM rentals r JOIN customers c ON r."customerId" = c.id JOIN games g ON r."gameId" = g.id JOIN categories ON categories.id = g."categoryId" ORDER BY id ASC
      `);

      const finalRentals = rentals.map((rental) => {
        const customer = {
          id: rental.customerId,
          name: rental.name,
        };
        const game = {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        };
        delete rental.customerId;
        delete rental.name;
        delete rental.gameId;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;

        return {
          ...rental,
          customer,
          game,
        };
      });

      res.status(200).send(finalRentals);
      return;
    }

    if (!customerId) {
      const { rows: rentals } = await connection.query(`
      SELECT r.*, c.id as "cId", c.name , g.id as "gId", g.name as "gameName", g."categoryId", categories.name as "categoryName" FROM rentals r JOIN customers c ON r."customerId" = c.id JOIN games g ON r."gameId" = g.id JOIN categories ON categories.id = g."categoryId" WHERE g.id = ${gameId} ORDER BY id ASC
      `);

      const finalRentals = rentals.map((rental) => {
        const customer = {
          id: rental.customerId,
          name: rental.name,
        };
        const game = {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        };
        delete rental.customerId;
        delete rental.name;
        delete rental.gameId;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;

        return {
          ...rental,
          customer,
          game,
        };
      });

      res.status(200).send(finalRentals);
      return;
    }

    if (!gameId) {
      const { rows: rentals } = await connection.query(`
      SELECT r.*, c.id "cId", c.name , g.id as "gId", g.name as "gameName", g."categoryId", categories.name as "categoryName" FROM rentals r JOIN customers c ON r."customerId" = c.id JOIN games g ON r."gameId" = g.id JOIN categories ON categories.id = g."categoryId" WHERE c.id = ${customerId} ORDER BY id ASC
      `);

      const finalRentals = rentals.map((rental) => {
        const customer = {
          id: rental.customerId,
          name: rental.name,
        };
        const game = {
          id: rental.gameId,
          name: rental.gameName,
          categoryId: rental.categoryId,
          categoryName: rental.categoryName,
        };
        delete rental.customerId;
        delete rental.name;
        delete rental.gameId;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;

        return {
          ...rental,
          customer,
          game,
        };
      });

      res.status(200).send(finalRentals);
      return;
    }

    const { rows: rentals } = await connection.query(`
    SELECT r.*, c.id as "cId", c.name , g.id as "gId", g.name as "gameName", g."categoryId", categories.name as "categoryName" FROM rentals r JOIN customers c ON r."customerId" = c.id JOIN games g ON r."gameId" = g.id JOIN categories ON categories.id = g."categoryId" WHERE c.id = ${customerId} AND g.id = ${gameId} ORDER BY id ASC
    `);

    const finalRentals = rentals.map((rental) => {
      const customer = {
        id: rental.customerId,
        name: rental.name,
      };
      const game = {
        id: rental.gameId,
        name: rental.gameName,
        categoryId: rental.categoryId,
        categoryName: rental.categoryName,
      };
      delete rental.customerId;
      delete rental.name;
      delete rental.gameId;
      delete rental.gameName;
      delete rental.categoryId;
      delete rental.categoryName;

      return {
        ...rental,
        customer,
        game,
      };
    });

    res.status(200).send(finalRentals);
    return;
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}

export async function createRental(req, res) {
  try {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("DD-MM-YYYY");

    const { rows: game } = await connection.query(`
    SELECT "pricePerDay" FROM games WHERE games.id = ${gameId}
    `);

    const originalPrice = daysRented * game[0].pricePerDay;

    await connection.query(`
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES (${customerId}, ${gameId}, '${rentDate}', ${daysRented}, ${null}, ${originalPrice}, ${null})
    `);

    res.status(201).send();
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}

export async function returnRentalById(req, res) {
  try {
    const { isReturned } = res.locals;
    if (isReturned) {
      res.status(400).send("The rental is already returned!");
      return;
    }
    const { id } = req.params;
    const dateNow = dayjs().format("YYYY-MM-DD");
    const date1 = dayjs(dateNow);

    const { rows: rentalInfo } = await connection.query(`
      SELECT "rentDate", "daysRented", "originalPrice" FROM rentals WHERE id = ${id}
    `);

    const rentDate = dayjs(rentalInfo[0].rentDate);

    let delayDays = date1.diff(rentDate, "day") - rentalInfo[0].daysRented;

    if (delayDays < 0) {
      delayDays = 0;
    }

    console.log(delayDays);

    const delayFee =
      delayDays * (rentalInfo[0].originalPrice / rentalInfo[0].daysRented);

    await connection.query(`
    UPDATE rentals SET "returnDate" = '${dateNow}', "delayFee" = ${delayFee} WHERE id = ${id}
    `);

    res.status(200).send();
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}

export async function deleteRentalById(req, res) {
  try {
    const { id } = req.params;

    const { isReturned } = res.locals;
    if (!isReturned) {
      res.status(400).send("The rental is not returned yet!");
      return;
    }

    await connection.query(`
    DELETE FROM rentals WHERE id = ${id}
    `);

    res.status(200).send();
  } catch (err) {
    res.status(500).send("Internal Error!");
  }
}
