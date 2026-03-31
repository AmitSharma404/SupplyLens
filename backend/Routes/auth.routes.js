
import express from 'express';
import { register,login,logout } from '../Authentication/authControlles.js';

const appRouter = express.Router();

appRouter.post('/register',register);

appRouter.post('/login',login);

appRouter.post('/logout',logout);

export default appRouter;

