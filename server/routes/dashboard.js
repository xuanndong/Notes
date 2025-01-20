import express from "express";
import Logged from "../middleware/checkAuth.js";

const router = express.Router();
import dashboardController from "../controllers/dashboardController.js";

/**
 * Dashboard Routes
 */
router.get("/dashboard", Logged.isLoggedIn, dashboardController.dashboard);
router.get(
  "/dashboard/item/:id",
  Logged.isLoggedIn,
  dashboardController.dashboarViewNote
);
router.put(
  "/dashboard/item/:id",
  Logged.isLoggedIn,
  dashboardController.dashboarUpdateNote
);
router.delete(
  "/dashboard/item-delete/:id",
  Logged.isLoggedIn,
  dashboardController.dashboarDeleteNote
);
router.get(
  "/dashboard/add",
  Logged.isLoggedIn,
  dashboardController.dashboarAddNote
);
router.post(
  "/dashboard/add",
  Logged.isLoggedIn,
  dashboardController.dashboarAddNoteSubmit
);
router.get(
  "/dashboard/search",
  Logged.isLoggedIn,
  dashboardController.dashboardSearch
);
router.post(
  "/dashboard/search",
  Logged.isLoggedIn,
  dashboardController.dashboardSearchSubmit
);

export default router;
