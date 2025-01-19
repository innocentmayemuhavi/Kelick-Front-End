import { NextFunction, Request, Response, Router } from "express";
import Joi from "joi";

const validateGetEmployees = (req: Request, res: Response) => {
  const schema = Joi.object({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(1).required(),
    year: Joi.number().min(2000).max(new Date().getFullYear()).required(),
  });
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  const validationError = validateGetEmployees(req, res);
  if (validationError) {
    return;
  }

  const { page, limit, year } = req.query;
  res.json({ message: "success", data: { page, limit, year } });
};

export const employeesRouter = Router();

employeesRouter.get("/", getEmployees);
