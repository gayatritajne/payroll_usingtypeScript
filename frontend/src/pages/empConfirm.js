import React, { useEffect } from "react"
import Layout from "../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import axios from "axios"
import { allUserData, editEmpStatus } from "../services/apiFunction"
import SideBar from "../components/OwnersSidebar"
import { Link } from "gatsby"
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
    temppassword: "",
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
    empStatus: "",
  })

  //To get All Employee
  const getAllEmployees = async () => {
    let pendingRecords = []
    let data = await allUserData()
    setRecords(data)
    data.map(d => {
      if (d.empStatus === "Pending") {
        pendingRecords.push(d)
      }
    })
    setRecords(pendingRecords)
  }

  useEffect(() => {
    getAllEmployees()
    document.querySelectorAll("td,th").forEach(data => {
      data.classList.add("text-center")
    })
  }, [])

  //To edit probation period
  const onEditClick = async (e, empId, selectCount) => {
    //document.getElementById("select").disabled = false
    if (selectCount < 2) {
      const tableRow = e.target.closest("tr")
      const rowData = tableRow.querySelectorAll(".data")
      tableRow.querySelectorAll(".data").forEach(input => {
        input.style.border = "1px solid black"
        input.style = "appearance: block"
      })
      tableRow.querySelector(".saveConfirmDate").style.display = ""
      const currentEmp = await axios.get(`/api/v2/single-emp/${empId}`)
      setEmpToEdit(currentEmp.data)
      rowData.forEach(element => {
        element.removeAttribute("readOnly")
      })
    } else {
      //window.alert("Sorry!! Can not edit")
      toast.error("Sorry!! Can not edit", {
        position: toast.POSITION.TOP_CENTER
    });
    }
    // getAllEmployees()
  }

  const onSaveClick = async (
    e,
    empId,
    count,
    joiningDate,
    probationPeriod,
    name
  ) => {
    //document.getElementById("select").disabled = true
    await axios.put(`/api/v2/edit-emp/${empId}`, empToEdit)
    e.target.style.display = "none"
    const tableRow = e.target.closest("tr")
    tableRow.querySelectorAll(".data").forEach(input => {
      input.style.border = "none"
      input.style = "appearance: none"
    })
    //window.alert("Probation period of " + name + " is updated successfully")
    toast.success("Probation period of " + name + " is updated successfully", {
      position: toast.POSITION.TOP_CENTER
  });
    if (count === 0) {
      editEmpStatus(empId, { selectCount: 1 })
    } else {
      editEmpStatus(empId, { selectCount: 2 })
    }

    if (probationPeriod === "3") {
      let confirmDate = new Date(joiningDate)
      var Cdate = confirmDate.setMonth(confirmDate.getMonth() + 3)
      let confirmedDate = new Date(+new Date(Cdate) + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
      empToEdit.confirmationDate = confirmedDate

      editEmpStatus(empId, { confirmationDate: confirmedDate })
    } else if (probationPeriod === "6") {
      let confirmDate = new Date(joiningDate)
      var Cdate = confirmDate.setMonth(confirmDate.getMonth() + 6)
      let confirmedDate = new Date(+new Date(Cdate) + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
      empToEdit.confirmationDate = confirmedDate

      editEmpStatus(empId, { confirmationDate: confirmedDate })
    } else if (probationPeriod === "9") {
      let confirmDate = new Date(joiningDate)
      var Cdate = confirmDate.setMonth(confirmDate.getMonth() + 9)
      let confirmedDate = new Date(+new Date(Cdate) + 5.5 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
      empToEdit.confirmationDate = confirmedDate

      editEmpStatus(empId, { confirmationDate: confirmedDate })
    }
    getAllEmployees()
  }

  const confirmBtnClick = async (id, name) => {
    editEmpStatus(id, { empStatus: "Confirmed" })
    getAllEmployees()
    // window.alert(name + " confirmed successfully")
    toast.success(name + " confirmed successfully", {
      position: toast.POSITION.TOP_CENTER
  });
    getAllEmployees()
  }

  const notification = async id => {
    document.getElementById("notification").style.display = "block"
    //notificationMsg(id, { message: "Please confirm the employee today" })
  }

  Array.from({ length: 1000 }, (_, i) => i + 1)

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center">
              <div className="margin col-lg-11 col-md-9 col-sm-12 wrapper">
                <h2 className="text-center bulkText">
                  List of Employees to be Confirmed
                </h2>
                <h6 className="text-center mb-4">
                  <b>Note :</b> You can edit the probation period twice only.
                  Here Count column shows number of attempts used to edit the
                  probation period.
                </h6>
                <div className="empTable">
                  <table className="table-bordered mx-auto">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Count</th>
                        <th className="heading">Probation Period</th>
                        <th className="heading">Designation</th>
                        <th className="heading">Joining date</th>
                        <th className="heading">Confirmation date</th>
                        <th className="heading">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, Index) => {
                        let joiningdate = record.joiningDate.split("-")
                        let todaysDate = new Date().toISOString().slice(0, 10)
                        const confirmationDate = record.confirmationDate
                          .split("-")
                          .reverse()
                          .join("-")
                        if (
                          confirmationDate === todaysDate &&
                          record.empStatus === "Pending"
                        ) {
                          notification(record.empId)
                        } else {
                        }
                        if (record.empStatus === "Pending")
                          return (
                            <tr key={Index}>
                              <td>{Index + 1}</td>
                              <td>{record.name}</td>
                              <td>{record.empId}</td>
                              <td>{record.selectCount}</td>
                              <td>
                                <select
                                  style={{ appearance: "none" }}
                                  name="probationPeriod"
                                  className="data select"
                                  id="select"
                                  onChange={e => {
                                    setEmpToEdit({
                                      ...empToEdit,
                                      [e.target.name]: e.target.value,
                                    })
                                    record.probationPeriod = e.target.value
                                  }}
                                  //disabled={true}
                                  defaultValue={record.probationPeriod}
                                  readOnly
                                >
                                  {" "}
                                  <option value="3">3 Months</option>
                                  <option value="6">6 Months</option>
                                  <option value="9">9 Months</option>
                                </select>
                                <img
                                  src="/edit.png"
                                  alt="ViewImg"
                                  className={`editConfirmDate ${
                                    record.selectCount === 2 ? "d-none" : ""
                                  }`}
                                  id="editBtn"
                                  onClick={e =>
                                    onEditClick(
                                      e,
                                      record._id,
                                      record.selectCount
                                    )
                                  }
                                />
                                <img
                                  src="/save.png"
                                  alt="ViewImg"
                                  className="saveConfirmDate editConfirmDate"
                                  style={{ display: "none" }}
                                  onClick={e =>
                                    onSaveClick(
                                      e,
                                      record._id,
                                      record.selectCount,
                                      record.joiningDate,
                                      record.probationPeriod,
                                      record.name
                                    )
                                  }
                                />
                              </td>
                              <td>{record.designation}</td>
                              <td>
                                {joiningdate[2] +
                                  "-" +
                                  joiningdate[1] +
                                  "-" +
                                  joiningdate[0]}
                              </td>
                              <td>{confirmationDate}</td>
                              <td>
                                {" "}
                                <button
                                  className="btn btn-success"
                                  id="btn"
                                  onClick={e =>
                                    confirmBtnClick(
                                      record._id,
                                      record.name,
                                      record.empStatus
                                    )
                                  }
                                  disabled={
                                    new Date(record.confirmationDate).setHours(
                                      0,
                                      0,
                                      0,
                                      0
                                    ) > new Date().setHours(0, 0, 0, 0)
                                  }
                                >
                                  Confirm
                                </button>
                                <ToastContainer />
                              </td>
                            </tr>
                          )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default App
