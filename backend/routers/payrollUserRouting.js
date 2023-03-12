const express = require("express");
const router = express.Router();
const {
  createPayrollUser,
  createManyPayrollUser,
  loginUser,
  createPassword,
  updatePayrollEmployee,
  logout,
  loadUser,
  adminData,
  userData,
  getAllPayrollUser,
  candidateUser,
  singleEmployee,
  editEmployee,
  getNewUsers
} = require("../controller/payrollUserControl");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/isAuthenticated");

router.route("/login").post(loginUser);

//superAdmin (not in used)
router
  .route("/payroll/user/create")
  .post(isAuthenticated, isAdmin("superAdmin", "owner"), createPayrollUser);

//superAdmin
router.route("/payroll/user/update/:empId").put(updatePayrollEmployee);

// (not in used)
router
  .route("/payroll/many-user/create")
  .post(isAuthenticated, isAdmin("superAdmin", "owner"), createManyPayrollUser);

router
  .route("/payroll/user/all")
  .get(isAuthenticated, isAdmin("superAdmin", "owner"), getAllPayrollUser);

//Edit functionality routs
router
  .route("/single-emp/:id")
  .get(isAuthenticated, isAdmin("hrAdmin", "owner"), singleEmployee);

router
  .route("/edit-emp/:id")
  .put(isAuthenticated, isAdmin("hrAdmin", "owner"), editEmployee);

// user
router.route("/payroll/user/password/new").put(isNewEmployee, createPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, loadUser);
router
  .route("/admin/data")
  .get(isAuthenticated, isAdmin("superAdmin", "hrAdmin"), adminData);
router.route("/user/data").get(isAuthenticated, userData);

router.route("/payroll/user/new").get(isAuthenticated,isAdmin("superAdmin"),getNewUsers)

module.exports = router;
