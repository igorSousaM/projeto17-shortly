import connection from "../../database/index.js";
import signUpSchema from "../../models/signUpSchema.model.js";
import bcrypt from "bcrypt";

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
    }

    const senha = body.password;

    const encryptedPassword = bcrypt.hashSync(senha, 10);

    delete body.confirmPassword;
    body.password = encryptedPassword;

    res.locals.body = body;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}

export async function validateSignIn(req, res, next) {
  const { email, password } = req.body;

  try {
    const userFound = await connection.query(
      "SELECT * FROM users WHERE email=$1;",
      [email]
    );

    if (!userFound.rows[0]) {
      return res.status(401).send("email nao cadastrado");
    }

    const userIsOn = await connection.query(
      'SELECT * FROM session WHERE "userId"=$1;',
      [userFound.rows[0].id]
    );
    console.log(userIsOn.rows[0]);

    if (userIsOn.rows[0]) {
      return res.status(401).send("voce ja esta online");
    }

    const passwordCheck = bcrypt.compareSync(
      password,
      userFound.rows[0].password
    );
    if (!passwordCheck) {
      return res.status(401).send("senha incorreta");
    }

    res.locals.id = userFound.rows[0].id;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

  next();
}

export async function validateUser(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("não tem token");
  }

  try {
    const session = await connection.query(
      "SELECT * FROM session WHERE token=$1;",
      [token]
    );

    if (!session.rows[0]) {
      return res.status(401).send("token invalido");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  res.locals.id = session.rows[0].userId;

  next();
}
