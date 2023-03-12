import React, { useEffect, useContext, useState } from "react"
import { Link } from "gatsby"
import { UserData } from "./Layout"

const SideBar = () => {
  const { user } = useContext(UserData)
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  useEffect(() => {
    let attr = document.querySelectorAll(".navbar-item a")
    console.log(attr)
    attr.forEach(item => {
      console.log(item)
      if (item.getAttribute("aria-current") === "page") {
        item.closest(".navbar-item").classList.add("tab")
      }
    })
    window.addEventListener("resize", checkWidth)
  }, [])

  const checkWidth = () => {
    let width = document.body.clientWidth
    if (width < 992) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }
  return (
    <div
      id="sidebar"
      className=" d-lg-block d-xl-block d-xxl-block superAdmin-sidebar min-vh-100"
      style={{ width: isOpen ? "60px" : "300px" }}
    >
      <div id="sidebar-wrapper" className="min-vh-100 margin">
        <ul className="list-unstyled components margin">
          <div className="toggleDiv">
            <p
              className="text-center fs-6"
              style={{ display: isOpen ? "none" : "block" }}
            >
              {user ? user.name : " "}{" "}
            </p>
            <img
              src="/humanSymbol.png"
              alt=""
              class="rounded-circle mt-2"
              height="50"
              onClick={toggle}
            />
          </div>

          <hr />
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/superAdminProfile">
                <i class="bi bi-person-lines-fill"></i>
              </Link>

              <Link
                to="/superAdminProfile"
                className="nav-link fw-bold"
                style={{ display: isOpen ? "none" : "block" }}
              >
                {" "}
                Super Admin's Profile
              </Link>
            </div>
          </li>
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/app/superadmin">
                <i class="bi bi-speedometer2"></i>
              </Link>
              <Link
                to="/app/superadmin"
                className="nav-link fw-bold"
                style={{ display: isOpen ? "none" : "block" }}
              >
                {" "}
                Super Admin's Dashbord
              </Link>
            </div>
          </li>
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/addEmployee">
                <i class="bi bi-person-plus-fill"></i>
              </Link>
              <Link
                to="/addEmployee"
                className="nav-link fw-bold"
                style={{ display: isOpen ? "none" : "block" }}
              >
                {" "}
                Add Employee to Payroll
              </Link>
            </div>
          </li>
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/viewAllEmployee">
                <i class="bi bi-card-list"></i>
              </Link>
              <Link
                to="/viewAllEmployee"
                className="nav-link fw-bold"
                style={{ display: isOpen ? "none" : "block" }}
              >
                View All Employees
              </Link>
            </div>
          </li>
          <li className="navbar-item">
            <div className="sidebarIcons">
              <Link to="/addBulkEmployee">
                <i class="bi bi-cloud-arrow-up-fill"></i>
              </Link>
              <Link
                to="/addBulkEmployee"
                className="nav-link fw-bold"
                style={{ display: isOpen ? "none" : "block" }}
              >
                Upload Bulk Employee
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default SideBar