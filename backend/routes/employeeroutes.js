import express from "express";
import {adminlogin, changepassword, employeedetails, getallworks, getsubmittedworks, removework, submitwork, updateprofile,forgotpassword} from '../controllers/Employeecontroller.js'
import { singleUpload } from "../middleware/multer.js";
import isAuthenticated from "../middleware/Isauthenticated.js";
const router =express.Router();
router.route("/getemployeedetails/:employeeId").get(employeedetails);
router.route("/changepassword/:employeeId").post(changepassword);
router.route("/forgotpassword").post(forgotpassword);
router.route("/updateprofile/:employeeId").post(singleUpload,updateprofile);
router.route("/adminlogin/:employeeId").post(adminlogin);
router.route("/getallworks/:employeeId").get(getallworks);
router.route("/submitwork/:employeeId").post(submitwork);
router.route("/removework/:employeeId/:workId").delete(removework);
router.route("/getsubmittedworks/:employeeId/").get(getsubmittedworks);

export default router;