import express from "express";
import { signIn, signUp } from "../../controllers/userControllers/user.controller.js";
import { validateSignUp } from "../../middlewares/userMiddlewares/user.middleware.js";

const userRouter = express.Router();
userRouter.post('/signup',validateSignUp,signUp);
userRouter.post('/signin', signIn);
userRouter.get('/user/me');

export default userRouter;
    