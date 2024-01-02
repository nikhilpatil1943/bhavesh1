import jwt from "jsonwebtoken";
// import userList from "../models/userSchema.js";

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Assuming the token is sent in the 'Authorization' header
     console.log(authHeader)
    try {
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
      }
  
      const token = authHeader.split(" ")[1]; // Splitting and retrieving the token without the "Bearer" prefix
  
      const decodedToken = jwt.verify(token, process.env.JSONTOKEN); // Replace process.env.JSONTOKEN with your secret
  
      req.userId = decodedToken.id; 
      req.username = decodedToken.username;// Attaching the user ID to the request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.log(error)
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      return res.status(500).json({ message: "this is Internal Server Error" });
    }
  };
  
export default authenticateUser;
