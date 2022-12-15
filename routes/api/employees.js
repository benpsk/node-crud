import express from "express";
import * as employeeController from "../../controllers/employeeController.js";
import ROLES_LIST from "../../config/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js";
const router = express.Router();


router.route('/')
    .get(employeeController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createNewEmployee)

router.route('/:id')
    .get(employeeController.getEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

export default router;