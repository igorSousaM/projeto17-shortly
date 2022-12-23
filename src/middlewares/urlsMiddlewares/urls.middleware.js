import connection from "../../database/index.js";

export async function validateOpenUrl(req, res, next) {
  const { shortUrl } = req.params;

  try {
    const shortUrlText = await connection.query(
      'SELECT * FROM "shortenedUrls" WHERE "shortUrl"=$1;',
      [shortUrl]
    );

    if (!shortUrlText.rows[0]) {
      return res.status(404).send("url nao existe");
    }

    await connection.query(
      'UPDATE "shortenedUrls" SET "visitCount"= $1 WHERE "shortUrl"=$2;',
      [shortUrlText.rows[0].visitCount + 1, shortUrl]
    );

    const url = shortUrlText.rows[0].url;
    //res.status(200).redirect(url)
    res.locals.url = url;
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  next();
}

export async function validateDeleteUrl(req, res, next) {
  const { id } = req.params;

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

    const url = await connection.query(
      'SELECT * FROM "shortenedUrls" WHERE id=$1',
      [id]
    );

    if(!url.rows[0]){
      return res.status(404).send('url nao existe');
    }

    if(url.rows[0].userId !== session.rows[0].userId){
      return res.status(401).send('voce nao pode excluir essa url')
    }
    
    res.locals.id = id;
   
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  next();
}

export async function validateShortUrl(req,res,next){
  next();
}