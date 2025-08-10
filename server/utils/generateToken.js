const jwt = require("jsonwebtoken");

const secretKey = "your-very-secret-key";

const payload = {
  uid: 1,
};

const options = {
  expiresIn: "1h",
};

const token = jwt.sign(payload, secretKey, options);

console.log("Generated JWT:", token);
