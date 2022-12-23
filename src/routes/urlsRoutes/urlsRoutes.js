import express from "express";
import { deleteUrl, getUrls, openUrl, shortUrl } from "../../controllers/urlsControllers/urls.controller.js";
import { validateDeleteUrl, validateOpenUrl, validateShortUrl } from "../../middlewares/urlsMiddlewares/urls.middleware.js";

const urlsRouter = express.Router();
urlsRouter.post('/urls/shorten',validateShortUrl, shortUrl);
urlsRouter.get('/urls/:id',getUrls);
urlsRouter.get('/urls/open/:shortUrl', validateOpenUrl, openUrl);
urlsRouter.delete('/urls/:id', validateDeleteUrl, deleteUrl);

export default urlsRouter;