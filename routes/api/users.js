import express from "express";
import * as userController from "../../controllers/userController.js";
import ROLES_LIST from "../../config/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js";
const router = express.Router();


router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin), userController.getAllUsers)

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), userController.getUser)
    .delete(verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

export default router;