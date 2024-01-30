const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).custom((value, helpers) => {
  if (!(value.name || value.email || value.phone)) {
    throw new Joi.ValidationError(
      "Body must have at least one field",
      [{}, { message: "Body must have at least one field" }],
      value
    );
  }
  return value;
}, "custom validation");

module.exports = { createContactSchema, updateContactSchema };