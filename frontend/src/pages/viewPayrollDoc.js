import React, { useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
// import { getPayrollDocs } from "../services/apiFunction"
import axios from "axios"
// import pic from  "../../static/document/"
import p from "../pages/"

const ViewPayrollDoc = () => {
    const [docs, setDocs] = useState([])
    const getAllDocuments = async() => {
      const { data } = await axios.get("/api/v2/document/all")
      // console.log(docs)
      if (data.success === false){
        window.alert(data.error)
      }else if (data.success === true) {
       setDocs(data.docs)
      }
     }
  
    useEffect(() => {
      getAllDocuments()
      console.log("Looking into Document")
      console.log(p)
    }, [])

    useEffect(() => {
      console.log(docs)
    }, [docs])
  
    return (
      <div className="app">
          <div className="allEmpDiv">   
            <div className="empTable margin">
              <h2 className="text-center mb-4">List of Documents</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="heading">Sr. No.</th>
                    <th className="heading">Name of File</th>
                    <th className="heading">Type of File</th>
                    <th className="heading">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {docs && docs.map((docs, Index) => {
                    console.log(docs.filename)
                    return (
                      <tr key={Index}>
                        <td>{Index + 1}</td>
                        <td>{docs.originalname}</td>
                        <td>{docs.mimetype}</td>
                        {/* {docs.mimetype.includes("image/") === true ? <td> <img src = {`/document/${docs.filename}`} alt="AddEmpImg" className="icon" /></td> : ""} */}
                       <td><a href= {`/document/${docs.filename}`} download>Download</a></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    )
  }
export default ViewPayrollDoc
