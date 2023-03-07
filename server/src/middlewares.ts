import { Request, Response, NextFunction } from "express";

const logRequests = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

export { logRequests };
