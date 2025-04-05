export const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Administrator priviliges required to perform this operation." });
    }
    next();
};