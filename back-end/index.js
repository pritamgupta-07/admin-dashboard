import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import handleDatabase from "./db/config.js";
import { verifyAuthToken } from "./services/jwtAuth.js";
import {
  avatarRoutes,
  barChartRoutes,
  calendarRoutes,
  contactsRoutes,
  dashboardDataRoutes,
  geographyChartRoutes,
  geographyFeaturesRoutes,
  invoiceRoutes,
  lineChartRoutes,
  loginRoutes,
  pageNotFoundRoutes,
  pieChartRoutes,
  searchRoutes,
  teamRoutes,
  transactionRoutes,
  forgotPasswordRoutes,
} from "./routes/index.js";

// Database connection  && config

const databaseUrl = process.env.DATABASE_URL;
handleDatabase(databaseUrl);

// Application
const app = express();

// Middleware
app.use(cors());
app.use((req, res, next) => {
  if (req.path === "/login" || "/forgot-password") {
    return next();
  } else {
    verifyAuthToken(req, res, next);
  }
});
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Routes 

app.use("/login", loginRoutes);
app.use("/team", teamRoutes);
app.use("/contacts", contactsRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/transactions", transactionRoutes);
app.use("/calendar", calendarRoutes);
app.use("/pie-chart", pieChartRoutes);
app.use("/line-chart", lineChartRoutes);
app.use("/bar-chart", barChartRoutes);
app.use("/geography-chart", geographyChartRoutes);
app.use("/geography-features", geographyFeaturesRoutes);
app.use("/dashboard", dashboardDataRoutes);
app.use("/search", searchRoutes);
app.use("/avatar", avatarRoutes);
app.use("/forgot-password", forgotPasswordRoutes);
app.use("*", pageNotFoundRoutes);

// Server Port

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`);
});
