import User from '../models/userModel.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific user
export const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = new User({
      username,
      email,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
