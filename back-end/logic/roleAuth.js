// roleAuth.js

export const requireAdmin = (req, res, next) => {
    if (!req || !req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: "Administrator privileges required to perform this operation." });
    }
    next();
};