import express from "express";
const router = express.Router();

import * as authController from "../controllers/authController.js";

router.post('/', authController.handleLogin);

export default router;