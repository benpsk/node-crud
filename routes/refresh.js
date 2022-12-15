import express from "express";
const router = express.Router();

import * as refreshTokenController from "../controllers/refreshTokenController.js";

router.get('/', refreshTokenController.handleRefreshToken);

export default router;