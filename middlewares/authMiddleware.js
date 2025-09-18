import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token provided" });

  const parts = auth.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Token error" });

  const token = parts[1];
  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token invalid" });
    req.admin = decoded; // { id, username }
    next();
  });
};

export default verifyToken;
