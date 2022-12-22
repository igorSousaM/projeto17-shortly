import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  confirmPassword: joi.string().min(8).required().valid(joi.ref('password'))
});

export default signUpSchema;
