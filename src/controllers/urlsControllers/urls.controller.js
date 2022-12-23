import connection from "../../database/index.js";

export async function getUrls(req, res) {
  const { id } = req.params;

  try {
    const urlsList = await connection.query(
      'SELECT * FROM "shortenedUrls" WHERE "id"=$1;',
      [id]
    );

    if (!urlsList.rows[0]) {
      return res.status(404).send("url nao existente");
    }

    const body = urlsList.rows[0];
    delete body.visitCount;
    delete body.userId;
    delete body.createAt;

    res.status(200).send(body);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function openUrl(req, res) {
  const url = res.locals.url;
  //tem coisa estranha aqui, acho que redirect() tem que ser string
  try {
    res.redirect(url);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function deleteUrl(req, res) {
  const id = res.locals.id;
  try {
    await connection.query('DELETE FROM "shortenedUrls" WHERE id=$1;', [id]);
    res.send("deletado com sucesso").status(204);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

export async function shortUrl(req,res){}