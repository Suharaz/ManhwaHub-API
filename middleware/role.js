const checkRole = (roles) => (req, res, next) => {
if (!Array.isArray(roles)) {
  roles = [roles];
}
if (!roles.includes(req.user.role_id)) {
      return res.status(403).json({ message: 'Permission denied' });
    }
    next();
  };
  
  module.exports = checkRole;
