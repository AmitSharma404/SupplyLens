
import express from 'express';
import { register, login, logout, getCurrentUser, googleAuth } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const appRouter = express.Router();

appRouter.post('/register', register);
appRouter.post('/login', login);
appRouter.post('/logout', logout);
appRouter.post('/google', googleAuth);
appRouter.get('/me', protect, getCurrentUser);

export default appRouter;

