import crypto from "crypto";

const generateJwtSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

const jwtSecret = generateJwtSecret();

console.log(jwtSecret);