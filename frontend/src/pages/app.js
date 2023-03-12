import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import PrivateRoute from "../components/PrivateRout"
import Profile from "../components/HrDashboard"
import Profile1 from "../components/Profile1"
import Login from "../components/Login"
import SuperAdmin from "../components/SuperAdmin"
import Owner from "../components/Owner"
import Myprofile from "./myprofile"

const App = () => {
  return (
    <>
      <Layout>
        <Router>
          <PrivateRoute
            isValidRole={["hrAdmin"]}
            path="/app/hrdashboard"
            component={Profile} />
          <PrivateRoute
            isValidRole={["superAdmin"]}
            path="/app/superadmin"
            component={SuperAdmin} />
          <PrivateRoute
            isValidRole={["owner"]}
            path="/app/owner"
            component={Owner} />
          <PrivateRoute
            isValidRole={["technicalEmployee", "accountEmployee", "marketingEmployee"]}
            path="/app/profile1"
            component={Profile1} />
           <PrivateRoute
            isValidRole={["owner"]}
            path="/myProfile"
            component={Myprofile} />
          <Login path="/app/login" />
        </Router>
      </Layout>
    </>
  )
}
export default App
