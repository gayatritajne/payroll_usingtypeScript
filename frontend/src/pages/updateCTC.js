import React, { useEffect } from "react"
import Layout from "../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { allUserData, getAllCTC } from "../services/apiFunction"
import SideBar from "../components/OwnersSidebar"
import axios from "axios"
import { Link } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  // modal
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [records, setRecords] = useState([])
  const [allCtc, setAllCtc] = useState()

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
  const [empToEdit, setEmpToEdit] = useState({
    Name: "",
    Emp_Id: "",
    CTC: "",
  })

  useEffect(() => {
    getAllEmployees()
    document.querySelectorAll("td,th").forEach(data => {
      data.classList.add("text-center")
    })
  }, [])

  const onValueChange = e => {
    setEmpToEdit({ ...empToEdit, [e.target.name]: e.target.value })
  }

  const onEditBtnClick = async (e, empId) => {
    const tableRow = e.target.closest("tr")
    const rowData = tableRow.querySelectorAll(".data")

    tableRow.querySelectorAll(".data").forEach(input => {
      input.style.border = "1px solid black"
    })
    tableRow.querySelector(".save-btn").style.display = ""
    rowData.forEach(element => {
      element.removeAttribute("readOnly")
    })
    const currentEmp = await axios.get(`/api/v2/single-ctc/${empId}`)
    setEmpToEdit(currentEmp.data)
    console.log(currentEmp.data)
  }
  const onSaveBtnClick = async (e, empId, name) => {
    console.log(empId, empToEdit)
    if (empToEdit.CTC === "") {
      //alert("Field should not be empty.")
      toast.error("Field should not be empty.", {
        position: toast.POSITION.TOP_CENTER,
      })
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".CTC").forEach(input => {
        input.style.border = "2px solid red"
      })
    } else {
      await axios.put(`/api/v2/edit-ctc/${empId}`, empToEdit)
      e.target.style.display = "none"
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".data").forEach(input => {
        input.style.border = "none"
      })
      //window.alert("CTC of " + name + "is updated successfully.")
      toast.success("CTC is updated successfully.", {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row justify-content-end">
              <div className="margin col-lg-10 col-xl-11 col-md-10 wrapper">
                <h2 className="bulkText text-center mb-4">Update CTC </h2>
                <div className="empTable">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">CTC</th>
                        <th className="heading">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCtc &&
                        allCtc.map((record, Index) => {
                          return (
                            <tr key={Index}>
                              <td>{Index + 1}</td>
                              <td>{record.Name}</td>
                              <td>{record.Emp_Id}</td>
                              <td>
                                <input
                                  name="CTC"
                                  type="text"
                                  className="data inputFont CTC"
                                  onChange={onValueChange}
                                  defaultValue={record.CTC}
                                  readOnly
                                />
                              </td>
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
                                    onSaveBtnClick(e, record._id, record.name)
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
