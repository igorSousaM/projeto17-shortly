import express from "express";
import { getUserUrls, openUrl } from "../../controllers/urlsControllers/urls.controller.js";
import { validateOpenUrl } from "../../middlewares/urlsMiddlewares/urls.middleware.js";

const urlsRouter = express.Router();
urlsRouter.post('/urls/shorten');
urlsRouter.get('/urls/:id',getUserUrls);
urlsRouter.get('/urls/open/:shortUrl', validateOpenUrl, openUrl);
urlsRouter.delete('/urls/:id');

export default urlsRouter;