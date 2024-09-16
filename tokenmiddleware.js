// middleware/authenticateToken.js
import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the header

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return res.redirect('/'); // Redirect to login if token is invalid
    }

    req.user = user; // Attach the user info to the request object
    next(); // Proceed to the next middleware
  });
}
