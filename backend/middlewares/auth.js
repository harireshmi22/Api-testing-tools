import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    // Skip authentication for development environment
    if (process.env.NODE_ENV === 'development') {
      req.userId = 'dev-user';
      return next();
    }
    
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No token, Authorization denied" });
    }

    // Use a default secret if JWT_SECRET is not set
    const jwtSecret = process.env.JWT_SECRET || 'default-dev-secret';
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error){
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};
