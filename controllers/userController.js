import User from '../models/User.js';
import bcrypt from 'bcrypt';

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

export const changePassword = async (req, res) => {
    try {
      const { userId } = req.params;
      const { oldPassword, newPassword } = req.body;
  
      // Find the user by ID (this is where your `userId` parameter comes in)
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the old password matches
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update password', error: error.message });
    }
  };