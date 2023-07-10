import express from "express";
import {
  handleGetTeamData,
  handleCreateTeam,
  handleUpdateTeam,
  handleDeleteTeam,
} from "../controllers/teamControllers.js";
import { handleUserAccess } from "../middlewares/accessMiddleware.js";

const teamRoutes = express.Router();

teamRoutes.get("/:access", handleGetTeamData);

teamRoutes.post("/:access/create", handleUserAccess, handleCreateTeam);

teamRoutes.put("/:access/update/:id", handleUserAccess, handleUpdateTeam);

teamRoutes.delete("/:access/delete/:id", handleUserAccess, handleDeleteTeam);

export { teamRoutes };
