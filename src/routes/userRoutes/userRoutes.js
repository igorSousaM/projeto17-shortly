import express from "express";

const userRouter = express.Router();
userRouter.post('singup');
userRouter.post('singin');
userRouter.get('user/me');

export default userRouter;
