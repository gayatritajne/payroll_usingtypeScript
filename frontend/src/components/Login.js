import React, { useState, useContext, useEffect } from "react"
import { navigate } from "gatsby"
import { getLogin } from "../services/apiFunction"
import "bootstrap/dist/css/bootstrap.min.css"
import { UserData } from "./Layout"

const Login = () => {
  //  show password
  const showPasswordFunction = () => {
    var password = document.getElementById("employeePassword")
    if (password.type === "password") {
      password.type = "text"
    } else {
      password.type = "password"
    }
  }

  const [userData, setUserData] = useState({ username: "", password: "" })
  const { user } = useContext(UserData)
  const handleUpdate = event => {
    const { name, value } = event.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!userData.username || !userData.password) {
      return window.alert("Please fill the login detail first")
    } else {
      const { success, role, error, message } = await getLogin(userData)
      if (success === false) {
        console.log("1")
        window.alert(error)
      } else if (success === true && message) {
        navigate("/createPassword")
      } else if (success === true && !message) {
        if (role === "superAdmin") {
          navigate("/app/superadmin")
        } else if (role === "hrAdmin") {
          navigate("/app/hrdashboard")
        } else if (role === "owner") {
          console.log("here")
          navigate("/app/owner")
        } else {
          navigate("/app/profile1")
        }
      }
    }
  }

  useEffect(() => {
    if (user) {
      if (user.success === true) {
        if (user.role === "admin") {
          navigate("/app/profile")
        } else if (user.role === "superAdmin") {
          navigate("/app/superadmin")
        } else if (user.role === "user") {
          navigate("/app/profile1")
        }
      }
    }
  }, [user])
  return (
    <div className="container login-wrapper margin">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-lg-7 col-md-9">
          <form className="card loginCard mb-3" onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <h1>User Login</h1>
              <hr />
              <div className="col-11">
                <div className="form-group mb-3">
                  <label className="fw-bold" for="exampleInputUserID">
                    Employee Id
                  </label>
                  <input
                    id="exampleInputUserID"
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className="form-control mt-2 inputFont"
                    value={userData.username}
                    onChange={handleUpdate}
                  />
                </div>
              </div>
              <div className="col-11">
                <div className="form-group mb-4">
                  <label className="fw-bold" for="employeePassword">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-control mt-2 inputFont"
                    value={userData.password}
                    onChange={handleUpdate}
                    id="employeePassword"
                  />
                </div>
              </div>
              <div className="col-11">
                <div className="form-group form-check mb-4">
                  <input
                    onChange={showPasswordFunction}
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" for="exampleCheck1">
                    Show Password
                  </label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary loginBtn m-auto ">
              LogIn
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
