import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-oauth2";
import axios from "axios";

const IRAS_AUTH_URL = process.env.IRAS_AUTH_URL!;
const IRAS_TOKEN_URL = process.env.IRAS_TOKEN_URL!;
const IRAS_API_URL = process.env.IRAS_API_URL!;
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: IRAS_AUTH_URL,
      tokenURL: IRAS_TOKEN_URL,
      clientID: process.env.IRAS_CLIENT_ID!,
      clientSecret: process.env.IRAS_CLIENT_SECRET!,
      callbackURL: "http://localhost:4000/auth/iras/callback",
    },
    (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: (
        arg0: null,
        arg1: { accessToken: any; refreshToken: any; profile: any }
      ) => any
    ) => {
      // Save tokens and profile information
      return cb(null, { accessToken, refreshToken, profile });
    }
  )
);

export const getIRASData = async (accessToken: string, endpoint: string) => {
  try {
    const response = await axios.get(`${IRAS_API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch data from IRAS: ${error.message}`);
    } else {
      throw new Error(
        "Failed to fetch data from IRAS: An unknown error occurred"
      );
    }
  }
};
