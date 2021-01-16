const mongoose = require("mongoose");
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required()
});

const validate = (inputs)=>{
  return schema.validate(inputs)
}

const users = mongoose.model(
  "users",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  })
);

module.exports = { users, validate };
