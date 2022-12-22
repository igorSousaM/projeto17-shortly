import connection from "../../database/index.js";
import signUpSchema from "../../models/signUpSchema.model.js";
import bcrypt from 'bcrypt';

export async function validateSignUp(req, res, next) {
  const body = req.body;

  const { error } = signUpSchema.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const userExist = await connection.query(
      "SELECT * FROM users WHERE email = $1",
      [body.email]
    );
    if (userExist.rows[0]) {
      return res.status(409).send("email ja cadastrado");
    };

    
const senha = body.password;

    const encryptedPassword = bcrypt.hashSync(senha,10)

    delete body.confirmPassword;
    body.password = encryptedPassword;
    res.locals.body = body;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  };

  next();
};
