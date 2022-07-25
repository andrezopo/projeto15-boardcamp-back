import customerSchema from "../schemas/customerSchema.js";

export default async function customerValidation(req, res, next) {
  const { error } = customerSchema.validate(req.body);

  if (error) {
    res.status(400).send("Bad request! Review it!");
    return;
  }

  next();
}
