const ErrorHandler = require("../utils/ErrorHandler");
const catchAysncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const pfEmpInfo = require("../model/pfEmpModel");

//To upload employee pf info by Hr Admin
exports.createPfEmpInfo = catchAysncError(async (req, res, next) => {
  try {
    const candiInfo = await pfEmpInfo.insertMany(req.body);
    console.log(req.body);
    res.send(candiInfo);
    res.status(200).json(candiInfo);
  } catch (error) {
    if (error.code === 11000) {
      const err = { ...error };
      let errMessageArray = err.writeErrors[0].err.errmsg.split("key: ");
      let strErrMessage = errMessageArray[1];
      let empErrorKey = strErrMessage.split(': "')[0].split("{ ")[1];
      let empErrorValue = strErrMessage.split(': "')[1].split(`" }`)[0];
      let mainErrorMessage = `Pf Information of Employee with ${empErrorKey} = ${empErrorValue} already exists`;
      return res.status(200).json({ success: false, error: mainErrorMessage });
    }
  }
});

// To get employee information for Owner
exports.getAllPfEmp = catchAysncError(async (req, res, next) => {
  const empInfo = await pfEmpInfo.find();
  res.status(200).json({ success: true, empInfo });
});

// edit functinality of an active pf employee
exports.singlePfEmployee = async (req, res) => {
  const singlePfEmp = await pfEmpInfo.findOne({ _id: req.params.id });
  res.status(200).json(singlePfEmp);
};

exports.editPfEmployee = async (req, res) => {
  await pfEmpInfo.findByIdAndUpdate(req.params.id, req.body);
  res.send(req.body);
};
