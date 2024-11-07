import express from 'express';
import { getUsers, getUser, createUser } from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get a single user
router.get('/:userId', getUser);

// Create a new user
router.post('/', createUser);

export default router;
