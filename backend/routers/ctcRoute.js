const express = require("express");
const router = express.Router();
const {
  createCTC,
  getMyCTC,
  getAllCtc,
  singleCtc,
  editCtc,
} = require("../controller/ctcController");
const {
  isAdmin,
  isAuthenticated,
  isNewEmployee,
} = require("../middleware/isAuthenticated");

//Creating route for CTC
router.route("/payroll/ctc/create").post(createCTC);
router.route("/payroll/user/ctc").get(isAuthenticated, getMyCTC);
router
  .route("/payroll/user/all/ctc")
  .get(isAuthenticated, isAdmin("owner"), getAllCtc);
module.exports = router;

//Edit functionality routs
router
  .route("/single-ctc/:id")
  .get(isAuthenticated, isAdmin("owner"), singleCtc);

router.route("/edit-ctc/:id").put(isAuthenticated, isAdmin("owner"), editCtc);
