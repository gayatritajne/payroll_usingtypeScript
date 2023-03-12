// import React from "react"
import React, { useState, createContext, useEffect } from "react"
import NavBar from "../components/Nav-bar"
import "../style/global.css"
import { loadUser } from "../services/apiFunction"

export const UserData = createContext()

const Layout = ({ children }) => {
  const [user, setUser] = useState()
  const [protectedUser, setProtectedUser] = useState()

  const callUser = async () => {
    const data = await loadUser()
    setUser(data)
  }
  const protectedApi = async () => {
    const data = await loadUser()
    setProtectedUser(data)
  }

  useEffect(() => {
    callUser()
  })

  return (
    <>
      <UserData.Provider
        value={{ user, callUser, protectedApi, protectedUser }}>
        <div className="layout">
          <NavBar />
          {children}
          <footer id="footer" className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-4 col-md-5 text-center text-md-start">
                  <p className="ps-3">Copyright © 2022 uvXcel - All Rights Reserved</p>
                </div>
                <div className="offset-lg-5 offset-md-2 col-lg-3 col-md-5 text-center text-md-start">
                  <div className="footer-contact">
                    <p>Email : <a href="mailto:hr@uvxcel.com">hr@uvxcel.com</a></p>
                    <p className="">Phone: +91-20-6706259</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </UserData.Provider>
    </>
  )
}
export default Layout
