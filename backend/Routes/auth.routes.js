
import express from 'express';
import { register,login,logout, getCurrentUser } from '../Authentication/authControlles.js';
import { protectedRoute } from '../utils/protectedRoutes.js';

const authRouter = express.Router();

authRouter.post('/register',register);

authRouter.post('/login',login);

authRouter.post('/logout',logout);

authRouter.get('/me', protectedRoute, getCurrentUser);

export default authRouter;

