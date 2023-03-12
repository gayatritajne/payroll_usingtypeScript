const mongoose = require("mongoose");
const con = require("../db/connection");

const pfEmpSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  empId: {
    type: String,
    unique: true,
    required: [true, "Please Enter employee id"],
  },
  empDob: {
    type: String,
  },
  aadharNumber: {
    type: Number,
  },
  panNumber: {
    type: String,
  },
  bankName: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  accountNumber: {
    type: Number,
  },
  address: {
    type: String,
  },
  dateofRegistration: {
    type: String,
  },
  pfUanNumber: {
    type: Number,
  },
  pfStatus: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const pfEmpModel = con.PAYROLL.model("pfEmpInfo", pfEmpSchema);

module.exports = pfEmpModel;
