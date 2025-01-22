import { utils, writeFile } from "xlsx";
import axios from "axios";
import { IEmployees } from "../models";
import toast from "react-hot-toast";
const generateFileFromData = (data: any[], filename: string) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");
  writeFile(wb, filename);
};

const getEmployees = (token: string) => {
  const res = axios
    .get("./backend/employees.json", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data as IEmployees[])
    .catch((_) => {
      toast.error("Am error occured...try again later");
      return;
    });

  return res;
};

export { generateFileFromData, getEmployees };
