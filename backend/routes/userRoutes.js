import express from 'express';
import { getAllUsers, updateUserRole } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.route('/')
    .get(protect, authorize(['admin']), getAllUsers);

userRouter.route('/:id/role')
    .put(protect, authorize(['admin']), updateUserRole);

export default userRouter;
