const StatusCode = require("../helper/httpStatusCode");
const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res
        .status(StatusCode.Unauthorized)
        .json({ message: "No token provided" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (roles.length && !roles.includes(decoded.role))
        return res
          .status(StatusCode.Forbidden)
          .json({ message: "Access denied" });
      req.user = decoded;
      next();
    } catch (err) {
      res.status(StatusCode.Forbidden).json({ message: "Invalid token" });
    }
  };
};
