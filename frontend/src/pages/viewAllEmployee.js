import React, { useEffect } from "react"
import Layout from "../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { allUserData } from "../services/apiFunction"
import Modal from "react-modal"
import SideBar from "../components/SideBar"
import { Link } from "gatsby"

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [records, setRecords] = useState([])
  //Function to fetch data from database
  const getAllEmployees = async () => {
    let data = await allUserData()
    console.log(data)
    setRecords(data)
  }
  //Badic information modal data
  const onButtonClick = (
    email,
    dob,
    contNo,
    gender,
    joiningD,
    probationP,
    confDate
  ) => {
    setModalIsOpen(true)
    setTimeout(() => {
      document.getElementById(
        "common-modal"
      ).innerHTML = `<table class="profileTable table table-bordered table-striped table-sm"><thead className="thead">
      <tr>
        <th>Email Address</th>
        <th>Date of Birth</th>
        <th>Contact Number</th>
        <th>Gender</th>
        <th>Joining Date</th>
        <th>Probation Period</th>
        <th>Confirmation Date</th>
      </tr>
    </thead><tbody><tr>
    <td>${email}</td>
    <td>${
      dob.split("-")[2] + "-" + dob.split("-")[1] + "-" + dob.split("-")[0]
    }</td>
    <td>${contNo}</td>
    <td>${gender}</td>
    <td>${
      joiningD.split("-")[2] +
      "-" +
      joiningD.split("-")[1] +
      "-" +
      joiningD.split("-")[0]
    }</td>
    <td>${probationP}</td>
    <td>${
      confDate.split("-")[2].slice(0, 2) +
      "-" +
      confDate.split("-")[1] +
      "-" +
      confDate.split("-")[0]
    }</td>
  </tr></tbody></table>`
      document.getElementById("heading").innerText = "Basic Information"
    }, 200)
  }
  //Employee position modal
  const onButtonClick1 = (
    department,
    designation,
    location,
    role,
    workMode
  ) => {
    setModalIsOpen(true)
    setTimeout(() => {
      document.getElementById(
        "common-modal"
      ).innerHTML = ` <table class="profileTable table table-bordered table-striped table-sm"> 
      <thead class="thead">
      <tr>
        <th>Department</th>
        <th>Designation</th>
        <th>Location</th>
        <th>Role</th>
        <th>Work Mode</th>
      </tr>
    </thead>
     <tbody> <tr>
     <td>${department}</td>
     <td>${designation}</td>
     <td>${location}</td>
     <td>${role}</td>
     <td>${workMode}</td>
   </tr></tbody> </table>`
      document.getElementById("heading").innerText = "Employee Position"
    }, 200)
  }
  //Family information modal
  const onButtonClick2 = (
    fmember,
    status,
    Nspouse,
    relationship,
    sDOB,
    c1Name,
    c1Gender,
    c1DOB,
    c2Name,
    c2Gender,
    c2DOB,
    fName,
    fDOB,
    mName,
    mDOB
  ) => {
    setModalIsOpen(true)
    setTimeout(() => {
      document.getElementById(
        "common-modal"
      ).innerHTML = `  <table class="table table-bordered table-sm table-striped">
      <thead>
        <tr>
          <th class="text-center">Number of Family Members</th>
          <th class="text-center">Status</th>
          ${
            status === "married"
              ? `<th class="text-center">Spouse Details</th>
          <th class="c1-hide text-center">Child 1</th>
          <th class="c2-hide text-center">Child 2</th>`
              : ` <th class="text-center">Father Details</th>
          <th class="text-center">Mother Details</th>`
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${fmember}</td>
          <td>${status}</td>
        ${
          status === "married"
            ? `
          <td>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Relationship</th>
                  <th scope="col">DOB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${Nspouse}</td>
                  <td>${relationship}</td>
                  <td>${
                    sDOB &&
                    sDOB.split("-")[2] +
                      "-" +
                      sDOB.split("-")[1] +
                      "-" +
                      sDOB.split("-")[0]
                  }</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="c1-hide">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">DOB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${c1Name}</td>
                  <td>${c1Gender}</td>
                  <td>${
                    c1DOB &&
                    c1DOB.split("-")[2] +
                      "-" +
                      c1DOB.split("-")[1] +
                      "-" +
                      c1DOB.split("-")[0]
                  }</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="c2-hide">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">DOB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${c2Name}</td>
                  <td>${c2Gender}</td>
                  <td>${
                    c2DOB &&
                    c2DOB.split("-")[2] +
                      "-" +
                      c2DOB.split("-")[1] +
                      "-" +
                      c2DOB.split("-")[0]
                  }</td>
                </tr>
              </tbody>
            </table>
          </td>`
            : `<td>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">DOB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${fName}</td>
                  <td>${
                    fDOB &&
                    fDOB.split("-")[2] +
                      "-" +
                      fDOB.split("-")[1] +
                      "-" +
                      fDOB.split("-")[0]
                  }</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td>
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">DOB</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${mName}</td>
                  <td>${
                    mDOB &&
                    mDOB.split("-")[2] +
                      "-" +
                      mDOB.split("-")[1] +
                      "-" +
                      mDOB.split("-")[0]
                  }</td?
                </tr>
              </tbody>
            </table>
          </td>`
        }
        </tr>
      </tbody>
    </table>`
      document.getElementById("heading").innerText = "Family Information"
      // Conditions for hiding/showing children
      if (c1Name === "" || c1Name === undefined) {
        document.querySelectorAll(".c1-hide").forEach(i => {
          i.classList.add("d-none")
        })
      } else {
        document.querySelectorAll(".c1-hide").forEach(i => {
          i.classList.remove("d-none")
        })
      }
      if (c2Name === "" || c2Name === undefined) {
        document.querySelectorAll(".c2-hide").forEach(i => {
          i.classList.add("d-none")
        })
      } else {
        document.querySelectorAll(".c2-hide").forEach(i => {
          i.classList.remove("d-none")
        })
      }
    }, 200)
  }
  //Pan and Pf Uan details modal
  const onButtonClick3 = (pan, pf) => {
    setModalIsOpen(true)
    setTimeout(() => {
      document.getElementById(
        "common-modal"
      ).innerHTML = `<table class="profileTable table table-bordered table-striped table-sm">  <thead className="thead">
      <tr>
        <th>Pan Number</th>
        <th>PF UAN Number</th>
      </tr>
    </thead> <tbody><tr>
    <td>${pan}</td>
    <td>${pf}</td>
  </tr></tbody></table>`
      document.getElementById("heading").innerText = "PAN & PF information"
    }, 200)
  }
  //Payment details modal
  const onButtonClick4 = (
    paymentType,
    bankName,
    branchName,
    ifscCode,
    accountNumber
  ) => {
    setModalIsOpen(true)
    setTimeout(() => {
      document.getElementById("common-modal").innerHTML = `
      <table class="profileTable table table-bordered table-striped table-sm">  <thead className="thead"><tr>
      <th>Payment Type</th>
      <th>Bank Name</th>
      <th>Branch Name</th>
      <th>IFSC Code</th>
      <th>Account Number</th>
    </tr> </thead><tbody> <tr>
      <td>${paymentType}</td>
      <td>${bankName}</td>
      <td>${branchName}</td>
      <td>${ifscCode}</td>
      <td>${accountNumber}</td>
    </tr></tbody></table>`
      document.getElementById("heading").innerText = "Payment Information"
    }, 200)
  }

  useEffect(() => {
    getAllEmployees()
    document.querySelectorAll("td,th").forEach(data => {
      data.classList.add("text-center")
    })
  }, [])

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow justify-content-center ">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center">
              <div className="margin col-xl-11 col-lg-10 col-md-10 col-sm-6 wrapper">
                {/* <div className="col-lg-11"> */}
                <h2 className="text-center tableHeading">
                  View All Employee Details
                </h2>
                <h5 className="d-none">
                  Get information of all employee into excel sheet
                  <button type="button" className="exportBtn d-none">
                    Export to Excel
                  </button>
                </h5>
                {/* </div> */}
                <div className="AllEmpListTable">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="heading">Sr. No.</th>
                        <th className="heading">Name of Employee</th>
                        <th className="heading">Employee Id</th>
                        <th className="heading">Basic Information</th>
                        <th className="heading">Employee Position </th>
                        <th className="heading">Family Information </th>
                        <th className="heading"> PAN and Pf UAN </th>
                        <th className="heading">Payment Details </th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, Index) => {
                        return (
                          <tr key={Index}>
                            <td>{Index + 1}</td>
                            <td>{record.name}</td>
                            <td>{record.empId}</td>
                            <td>
                              <button
                                id="modalbtn1"
                                onClick={() =>
                                  onButtonClick(
                                    record.email,
                                    record.dob,
                                    record.contactNo,
                                    record.gender,
                                    record.joiningDate,
                                    record.probationPeriod,
                                    record.confirmationDate
                                  )
                                }
                              >
                                See Information{" "}
                              </button>
                            </td>
                            <td>
                              <button
                                id="modalbtn2"
                                onClick={() =>
                                  onButtonClick1(
                                    record.department,
                                    record.designation,
                                    record.location,
                                    record.role,
                                    record.workMode
                                  )
                                }
                              >
                                {" "}
                                See Information{" "}
                              </button>
                            </td>
                            <td>
                              <button
                                id="modalbtn3"
                                onClick={() =>
                                  onButtonClick2(
                                    record.numberOfMember,
                                    record.status,
                                    record.NameofSpouse,
                                    record.relationship,
                                    record.DOB,
                                    record.child1,
                                    record.child1Gender,
                                    record.DOB1,
                                    record.child2,
                                    record.child2Gender,
                                    record.DOB2,
                                    record.NameofFather,
                                    record.DOB3,
                                    record.NameofMother,
                                    record.DOB4
                                  )
                                }
                              >
                                See Information{" "}
                              </button>
                            </td>
                            <td>
                              <button
                                id="modalbtn4"
                                onClick={() =>
                                  onButtonClick3(record.pan, record.pf)
                                }
                              >
                                See Information{" "}
                              </button>
                            </td>
                            <td>
                              <button
                                id="modalbtn5"
                                onClick={() =>
                                  onButtonClick4(
                                    record.paymentType,
                                    record.bankName,
                                    record.bankBranch,
                                    record.ifscCode,
                                    record.accountNumber
                                  )
                                }
                              >
                                See Information{" "}
                              </button>
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
        {/* modal */}
        <Modal isOpen={modalIsOpen}>
          <h1 className="heading text-center pt-4" id="heading"></h1>
          <div style={{ overflowX: "scroll", width: "100%" }}>
            <div className="familyInformation" id="common-modal"></div>
          </div>
          <div>
            <button className="modalbtn" onClick={() => setModalIsOpen(false)}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
    // </div>
  )
}
export default App
