import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

export default function pf() {
  return (
    <Layout>
      <div className="container pfManagementContainer">
        <div className="row justify-content-center">
          <Link to="/app/hrdashboard">
            {/* <img src="/arrow.png" alt="" className="arrowImg" /> */}
            <i class="bi bi-arrow-left-circle-fill"></i>
          </Link>
          <h1>PF Management</h1>
          <div class="col-lg-3 col-sm-4 card  p-3 m-3 pfcards">
            <h3 className="text-center">List of Active PF Employee</h3>
            <Link to="/pfEnrolledList" className=" mx-auto text-center">
              <img
                style={{ width: "30%" }}
                class="mx-auto"
                src="/pfEmployee.png"
                alt="Card image"
              />
            </Link>
          </div>
          <div className=" col-lg-3 col-sm-4 card p-3 m-3 pfcards">
            <h3 className="text-center">New PF Enrollment</h3>
            <Link to="/newPfEnrollment" className=" mx-auto text-center">
              <img
                class="mx-auto"
                src="/addPf.png"
                alt="Card image"
                style={{ width: "35%" }}
              />
            </Link>
          </div>
          <div class="col-lg-3 col-sm-4 card  p-3 m-3 pfcards">
            <h3 className="text-center">List of Exited PF Employee</h3>
            <Link to="/pfExitedEmpList" className=" mx-auto text-center">
              <img
                style={{ width: "30%" }}
                class="mx-auto"
                src="/exit.png"
                alt="Card image"
              />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
