import express from 'express';

import { getUsers, getUser, createUser} from '../controllers/userController.js';
import { registerUser, loginUser } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { changePassword } from '../controllers/userController.js';

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);


// Get all users
router.get('/', getUsers);

// Get a single user
router.get('/:userId', getUser);

// Create a new user
router.post('/', createUser);

router.put('/:userId/changePassword',authMiddleware, changePassword);


export default router;
