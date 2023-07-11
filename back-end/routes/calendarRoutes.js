import express from "express";
import {
  handleGetCalendarEvent,
  handleCreateCalendarEvent,
  handleDeleteCalendarEvent,
  handleUpdateCalendarEvent,
} from "../controllers/calendarControllers.js";

const calendarRoutes = express.Router();

calendarRoutes.get("/", handleGetCalendarEvent);
calendarRoutes.post("/create-event", handleCreateCalendarEvent);
calendarRoutes.delete("/delete/:id", handleDeleteCalendarEvent);
calendarRoutes.put("/update/:id", handleUpdateCalendarEvent);

export { calendarRoutes };
