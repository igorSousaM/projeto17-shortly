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
      [shortUrlText.rows[0].visitCount + 1,shortUrl]
    );

    const url = shortUrlText.rows[0].url
    //res.status(200).redirect(url)
    res.locals.url = url
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  next();
}
