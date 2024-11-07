import File from '../models/fileModel.js';

// Middleware for role-based access
export const checkRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// Middleware for department-based access to files
export const checkDepartmentAccess = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if (file.department !== req.user.department && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized access to this file' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to check access', error: error.message });
    }
};
