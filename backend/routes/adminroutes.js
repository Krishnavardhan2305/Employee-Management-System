import express from "express";
import { addemployee, addreview, addwork, deleteemployee, getallemployees, getAllReviews, getAllSubmittedWorks,  promoteemployee,getallorganizations,loginSuperAdmin } from "../controllers/admincontroller.js";
import isAuthenticated from "../middleware/Isauthenticated.js";
const router =express.Router();

router.route("/addemployee/:employeeId/:organizationId").post(addemployee);
router.route("/getallemployees/:organizationId").get(getallemployees);
router.route("/deleteemployee/:employeeId/:organizationId").delete(deleteemployee);
router.route("/promoteemployee/:employeeId/:organizationId").post(promoteemployee);
router.route("/addwork/:adminId/:employeeId").post(addwork);
router.route("/getallsubmittedworks/:adminId").get(getAllSubmittedWorks);
router.route("/addreview").post(addreview);
router.route("/review/:submittedWorkId").get(getAllReviews);
router.route("/getallorganizations").get(getallorganizations);
router.route("/SuperAdminLogin").post(loginSuperAdmin)

export default router;