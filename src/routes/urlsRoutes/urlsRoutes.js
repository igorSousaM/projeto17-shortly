import express from "express";
import { getUrls, openUrl } from "../../controllers/urlsControllers/urls.controller.js";
import { validateOpenUrl } from "../../middlewares/urlsMiddlewares/urls.middleware.js";

const urlsRouter = express.Router();
urlsRouter.post('/urls/shorten');
urlsRouter.get('/urls/:id',getUrls);
urlsRouter.get('/urls/open/:shortUrl', validateOpenUrl, openUrl);
urlsRouter.delete('/urls/:id');

export default urlsRouter;