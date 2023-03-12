import React, { useEffect } from "react"
import Layout from "../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import axios from "axios"
import { Link } from "gatsby"
import { getOwnerData } from "../services/apiFunction"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [candirecords, setCandirecords] = useState([])
  const [rejectCandi, setRejectCandi] = useState([])
  const [candiToEdit, setCandiToEdit] = useState({
    candidateId: "",
    candidateName: "",
    eduQual: "",
    primarySkill: "",
    secondarySkill: "",
    noticePeriod: "",
    currentCTC: "",
    expectedCTC: "",
    candiStatus: "",
    rejectedMessage: "",
  })
  // To get all candidate from db
  const getAllCandidates = async () => {
    let data = await getOwnerData()
    console.log(data)
    if (data.success === true) {
      setCandirecords(data.candiInfo)
    }
    data.candiInfo.map(record => {
      if (record.candiStatus === "Rejected") {
        rejectCandi.push(record)
      }
    })
    setCandirecords(rejectCandi)
  }
  console.log(candirecords)
  // calling function
  useEffect(() => {
    getAllCandidates()
  }, [])

  const onValueChange = e => {
    setCandiToEdit({ ...candiToEdit, [e.target.name]: e.target.value })
  }
  //On edit button click
  const onEditBtnClick = async (e, candiId) => {
    const tableRow = e.target.closest("tr")
    const rowData = tableRow.querySelectorAll(".data")
    tableRow.querySelectorAll(".data").forEach(input => {
      input.style.border = "1px solid black"
    })
    tableRow.querySelector(".save-btn").style.display = ""
    rowData.forEach(element => {
      element.removeAttribute("readOnly")
    })
    const currentCandi = await axios.get(`/api/v2/single-candi/${candiId}`)
    setCandiToEdit(currentCandi.data)
  }
  //On save button click
  const onSaveBtnClick = async (e, candiId, name) => {
    console.log(candiId, candiToEdit)
    if (
      candiToEdit.candidateName === "" ||
      candiToEdit.eduQual === "" ||
      candiToEdit.primarySkill === "" ||
      candiToEdit.secondarySkill === "" ||
      candiToEdit.noticePeriod === "" ||
      candiToEdit.currentCTC === "" ||
      candiToEdit.expectedCTC === ""
    ) {
      //alert("Field should not be empty.")
      toast.error("Field should not be empty.", {
        position: toast.POSITION.TOP_CENTER,
      })
      if(candiToEdit.candidateName === ""){
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".name").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
      if(candiToEdit.eduQual === ""){
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".eduQual").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
      if(candiToEdit.primarySkill === ""){
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".primarySkill").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
      if(candiToEdit.secondarySkill === ""){
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".secondarySkill").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
      if(candiToEdit.noticePeriod === ""){
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".noticePeriod").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
      if(candiToEdit.currentCTC === ""){
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".currectCTC").forEach(input => {
          input.style.border = "2px solid red"
        })
      }
      if(candiToEdit.expectedCTC === ""){
        const tableRow = e.target.closest("tr")
        tableRow.querySelectorAll(".expectedCTC").forEach(input => {
          input.style.border = "2px solid red"
        })
      }

    } else {
      await axios.put(`/api/v2/edit-rejectcandi/${candiId}`, candiToEdit)
      e.target.style.display = "none"
      const tableRow = e.target.closest("tr")
      tableRow.querySelectorAll(".data").forEach(input => {
        input.style.border = "none"
      })
      toast.success("Information of " + name + " is updated successfully.", {
        position: toast.POSITION.TOP_CENTER
    });
    }
  }
  return (
    <Layout>
      <div className="container-fluid HrEmployeeContainer margin">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/app/hrdashboard">
              {/* <img
                src="/arrow.png"
                alt=""
                className="arrowImg"
                // style={{ width: "3%" }}
              /> */}
               <i class="bi bi-arrow-left-circle-fill"></i>
            </Link>
            <div className="hrTableHeading">
              <h1 className="animate-charcter">
                View and Edit Rejected Candidates
              </h1>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="empTable">
              {/* table  */}
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th className="heading">Sr. No.</th>
                    <th className="heading">Candidate ID</th>
                    <th className="heading">Candidate Name</th>
                    <th className="heading">Educational qualification</th>
                    <th className="heading">Primary Skills</th>
                    <th className="heading">Secondary Skills</th>
                    <th className="heading">Notice Period</th>
                    <th className="heading">Current CTC</th>
                    <th className="heading">Expected CTC</th>
                    <th className="heading">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candirecords &&
                    candirecords.map((candirecord, Index) => {
                      if (candirecord.candiStatus == "Rejected") {
                        return (
                          <tr key={Index}>
                            <td>{Index + 1}</td>
                            <td>{candirecord.candidateId}</td>
                            <td>
                              <input
                                name="candidateName"
                                className="data name"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.candidateName}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="eduQual"
                                className="data text eduQual"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.eduQual}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="primarySkill"
                                className="data primarySkill"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.primarySkill}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="secondarySkill"
                                className="data secondarySkill"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.secondarySkill}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="noticePeriod"
                                className="data text noticePeriod"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.noticePeriod}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="currentCTC"
                                className="data text currectCTC"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.currentCTC}
                                readOnly
                              />
                            </td>
                            <td>
                              <input
                                name="expectedCTC"
                                className="data text expectedCTC"
                                onChange={onValueChange}
                                type="text"
                                defaultValue={candirecord.expectedCTC}
                                readOnly
                              />
                            </td>
                            <td>
                              {/* <button
                                onClick={e =>
                                  onEditBtnClick(e, candirecord.candidateId)
                                }
                                className="editBtn edit"
                              >
                                Edit
                              </button> */}
                              <i
                                class="bi bi-pen-fill editIcon"
                                onClick={e =>
                                  onEditBtnClick(e, candirecord.candidateId)
                                }
                              ></i>
                              {/* <button
                                className=" save-btn editBtn edit"
                                style={{ display: "none" }}
                                onClick={e =>
                                  onSaveBtnClick(e, candirecord.candidateId)
                                }
                              >
                                Save
                              </button> */}
                              <i
                                class="bi bi-check-circle-fill save-btn editIcon"
                                style={{ display: "none" }}
                                onClick={e =>
                                  onSaveBtnClick(e, candirecord.candidateId, candirecord.candidateName)
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
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default App
