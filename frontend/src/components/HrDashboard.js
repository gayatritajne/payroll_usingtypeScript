import React from "react"
import { Link } from "gatsby"
import "bootstrap/dist/css/bootstrap.min.css"

const HrDashboard = () => {
  return (
    <>
      {/* <section className="mt-5" style={{ minHeight: "65vh" }}> */}
      <div className="container hrDashboard">
        <h2 className="text-center hrDashboardH2">Hr Admin Dashboard</h2>
        <div className="row justify-content-center mt-5" id="access">
          <div class="col-lg-2 card  p-3 m-3 hrDashboardDiv">
            <h3 className="text-center">View and Edit Employees List</h3>
            <Link to="/employee" className=" mx-auto text-center">
              <img class="w-50 mx-auto" src="/view&edit.png" alt="Card image" />
            </Link>
          </div>
          <div className=" col-lg-2 card p-3 m-3 hrDashboardDiv">
            <h3 className="text-center">View & Edit Rejected candidate List</h3>
            <Link to="/editRejectCandi" className=" mx-auto text-center pt-0">
              <img
                class="w-50 mx-auto"
                src="/edit&reject.png"
                alt="Card image"
              />
            </Link>
          </div>
          <div className=" col-lg-2 card p-3 m-3 hrDashboardDiv">
            <h3 className="text-center">Upload Candidates List</h3>
            <Link to="/shortlistedCandidate" className="mx-auto text-center">
              <img class="w-50 mx-auto" src="/uploadCsv.png" alt="Card image" />{" "}
            </Link>
          </div>
          <div className=" col-lg-2 card p-3 m-3 hrDashboardDiv">
            <h3 className="text-center">PF management</h3>
            <Link to="/pfManagement" className="mx-auto text-center">
              <img class="w-50 mx-auto" src="/pf.jpg" alt="Card image" />{" "}
            </Link>
          </div>
        </div>
      </div>
      {/* </section> */}
    </>
  )
}
export default HrDashboard
