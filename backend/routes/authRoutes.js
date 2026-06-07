
import express from 'express';
import { register, login, logout, getCurrentUser, googleAuth } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

appRouter.post('/register',register);

appRouter.post('/login',login);

appRouter.post('/logout',logout);

appRouter.get('/me', protectedRoute, getCurrentUser);

export default authRouter;

