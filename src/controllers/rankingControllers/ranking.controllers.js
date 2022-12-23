import connection from "../../database/index.js";

export async function getRank(req, res) {
  try {
    const rankList = await connection.query(
      `SELECT u.id,
      u.name, 
      COUNT(s."userId") as "linksCount",
      SUM(s."visitCount") as "visitCount" 
      FROM users u 
      JOIN "shortenedUrls" s 
      ON s."userId"=u.id 
      GROUP BY u.id
      ORDER BY "visitCount" DESC
      LIMIT 10;
        `
    );

    const ranking = rankList.rows;

    res.status(200).send(ranking);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}