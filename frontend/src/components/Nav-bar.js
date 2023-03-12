import React, { useState, useContext, useEffect } from "react"
import { navigate, Link } from "gatsby"
import { logoutUser } from "../services/apiFunction"
import { UserData } from "../components/Layout"
import { Button } from "react-bootstrap"
import "bootstrap/dist/js/bootstrap.min.js"

const allRoleLinks = {
  owner: [
    { href: "/", text: "Home |" },
    { href: "/account", text: "Accounting |" },
    { href: "/payroll", text: "Payroll |" },
    { href: "/ecommerce", text: "Ecommerce |" },
    { href: "/projects", text: "Projects |" },
    { href: "/marketing", text: "Marketing & New Leads |" },
    { href: "/myprofile", text: "My Profile |" },
  ],
  superAdmin: [
    { href: "/", text: "Home |" },
    { href: "/account", text: "Accounting |" },
    { href: "/superAdminPayroll", text: "Payroll |" },
    { href: "/ecommerce", text: "Ecommerce |" },
    { href: "/projects", text: "Projects |" },
    { href: "/marketing", text: "Marketing & New Leads |" },
    { href: "/superAdminProfile", text: "My Profile |" },
  ],
  hrAdmin: [
    { href: "/", text: "Home |" },
    { href: "/hrPayroll", text: "Payroll |" },
    { href: "/projects", text: "Projects |" },
    { href: "/attendance", text: "Attendance system |" },
    { href: "/hrProfile", text: "My Profile |" },
  ],
  accountEmployee: [
    { href: "/", text: "Home |" },
    { href: "/account", text: "Accounting |" },
    { href: "/app/profile1", text: "My Profile |" },
  ],
  technicalEmployee: [
    { href: "/", text: "Home |" },
    { href: "/projects", text: "Projects |" },
    { href: "/app/profile1", text: "My Profile |" },
  ],
  marketingEmployee: [
    { href: "/", text: "Home |" },
    { href: "/marketing", text: "Marketing & New Leads |" },
    { href: "/app/profile1", text: "My Profile |" },
  ],
}

const allRole = [
  "owner",
  "superAdmin",
  "hrAdmin",
  "technicalEmployee",
  "accountEmployee",
  "marketingEmployee",
]

function ColorSchemesExample() {
  function handleKeyDown(e) {  if (e.keyCode === 13) {logout();}}
  const { user: data } = useContext(UserData)
  const [user, setUser] = useState({})

  const logout = async () => {
    const { success, message, error } = await logoutUser()
    if (success === false) {
      window.alert(error)
    } else {
      window.alert(message)
      setUser({ success: false })
      navigate("/")
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      setUser(data)
    }
  }, [data])

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top gatsbyNav">
        <div className="container-fluid">
          
            <img
              src="/logo1.png"
              alt="logo"
              className="img-fluid ps-3 logo"
              style={{ width: "12%" }}
            />
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user && allRole.indexOf(user.role) !== -1 ? (
                allRoleLinks[allRole[allRole.indexOf(user.role)]].map(link => {
                  return (
                    <li className="nav-item">
                      <a className="nav-link" href={link.href}>
                        {link.text}
                      </a>
                    </li>
                  )
                })
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">
                      Home |
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/app/login" className="nav-link">
                      <Button
                        as="input"
                        type="submit"
                        className="loginBtn"
                        value="LOG IN"
                       
                      />
                    </Link>
                  </li>
                </>
              )}
              {user && user.success === true ? (
                <div className="nav-item">
                  <li>
                    <span onClick={logout} onKeyDown={handleKeyDown} className="nav-link">
                      Logout
                    </span>
                  </li>
                </div>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default ColorSchemesExample
