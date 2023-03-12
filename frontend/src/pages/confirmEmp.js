import React, { useEffect } from "react"
import Layout from "../components/Layout"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { allUserData } from "../services/apiFunction"
import SideBar from "../components/OwnersSidebar"
import { Link } from "gatsby"

function App() {
  const [records, setRecords] = useState([])

  //To get All employee data
  const getAllEmployees = async () => {
    let confirmedRecords = []
    let data = await allUserData()
    // setRecords(data)
    confirmedRecords = data.filter(d => d.payrollData.empStatus === "Confirmed")
    // console.log(data)
    console.log(confirmedRecords)
    setRecords(confirmedRecords)
  }

  useEffect(() => {
    getAllEmployees()
    document.querySelectorAll("td,th").forEach(data => {
      data.classList.add("text-center")
    })
  }, [])

  //To dipslay the List of confirmed employee
  return (
      <Layout>
        <div className="OwnerContainer">
          <div className="row ownerRow">
            <div className="col-lg-3">
              <SideBar />
            </div>
            <div className="col-lg-9">
              <div className="row ownerColumn justify-content-center">
                <div className="margin col-lg-8 col-md-8 col-sm-9 wrapper">
                
                  <h2 className="text-center bulkText">
                    List of Confirmed Employees
                  </h2>
                  <div className="empTable">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th className="heading">Sr. No.</th>
                          <th className="heading">Name of Employee</th>
                          <th className="heading">Employee Id</th>
                          <th className="heading">Probation Period</th>
                          <th className="heading">Designation</th>
                          <th className="heading">Confirmed date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records &&
                          records.map((record, Index) => {
                            console.log("in map",record)
                            let confirmationdate =
                              record.payrollData.confirmationDate.split("-")
                            if (record.payrollData.empStatus === "Confirmed")
                              return (
                                <tr key={Index}>
                                  <td>{Index + 1}</td>
                                  <td>{record.payrollData.name}</td>
                                  <td>{record.payrollData.empId}</td>
                                  <td>{record.payrollData.probationPeriod} Months</td>
                                  <td>{record.payrollData.designation}</td>
                                  <td>
                                    {confirmationdate[2]
                                      ? confirmationdate[2].slice(0, 2) +
                                        "-" +
                                        confirmationdate[1] +
                                        "-" +
                                        confirmationdate[0]
                                      : ""}
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
