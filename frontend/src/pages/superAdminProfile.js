import React, { useEffect, useState, useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { loadUser } from "../services/apiFunction"
import Layout from "../components/Layout"

const Profile = () => {
  const [user, setUser] = useState({success:false})
  // const getUser =  () => {
  //   console.log("inside")
  // loadUser().then((data)=>setUser(data)).catch(()=>alert("refresh the page"))
  //   // console.log("data")
  //   // console.log(data)
  //   // setUser(data)
  // }
  useEffect(() => {
    loadUser().then((data)=>setUser(data)).catch(()=>alert("refresh the page"))
  },[])
  return (
    <>
      {user.success?(
        <Layout>
          <div className="container superAdminProfileContainer">
            <div className="row justify-content-center mt-5 ">
              <div className="col-lg-10 superAdminBtnDiv">
                <a
                  href="/app/superadmin"
                  class="btn btn-outline-secondary superAdminBtn mr-3"
                >
                  My Dashboard
                </a>
              </div>
              <div class="card col-lg-5 text-center superAdminP">
                <h2 className="superAdminH2"> Super Admin Profile</h2>
                <hr />
                <img
                  class="card-img-bottom mx-auto"
                  src="/Profile.png"
                  alt="Card image"
                />
                <p>Name : {user.employee.basic.name.firstName}</p>
                <p>Employee ID : {user.employee.payrollData.empId}</p>
                <p>Contact No : {user.employee.basic.mobile.number}</p>
                <p>Designation : {user.employee.basic.designation}</p>
              </div>
              <div className="card col-lg-5 text-center superAdminAccess">
                <h2 className="superAdminH2"> Super Admin's Access</h2>
                <hr />
                <div className=" row card accessRow">
                  <h4>Add Access</h4>
                  <hr />
                  <p>Super Admin can add new employee to Payroll.</p>
                </div>
                <div className="row card accessRow">
                  <h4>View Access</h4>
                  <hr />
                  <p>Super Admin can see list of all employees on Payroll.</p>
                </div>
                <div className="row card accessRow">
                  <h4>Upload Access</h4>
                  <hr />
                  <p>
                    Super Admin can add more than one employee by just uploading
                    CSV file.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
        ):""}
    </>
  )

  }
export default Profile
