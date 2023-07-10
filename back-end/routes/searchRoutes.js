import express from "express";
import {
  handleContactSearchOperation,
  handleInvoiceSearchOperation,
  handleTeamSearchOperation,
} from "../controllers/searchControllers.js";

const searchRoutes = express.Router();

searchRoutes.get("/contact/:key", handleContactSearchOperation);

searchRoutes.get("/invoice/:key", handleInvoiceSearchOperation);

searchRoutes.get("/team/:key", handleTeamSearchOperation);

export {searchRoutes};
