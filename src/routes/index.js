import express from "express";
import rankingRouter from "./rankingRoute/rankingRoute.js";
import urlsRouter from "./urlsRoutes/urlsRoutes.js";
import userRouter from "./userRoutes/userRoutes.js";

const router = express.Router();
router.use(userRouter);
router.use(urlsRouter);
router.use(rankingRouter);

export default router;
