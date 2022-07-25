import joi from "joi";

const httpRegex = /^http:\/\//;

const gamesSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().pattern(httpRegex).required(),
  stockTotal: joi.number().integer().min(1).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().integer().min(1).required(),
});

export default gamesSchema;
