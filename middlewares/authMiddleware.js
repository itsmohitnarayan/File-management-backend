import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async function authMiddleware(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Assuming User model has role field
    req.user = { id: user._id, role: user.role }; // Attach role to req.user

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

