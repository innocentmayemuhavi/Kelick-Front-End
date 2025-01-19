import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {
  FieldPath,
  FieldValue,
  Filter,
  Timestamp,
  getFirestore,
} from "firebase-admin/firestore";
import { getDownloadURL, getStorage } from "firebase-admin/storage";

const app = initializeApp();

const getEnvironment = () => {
  const projectId = app.options.projectId;
  let env = "DEV";
  if (projectId === "kelick-production") env = "PROD";
  if (projectId === "kelick-staged") env = "STAGING";
  return env;
};

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const employeesCollection = db.collection("employees");

export const fb = {
  app,
  FieldValue,
  db,
  employeesCollection,
  auth,
  Timestamp,
  Filter,
  storage,
  getDownloadURL,
  FieldPath,
  getEnvironment,
};
