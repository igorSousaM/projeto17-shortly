import connection from "../../database/index.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = res.locals.body;
  try {
    await connection.query(
      "INSERT INTO users (name,email,password) VALUES ($1,$2,$3);",
      [name, email, password]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const id = res.locals.id;
  const token = uuid();
  
  try {
    await connection.query(
      'INSERT INTO session ("userId", token) VALUES ($1,$2);',
      [id, token]
    );

    res.status(200).send(token);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
