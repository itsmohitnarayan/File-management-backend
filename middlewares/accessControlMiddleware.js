import { rolePermissions } from '../config/roles.js';

const checkPermission = (permission) => (req, res, next) => {
  const userRole = req.user.role; // Assume role is set in auth middleware

  if (!userRole || !rolePermissions[userRole].includes(permission)) {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};

export default checkPermission;
