import connection from "../../database/index.js";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.body;
  try {
    await connection.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3);",
      [name, email, password]
    );
    res.sendStatus(201)
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const {email,password} = req.body;
}
