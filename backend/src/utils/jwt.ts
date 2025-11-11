import jwt, { SignOptions, Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "fallback_secret";

export const generateToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "2h") as any,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
