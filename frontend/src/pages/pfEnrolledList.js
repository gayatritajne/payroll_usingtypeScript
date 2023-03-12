import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import { getAllPfEmpData } from "../services/apiFunction"
import axios from "axios"
import Modal from "react-modal"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function PfEnrolledList() {
  const [records, setRecords] = useState([])
  const [id, setId] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [pfEmpToEdit, setPfEmpToEdit] = useState({
    name: "",
    empId: "",
    empDob: "",
    aadharNumber: "",
    panNumber: "",
    bankName: "",
    ifscCode: "",
    accountNumber: "",
    address: "",
    dateofRegistration: "",
    pfUanNumber: "",
    pfStatus: "",
  })

  const getAllPfEmpList = async () => {
    let activeRecords = []
    let data = await getAllPfEmpData()
    setRecords(data.empInfo)
    // data = data.empInfo
    // data.map(d => {
    //   if (d.pfStatus === "Active") {
    //     activeRecords.push(d)
    //   }
    // })
    // setRecords(activeRecords)
  }

  useEffect(() => {
    getAllPfEmpList()
  }, [])

  // to target particular record
  const onValueChange = e => {
    setPfEmpToEdit({ ...pfEmpToEdit, [e.target.name]: e.target.value })
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
    const currentEmp = await axios.get(`/api/v2/single-pfemp/${empId}`)
    console.log(currentEmp.data)
    setPfEmpToEdit(currentEmp.data)
    // document.getElementById("select").disabled = false
  }

  console.log(pfEmpToEdit)
  // on save button click
  const onSaveBtnClick = async (e, empId, name) => {
    console.log(name)
    if (
      pfEmpToEdit.name === "" ||
      pfEmpToEdit.bankName === "" ||
      pfEmpToEdit.ifscCode === "" ||
      pfEmpToEdit.accountNumber === ""
    ) {
      toast.error("Field should not be empty.", {
        position: toast.POSITION.TOP_CENTER,
      })
      if (pfEmpToEdit.name === "") {
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".eName").forEach(input => {
          input.style.border = "2px solid red"
        })
      }

      if (pfEmpToEdit.bankName === "") {
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".eBankName").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
      if (pfEmpToEdit.ifscCode === "") {
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".eIfsc").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
      if (pfEmpToEdit.accountNumber === "") {
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".eAccount").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
    } else {
      await axios.put(`/api/v2/edit-pfemp/${empId}`, pfEmpToEdit)
      e.target.style.display = "none"
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".data").forEach(input => {
        input.style = "appearance: none"
        input.style.border = "none"
      })
      console.log(pfEmpToEdit)
      // window.alert("Information of " + name + " is updated successfully.")
      toast.success("Information of " + name + " is updated successfully.", {
        position: toast.POSITION.TOP_CENTER,
      })
      //document.getElementById("select").disabled = true
      getAllPfEmpList()
    }
  }
  // const onButtonClick = (address, id) => {
  //   console.log(id)
  //   setId(id)
  //   setModalIsOpen(true)
  //   setTimeout(() => {
  //     document.getElementById(
  //       "common-modal"
  //     ).innerHTML = ``
  //     document.getElementById("heading").innerText = "Address"
  //   }, 200)
  // }

  // const onAddressEditBtnClick = async (e, id) => {
  //   console.log(id)
  //   document.getElementById("addressInput").removeAttribute("readOnly")
  //   document.getElementById("save-btn").style.display = ""
  //   const currentEmp = await axios.get(`/api/v2/single-pfemp/${id}`)
  //   console.log(currentEmp.data)
  //   setPfEmpToEdit(currentEmp.data)
  // }
  // const onAddressSaveBtnClick = async (e, empId) => {
  //   await axios.put(`/api/v2/edit-pfemp/${empId}`, pfEmpToEdit)
  //   document.getElementById("save-btn").style.display = "none"
  //   console.log(pfEmpToEdit)
  // }

  return (
    <Layout>
      <div className="container-fluid pfEnrolledListContainer">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/pfManagement">
              <i class="bi bi-arrow-left-circle-fill"></i>
            </Link>

            <h2 className="text-center mb-4">List of Active PF Employees</h2>
            <div className="empTable col-lg-12">
              <table className="table table-bordered css-serial">
                <thead>
                  <tr>
                    <th className="heading">Sr. No.</th>
                    <th className="heading">Name of Employee</th>
                    <th className="heading">
                      Date Of Birth (Mentioned on Aadhar card.)
                    </th>
                    <th className="heading">Employee Id</th>
                    <th className="heading">Aadhar Number</th>
                    <th className="heading">Pan Number</th>
                    <th className="heading">Bank Name</th>
                    <th className="heading">IFSC Code</th>
                    <th className="heading">Account number</th>
                    <th className="heading">Address</th>
                    <th className="heading">Date of registration</th>
                    <th className="heading">PF UAN Number</th>
                    <th className="heading">PF Status</th>
                    <th className="heading">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records &&
                    records.map((record, Index) => {
                      if (record.pfStatus === "Active") {
                        return (
                          <tr key={Index}>
                            <td></td>
                            <td>
                              <input
                                name="name"
                                className="data text eName"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.name}
                                readOnly
                              />
                            </td>
                            <td>{record.empDob}</td>
                            <td>{record.empId}</td>
                            <td>{record.aadharNumber}</td>
                            <td>{record.panNumber}</td>
                            <td>
                              <input
                                name="bankName"
                                className="data text eBankName"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.bankName}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="ifscCode"
                                className="data text eIfsc"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.ifscCode}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="accountNumber"
                                className="data text eAccount"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.accountNumber}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="address"
                                className="data text"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={record.address}
                                readOnly
                              />
                              {/* <button
                              className="hrModalBtn"
                              id="modal"
                              onClick={() => setModalIsOpen(true)}
                            >
                              See details{" "}
                            </button>{" "} */}
                            </td>
                            <td>{record.dateofRegistration}</td>
                            <td> {record.pfUanNumber}</td>
                            <td>
                              <select
                                style={{ appearance: "none" }}
                                name="pfStatus"
                                // disabled={true}
                                className="data select"
                                id="select"
                                defaultValue={record.pfStatus}
                                onChange={onValueChange}
                                readOnly
                              >
                                {" "}
                                <option value="Active">Active</option>
                                <option value="Exited">Exited</option>
                              </select>
                            </td>
                            <td>
                              <i
                                class="bi bi-pen-fill editIcon"
                                onClick={e => onEditBtnClick(e, record._id)}
                              ></i>
                              <i
                                class="bi bi-check-circle-fill save-btn editIcon"
                                style={{ display: "none" }}
                                onClick={e =>
                                  onSaveBtnClick(e, record._id, record.name)
                                }
                              ></i>
                              <ToastContainer />
                            </td>
                          </tr>
                        )
                      }
                    })}
                </tbody>
              </table>
            </div>
            {/* <Modal isOpen={modalIsOpen} className="addressModal">
              <h1 className=" text-center pt-4" id="heading">
                Address
              </h1>
              <div className="" id="common-modal">
                <table>
                  <thead></thead>
                  <tbody>
                    {records.map((record, Index) => {
                      if (record.pfStatus === "Active") {
                        return (
                          <tr key={Index}>
                            <td>
                              <input
                                name="address"
                                id="addressInput"
                                className="data"
                                onChange={onValueChange}
                                type="text"
                                Value={record.address}
                                readOnly
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={e =>
                                  onAddressEditBtnClick(e, record._id)
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-success  save-btn"
                                id="save-btn"
                                style={{ display: "none" }}
                                onClick={e =>
                                  onAddressSaveBtnClick(e, record._id)
                                }
                              >
                                save
                              </button>
                              <ToastContainer />
                            </td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </table>
              </div>
              <div className="modalBtnDiv">
                <button
                  className="btn btn-info"
                  onClick={() => setModalIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </Modal> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default PfEnrolledList
