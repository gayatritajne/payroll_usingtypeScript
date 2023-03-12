const express = require("express");
const router = express.Router();
const {
  createPfEmpInfo,
  getAllPfEmp,
  singlePfEmployee,
  editPfEmployee
} = require("../controller/pfEmpController");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/isAuthenticated");

//Creating route for HR admin to upload candidate's Info
router
  .route("/payroll/pfEmployee/all")
  .post(isAuthenticated, isAdmin("hrAdmin"), createPfEmpInfo);

//To Display list
router
  .route("/pfEmp/data")
  .get(isAuthenticated, isAdmin("hrAdmin"), getAllPfEmp);

// edit functinality of an active pf employee

router
    .route("/single-pfemp/:id")
    .get(isAuthenticated, isAdmin("hrAdmin"), singlePfEmployee);

router
    .route("/edit-pfemp/:id")
    .put(isAuthenticated, isAdmin("hrAdmin"), editPfEmployee);

module.exports = router;
