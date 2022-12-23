import express from "express";
import { getUserUrls, signIn, signUp } from "../../controllers/userControllers/user.controller.js";
import { validateSignIn, validateSignUp, validateUser } from "../../middlewares/userMiddlewares/user.middleware.js";

const userRouter = express.Router();
userRouter.post('/signup',validateSignUp,signUp);
userRouter.post('/signin', validateSignIn, signIn);
userRouter.get('/user/me',validateUser, getUserUrls);

export default userRouter;
    