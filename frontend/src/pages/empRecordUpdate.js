import React, { useEffect } from "react"
import Layout from "../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import axios from "axios"
import { allUserData, getAllCTC } from "../services/apiFunction"
import SideBar from "../components/OwnersSidebar"
import { Link } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [records, setRecords] = useState([])
  const [allCtc, setAllCtc] = useState()
  const [ctcToEdit, setCtcToEdit] = useState({
    Name: "",
    Emp_Id: "",
    CTC: "",
  })
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
  })

  const getAllEmployees = async () => {
    let data = await allUserData()
    let CTC = await getAllCTC()
    setRecords(data)
    if (CTC.success === true) {
      setAllCtc(CTC.allCtc)
    } else {
      window.alert(CTC.error)
    }
  }

  useEffect(() => {
    getAllEmployees()
  }, [])

  const onValueChange = e => {
    setEmpToEdit({ ...empToEdit, [e.target.name]: e.target.value })
  }

  //To edit designation and CTC columns
  const onEditClick = async (e, empId) => {
    const tableRow = e.target.closest("tr")
    const rowData = tableRow.querySelectorAll(".data")
    tableRow.querySelectorAll(".data").forEach(input => {
      input.style.border = "1px solid black"
    })
    tableRow.querySelector(".save-btn").style.display = ""
    allCtc.forEach(async ctc => {
      if (ctc.empId === empId) {
        const currentCtcEmp = await axios.get(`/api/v2/single-ctc/${ctc.empId}`)
        setCtcToEdit(currentCtcEmp.data)
      }
    })
    const currentEmp = await axios.get(`/api/v2/single-emp/${empId}`)
    setEmpToEdit(currentEmp.data)
    rowData.forEach(element => {
      element.removeAttribute("readOnly")
    })
  }

  //To save updated designation and CTC
  const onSaveClick = async (e, empId, name) => {
    const { empId: Emp_Id, name: Name, CTC } = empToEdit
    if (empToEdit.CTC === "" || empToEdit.designation === "") {
      //alert("Field should not be empty.")
      toast.error("Field should not be empty", {
        position: toast.POSITION.TOP_CENTER
    });
    if(empToEdit.CTC === ""){
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".CTC").forEach(input => {
        input.style.border = "2px solid red"
      })
    }
    if(empToEdit.designation === ""){
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".designation").forEach(input => {
        input.style.border = "2px solid red"
      })
    }
    } else {
      await axios.put(`/api/v2/edit-emp/${empId}`, empToEdit)
      await axios.put(`/api/v2/edit-ctc/${empId}`, { Emp_Id, Name, CTC })
      e.target.style.display = "none"
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".data").forEach(input => {
        input.style.border = "none"
      })
      //window.alert("Record of " + name + " is updated successfully")
      toast.success("Record of " + name + " is updated successfully", {
        position: toast.POSITION.TOP_CENTER
    });
    }
  }

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-end">
              <div className="margin col-lg-11 col-md-9 col-sm-10 wrapper">
                <h2 className="text-center bulkText">Employee Record Update</h2>
                <div className="empTable">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Designation</th>
                        <th className="heading">CTC</th>
                        <th className="heading">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, Index) => {
                        return (
                          <tr key={Index}>
                            <td>{Index + 1}</td>
                            <td>{record.empId}</td>
                            <td>{record.name}</td>
                            <td>
                              <input
                                name="designation"
                                className="data inputFont designation"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.designation}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="CTC"
                                type="text"
                                className="data inputFont CTC"
                                onChange={onValueChange}
                                defaultValue={
                                  allCtc &&
                                  allCtc.filter(
                                    ctc => ctc.Emp_Id === record.empId
                                  ).length > 0
                                    ? allCtc.filter(
                                        ctc => ctc.Emp_Id === record.empId
                                      )[0].CTC
                                    : "CTC not found"
                                }
                                readOnly
                              />
                            </td>
                            <td>
                              <button
                                className="editBtn"
                                onClick={e => onEditClick(e, record._id)}
                              >
                                Edit{" "}
                              </button>
                              <button
                                className=" save-btn editBtn"
                                style={{ display: "none" }}
                                onClick={e =>
                                  onSaveClick(e, record._id, record.name)
                                }
                              >
                                Save{" "}
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
