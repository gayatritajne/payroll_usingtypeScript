import React, { useContext, useEffect, useState } from "react"
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
    <>
      <div
        id="sidebar"
        className="d-lg-block d-xl-block d-xxl-block ownerSidebar shadow-lg p-3 "
        style={{ width: isOpen ? "70px" : "350px" }}
      >
        <div id="sidebar-wrapper" className="min-vh-100 ownerSidebar-wrapper">
          <ul className="list-unstyled components" id="myTab">
            <div className="toggleOwnerDiv">
              <p className="ownerText"
                style={{ display: isOpen ? "none" : "block" }}>
                {user ? user.name : " "}{" "}
              </p>
              <img
                src="/humanSymbol.png"
                alt=""
                class="rounded-circle"
                height="50"
                onClick={toggle}
              />
            </div>
            <hr />
            <div className="sideScrollbar" style={{ width: isOpen ? "50px" : "300px" }}>
              <div className="split1">
                <div className="sidebarContent">
                  <li className="navbar-item ">
                    <div className="ownerSidebarIcons">
                      <div className="image">
                        <Link to="/app/owner">
                        {/* <i><img src="/uploadCTC.png" alt="UploadImg" className="icon" style={{ width: "40px" }} /></i> */}
                        <i class="bi bi-speedometer2 oSidebarIcon"></i>

                        </Link>
                      </div>
                      <div className="logoText">
                        <Link
                          to="/app/owner"
                          className="nav-link fw-bold"
                          style={{ display: isOpen ? "none" : "block" }}
                          data-toggle="tab"
                        >
                          {" "}
                          My Dashboard
                        </Link>
                      </div>
                    </div>
                  </li>
                </div>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/addCTC">
                        <i><img src="/uploadCTC.png" alt="UploadImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/addCTC"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        Upload CTC
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/updateCTC">
                      <i><img src="/updatedCTC.png" alt="UploadImg" className="icon oSidebarIcon" /></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/updateCTC"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        Update CTC
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/uploadPayrollDoc">
                      <i><img src="/viewDocument.png" alt="UploadImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/uploadPayrollDoc"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        Upload & View Payroll Documents
                      </Link>
                    </div>
                  </div>
                </li>
              </div>
              <hr />
              <div className="split2">
                <li className="navbar-item ">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/listOfEmp">
                      <i><img src="/empList.png" alt="AddEmpImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/listOfEmp"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        List of all Employees
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/confirmEmp">
                      <i><img src="/search.png" alt="UploadImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/confirmEmp"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        List of confirmed Employees
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item ">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/empConfirm">
                      <i><img src="/empConfirm.png" alt="UploadImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/empConfirm"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        Employee Confirmation
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item ">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/empRecordUpdate">
                      <i><img src="/growth.png" alt="UploadImg" className="icon oSidebarIcon" /></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/empRecordUpdate"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        {" "}
                        Employee Record Update
                      </Link>
                    </div>
                  </div>
                </li>
              </div>
              <hr />
              <div className="split3">
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/candiSelection">
                      <i><img src="/empRecruit.png" alt="UploadImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/candiSelection"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        Candidate Selection
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/viewSelectedCandi">
                      <i><img src="/select.png" alt="UploadImg" className="icon oSidebarIcon" /></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/viewSelectedCandi"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        Selected Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/viewHoldCandi">
                      <i><img src="/hold.png" alt="UploadImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/viewHoldCandi"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        On Hold Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/viewRejectedCandi">
                      <i><img src="/rejected.png" alt="UploadImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/viewRejectedCandi"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        Rejected Candidates
                      </Link>
                    </div>
                  </div>
                </li>
                <li className="navbar-item">
                  <div className="ownerSidebarIcons">
                    <div className="image">
                      <Link to="/viewOnboardCandi">
                      <i><img src="/onboarding.png" alt="UploadImg" className="icon oSidebarIcon"/></i>
                      </Link>
                    </div>
                    <div className="logoText">
                      <Link
                        to="/viewOnboardCandi"
                        className="nav-link fw-bold"
                        style={{ display: isOpen ? "none" : "block" }}
                        data-toggle="tab"
                      >
                        Onboard Candidates
                      </Link>
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  )
}
export default SideBar
