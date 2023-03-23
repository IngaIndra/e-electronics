import jwt, { decode } from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, "321890");

    req.user = decoded;
  } catch {
    // console.log(e.message);
    return res.status(401).json({ success: false, message: "User not found" });
  }

  return next();
};

export default verifyToken;
