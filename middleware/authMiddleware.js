export const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed
    }
    res.status(401).json({ message: 'Unauthorized. Please log in.' }); // User is not authenticated
  };