import express from 'express';
import { getAllUsers, updateUserRole } from '../controllers/userController.js';
import { protectedRoute, verifyRole } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/')
    .get(protectedRoute, verifyRole(['admin']), getAllUsers);

userRouter.route('/:id/role')
    .put(protectedRoute, verifyRole(['admin']), updateUserRole);

export default userRouter;
