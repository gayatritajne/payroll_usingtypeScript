import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import { getAllPfEmpData } from "../services/apiFunction"

function PfExitedEmpList() {
  const [records, setRecords] = useState([])

  const getAllPfEmpList = async () => {
    let data = await getAllPfEmpData()
    setRecords(data.empInfo)
    console.log(data)
  }
  console.log(records)
  useEffect(() => {
    getAllPfEmpList()
  }, [])
  return (
    <Layout>
      <div className="container pfEnrolledListContainer">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <Link to="/pfManagement">
              {/* <img src="/arrow.png" alt="" className="arrowImg" /> */}
              <i class="bi bi-arrow-left-circle-fill"></i>
            </Link>
            <h2 className="text-center mb-4">List of Exited PF Employees </h2>

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
                  </tr>
                </thead>
                <tbody>
                {records.map((record, Index) => {
                   if (record.pfStatus === "Exited") {
                    return (
                      <tr key={Index}>
                        <td></td>
                        <td>{record.name}</td>
                        <td>{record.empDob}</td>
                        <td>{record.empId}</td>
                        <td>{record.aadharNumber}</td>
                        <td>{record.panNumber}</td>
                        <td>{record.bankName}</td>
                        <td>{record.ifscCode}</td>
                        <td>{record.accountNumber}</td>
                        <td>{record.address}</td>
                        <td>{record.dateofRegistration}</td>
                        <td>{record.pfUanNumber}</td>
                        
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
export default PfExitedEmpList
