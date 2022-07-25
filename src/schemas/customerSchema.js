import joi from "joi";
import dayjs from "dayjs";

const dateNow = dayjs().format("YYYY-MM-DD");

const regex = /[0-9]{11}/;
const phoneRegex = /[0-9]{10,11}/;

const customerSchema = joi.object({
  name: joi.string().min(1).required(),
  cpf: joi.string().regex(regex).required(),
  phone: joi.string().regex(phoneRegex).required(),
  birthday: joi.date().max(dateNow).required(),
});

export default customerSchema;
