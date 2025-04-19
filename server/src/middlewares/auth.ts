import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HelperCommon } from "../helper/common";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return HelperCommon.sendResponse(res, 400, "Access token is missing");
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      return HelperCommon.sendResponse(res, 403, "Invalid token");
    }

    (req as Request & { user?: JwtPayload }).user = decoded as JwtPayload;
    next();
  });
};

export const checkAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as Request & { user?: any }).user;

  if (!user.role_type) {
    return HelperCommon.sendResponse(res, 401, "Role is missing");
  }

  if (!user || user.role_type !== "a") {
    return HelperCommon.sendResponse(
      res,
      403,
      "Forbidden: Insufficient permissions"
    );
  }

  next();
};

export const checkUserRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as Request & { user?: any }).user;

  if (!user.role_type) {
    return HelperCommon.sendResponse(res, 401, "Role is missing");
  }

  if (!user || user.role_type !== "u") {
    return HelperCommon.sendResponse(
      res,
      403,
      "Forbidden: Insufficient permissions"
    );
  }

  next();
};
