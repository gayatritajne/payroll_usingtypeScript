const mongoose = require("mongoose");
const con = require("../db/connection");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);

const userCTCSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "Please enter full name of Employee"],
    maxLength: [30, "name cannot exceed 30 character"],
    minLenght: [4, "name must have more than 4 characters"],
  },
  Emp_Id: {
    type: String,
    required: [true, "please Enter Employee Emp_Id"],
    unique: true,
  },
  CTC: {
    type: String,
    required: [true, "please Enter employee CTC"],
  },
  vi: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userCTCSchema.pre("insertMany", async function (next, docs) {
  try {
    docs.map(async function (doc, index) {
      // encript the CTC
      if (doc.CTC !== undefined) {
        let cipher = crypto.createCipheriv(
          algorithm,
          process.env.CTC_SECRETE_KEY.slice(0, 32),
          iv
        );
        let encryptedData = cipher.update(doc.CTC, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        const base64String = Buffer.from(iv, "binary").toString("base64");
        doc.CTC = encryptedData;
        doc.vi = base64String;
      }
    });
  } catch (error) {}
  next();
});

//hash password
userCTCSchema.pre("save", async function (next) {
  if (this.CTC !== undefined) {
    let cipher = crypto.createCipheriv(
      algorithm,
      process.env.CTC_SECRETE_KEY.slice(0, 32),
      iv
    );
    let encryptedData = cipher.update(this.CTC, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    const base64String = Buffer.from(iv, "binary").toString("base64");
    this.CTC = encryptedData;
    this.vi = base64String;
  }
});

const ctcModel = con.PAYROLL.model("CTCEmployee", userCTCSchema);
module.exports = ctcModel;
