import React, { useEffect } from "react"
import { Link } from "gatsby"

const Document = () => {
  useEffect(() => {
    let attr = document.querySelectorAll(".navbar-item a")
    attr.forEach(item => {
      if (item.getAttribute("aria-current") === "page") {
        item.closest(".navbar-item").classList.add("tab")
      }
    })
  }, [])
  return (
    <div
      id="sidebar"
      className="d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block superAdmin-sidebar min-vh-100">
      <div id="sidebar-wrapper" className="min-vh-100">
        <ul className="list-unstyled components">
          <li className="navbar-item">
            <Link to="/addEmployee" className="nav-link fw-bold">
              {" "}
              My Profile
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/app/superadmin" className="nav-link fw-bold">
              {" "}
              Add New Employee
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/viewAllEmployee" className="nav-link fw-bold">
              View All Employees
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/addBulkEmployee" className="nav-link fw-bold">
              Upload Bulk Employee
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Document
