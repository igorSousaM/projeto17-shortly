import express from "express";
import { getRank } from "../../controllers/rankingControllers/ranking.controllers.js";

const rankingRouter = express.Router();

rankingRouter.get('/ranking',getRank)

export default rankingRouter;