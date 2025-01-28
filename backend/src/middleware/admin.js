import jwt from "jsonwebtoken";

/**
 * Middleware to verify if the user has admin role
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
const verifyRole = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify JWT secret exists
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Internal server error" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, jwtSecret);

    // Check if user has admin role
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Attach decoded user data to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
      name:decoded.name
    };

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { verifyRole };