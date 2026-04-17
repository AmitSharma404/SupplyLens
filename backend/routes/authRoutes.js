
import express from 'express';
import { register,login,logout, getCurrentUser } from '../controllers/authController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const appRouter = express.Router();

appRouter.post('/register',register);

appRouter.post('/login',login);

appRouter.post('/logout',logout);

appRouter.get('/me', protectedRoute, getCurrentUser);

export default appRouter;

