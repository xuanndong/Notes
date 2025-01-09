import express from "express";

const router = express.Router();
import mainController from "../controllers/mainController.js";


/**
 * App Routes
 */
router.get('/', mainController.homepage);
router.get('/about', mainController.about);

export default router;
