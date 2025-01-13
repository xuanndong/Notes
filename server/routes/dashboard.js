import express from "express";
import isLoggedIn from "../middleware/checkAuth.js";

const router = express.Router();
import dashboardController from "../controllers/dashboardController.js";

/**
 * Dashboard Routes
 */
router.get("/dashboard", isLoggedIn, dashboardController.dashboard);

export default router;
