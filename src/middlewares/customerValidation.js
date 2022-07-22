import customerSchema from "../schemas/customerSchema.js";

export default async function customerValidation(req, res, next) {
  const { err } = customerSchema.validate();

  if (err) {
    res.status(400).send("Bad request! Review it!");
    return;
  }

  next();
}
