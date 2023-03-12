import React, { useEffect } from "react"
import Layout from "../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Link } from "gatsby"
import axios from "axios"
import { getAdminData } from "../services/apiFunction"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [records, setRecords] = useState([])
  const [empToEdit, setEmpToEdit] = useState({
    name: "",
    empId: "",
    email: "",
    dob: "",
    contactNo: "",
    gender: "",
    joiningDate: "",
    probationPeriod: "",
    confirmationDate: "",
    designation: "",
    location: "",
    department: "",
    role: "",
    workMode: "",
    numberOfMember: "",
    status: "",
    NameofSpouse: "",
    relationship: "",
    DOB: "",
    child1: "",
    child1Gender: "",
    DOB1: "",
    child2: "",
    child2Gender: "",
    DOB2: "",
    NameofFather: "",
    DOB3: "",
    NameofMother: "",
    DOB4: " ",
    pan: " ",
    pf: " ",
    paymentType: " ",
    bankName: "",
    bankBranch: "",
    ifscCode: "",
    accountNumber: "",
    password: "",
  })
  // to get all records from db
  const getAllEmployees = async () => {
    let data = await getAdminData()
    setRecords(data)
    console.log(data)
  }
  //calling all records function
  useEffect(() => {
    getAllEmployees()
  }, [])
  // to target particular record
  const onValueChange = e => {
    setEmpToEdit({ ...empToEdit, [e.target.name]: e.target.value })
  }
  // on Edit button click

  const onEditBtnClick = async (e, empId) => {
    const tableRow = e.target.closest("tr")
    const rowData = tableRow.querySelectorAll(".data")
    tableRow.querySelectorAll(".data").forEach(input => {
      input.style = "appearance: block"
      input.style.border = "1px solid black"
    })
    tableRow.querySelector(".save-btn").style.display = ""
    rowData.forEach(element => {
      element.removeAttribute("readOnly")
    })
    const currentEmp = await axios.get(`/api/v2/single-emp/${empId}`)
    setEmpToEdit(currentEmp.data)

    document.getElementById("select").disabled = false
  }

  // on save button click
  const onSaveBtnClick = async (e, empId) => {
    if (empToEdit.probationPeriod === "3") {
      let confirmDate = new Date(empToEdit.joiningDate)
      var Cdate = confirmDate.setMonth(confirmDate.getMonth() + 3)
      let confirmedDate = new Date(+new Date(Cdate) + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
      empToEdit.confirmationDate = confirmedDate
      getAllEmployees()
    }
    if (empToEdit.probationPeriod === "6") {
      let confirmDate = new Date(empToEdit.joiningDate)
      var Cdate = confirmDate.setMonth(confirmDate.getMonth() + 6)
      let confirmedDate = new Date(+new Date(Cdate) + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
      empToEdit.confirmationDate = confirmedDate
      getAllEmployees()
    }
    if (empToEdit.probationPeriod === "9") {
      let confirmDate = new Date(empToEdit.joiningDate)
      var Cdate = confirmDate.setMonth(confirmDate.getMonth() + 9)
      let confirmedDate = new Date(+new Date(Cdate) + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
      empToEdit.confirmationDate = confirmedDate
      getAllEmployees()
    }
    // post edited data to db
    if (empToEdit.name === "") {
      toast.error("Field should not be empty.", {
        position: toast.POSITION.TOP_CENTER
    });
      //alert("Field should not be empty.")
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".eName").forEach(input => {
        input.style.border = "2px solid red"
      })
    } else {
      await axios.put(`/api/v2/edit-emp/${empId}`, empToEdit)
      e.target.style.display = "none"
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".data").forEach(input => {
        input.style = "appearance: none"
        input.style.border = "none"
      })
      document.getElementById("select").disabled = true
      toast.success("Information is updated successfully.", {
        position: toast.POSITION.TOP_CENTER
    });
      getAllEmployees()
    }
  }
  return (
    <Layout>
      <div className="container-fluid HrEmployeeContainer margin">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <Link to="/app/hrdashboard">
              {/* <img src="/arrow.png" alt="" className="arrowImg" /> */}
              <i class="bi bi-arrow-left-circle-fill"></i>
            </Link>
            <div className="hrTableHeading">
              <h1 className="animate-charcter">List of All Employees</h1>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="empTable">
              {/* table start */}
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th className="heading">Sr. No.</th>
                    <th className="heading">Employee Id</th>
                    <th className="heading">Name of Employee</th>
                    <th className="heading">Date of Joining</th>
                    <th className="heading">Probation Period</th>
                    <th className="heading">Confirmation Date</th>
                    <th className="heading">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, Index) => {
                    const confirmationDate = record.confirmationDate
                      .split("-")
                      .reverse()
                      .join("-")
                    return (
                      <tr key={Index}>
                        <td>{Index + 1}</td>
                        <td>{record.empId}</td>
                        <td>
                          <input
                            name="name"
                            className="data eName"
                            onChange={onValueChange}
                            type="text"
                            defaultValue={record.name}
                            readOnly
                          />
                        </td>
                        <td>
                          <input
                            name="joiningDate"
                            style={{ appearance: "none" }}
                            className="data"
                            onChange={onValueChange}
                            type="date"
                            defaultValue={record.joiningDate}
                            readOnly
                          />
                        </td>
                        <td>
                          <select
                            style={{ appearance: "none"}}
                            disabled={true}
                            name="probationPeriod"
                            className="data select"
                            id="select"
                            onChange={onValueChange}
                            defaultValue={record.probationPeriod}
                            readOnly
                          >
                            {" "}
                            <option value="3">3 Months</option>
                            <option value="6">6 Months</option>
                            <option value="9">9 Months</option>
                          </select>
                        </td>
                        <td>{confirmationDate}</td>
                        <td>
                          <button
                            onClick={e => onEditBtnClick(e, record._id)}
                            className="editBtn"
                          >
                            Edit
                          </button>
                          <button
                            className=" save-btn editBtn"
                            style={{ display: "none" }}
                            onClick={e =>
                              onSaveBtnClick(
                                e,
                                record._id,
                                record.probationPeriod
                              )
                            }
                          >
                            Save
                          </button>
                          <ToastContainer />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {/* table end */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default App
