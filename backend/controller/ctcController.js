const ErrorHandler = require("../utils/ErrorHandler");
const catchAysncError = require("../middleware/catchAsyncError");
const CtcEmployee = require("../model/ctcModel");
const decodeCTC = require("../utils/decodeCtc");

exports.createCTC = async (req, res, next) => {
  try {
    if (req.body.length < 1) {
      return next(new ErrorHandler("Please provide a data", 200));
    }
    const ctcInfo = await CtcEmployee.insertMany(req.body);
    res.status(200).json({
      success: true,
      message: "Employee CTC uploaded successfully",
      ctcInfo,
    });
  } catch (error) {
    if (error.code === 11000) {
      const err = { ...error };
      let errMessageArray = err.writeErrors[0].err.errmsg.split("key: ");
      let strErrMessage = errMessageArray[1];
      let empErrorKey = strErrMessage.split(': "')[0].split("{ ")[1];
      let empErrorValue = strErrMessage.split(': "')[1].split(`" }`)[0];
      let mainErrorMessage = `Employee with ${empErrorKey} = ${empErrorValue} already exists`;
      return res.status(200).json({ success: false, error: mainErrorMessage });
    } else {
      res.status(200).json({ success: false, error: error.message });
    }
  }
};

exports.getMyCTC = catchAysncError(async (req, res, next) => {
  const employeeCTC = await CtcEmployee.findOne(
    { Emp_Id: req.employee.empId }
  );
  if (!employeeCTC) {
    return next(new ErrorHandler("User CTC not found"));
  }
  employeeCTC.CTC = await decodeCTC(employeeCTC.CTC, employeeCTC.vi);
  employeeCTC.vi = undefined;
  res.status(200).json({ success: true, employeeCTC });
});

exports.getAllCtc = catchAysncError(async (req, res, next) => {
  const allCtc = await CtcEmployee.find();
  for (ctc of allCtc) {
    if (isNaN(ctc.CTC)) ctc.CTC = await decodeCTC(ctc.CTC, ctc.vi);
    ctc.vi = undefined;
  }
  res.status(200).json({
    success: true,
    allCtc,
  });
});

//Edit
exports.singleCtc = async (req, res) => {
  const singleCtc = await CtcEmployee.findOne({ _id: req.params.id });
  singleCtc.CTC = await decodeCTC(singleCtc.CTC, singleCtc.vi);
  singleCtc.vi = undefined;
  res.status(200).json(singleCtc);
};

exports.editCtc = async (req, res) => {
  const { Emp_Id, Name, CTC } = req.body;
  let ctc = await CtcEmployee.findOne({ Emp_Id });
  if (!ctc) {
    return res
      .status(200)
      .json({ success: false, message: "User ctc not found" });
  }

  ctc.CTC = CTC;
  ctc.Name = Name;
  ctc.save();

  res.send(req.body);
};