import { fb } from "@config/firebase";
import { DecodedIdToken } from "firebase-admin/auth";
import { NextFunction, Request, Response, Router } from "express";
import { validateRequestBody } from "@shared/index";
export const extractBearerToken = async (req: Request) => {
  if (req.headers.authorization)
    return req.headers.authorization?.split(" ")[1] ?? "";
  throw new Error(
    "Authorization header not found, please add the header and try again"
  );
};
export const authReqBearerToken = async (
  req: Request
): Promise<DecodedIdToken> => {
  const res = await fb.auth.verifyIdToken(await extractBearerToken(req));
  const user = await fb.auth.getUser(res.uid);
  return {
    ...res,
    role: user.customClaims?.role,
  };
};
export const generateFirebaseAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRequestBody(req, ["uid"], "body");
    const user = await fb.auth.getUser(req.body.uid);
    if (!user)
      throw new Error("Sorry, user with the provided id does not exist");
    res.send({
      data: await fb.auth.createCustomToken(req.body.uid),
      message: "Token generated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decodedToken = await authReqBearerToken(req);
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(error);
  }
};
export const generateAccessTokenRoute = Router();
generateAccessTokenRoute.get("/", generateFirebaseAccessToken);
