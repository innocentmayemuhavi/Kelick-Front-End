import { authReqBearerToken } from "@endpoints/auth";
import { Request } from "express";
import { FirebaseError } from "firebase-admin/app";

export const verifyUserAuthorization = async (
  req: Request,
  roles: string[]
) => {
  const auth_res = await authReqBearerToken(req);
  if (!auth_res || !auth_res.uid || !roles.includes(auth_res.role))
    throw new Error("auth/unauthorized");
  return auth_res;
};

export const handleError = (error: FirebaseError) => {
  const errorMessages: { [key: string]: string } = {
    "auth/id-token-expired":
      "Authentication session expired. Please refresh the page or login again",
    "auth/id-token-revoked":
      "Authentication session revoked. Please refresh the page or login again",
  };
  if (error.code) {
    return {
      code: error.code,
      message: errorMessages[error.code] ?? error.message,
      data: null,
    };
  }
  return {
    code: error.message.includes("auth/") ? "auth/unauthorized" : "api/error",
    message: error.message ?? "Something went wrong. Please try again",
    data: null,
  };
};
export const validateRequestBody = (
  req: Request,
  fields: string[],
  location: "body" | "params" | "query"
) => {
  fields.forEach((field) => {
    if (!req[location][field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  });
};
