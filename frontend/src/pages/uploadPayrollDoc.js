import axios from "axios"
import Layout from "../components/Layout"
import React, { useState, useEffect } from "react"
import SideBar from "../components/OwnersSidebar"
import p from "../pages/"
import { Link } from "gatsby"

const UploadDocument = () => {
  const [uploadFile, setUploadFile] = useState()
  const onFileChange = e => {
    setUploadFile(e.target.files[0])
  }

  const onFileUpload = async () => {
    if (uploadFile) {
      const formData = new FormData()
      formData.append("myFile", uploadFile)
      const data = await axios.post("api/v2/document/upload", formData)
      console.log(data)
      window.alert("File uploaded successfully")
      window.location.reload(false)
    }
  }
  // On clear button click
  const onClearBtnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    // document.getElementById("bulk-file").value = ""
    window.location.reload(false)
  }

  const [docs, setDocs] = useState([])
  const getAllDocuments = async () => {
    const { data } = await axios.get("/api/v2/document/all")
    // console.log(docs)
    if (data.success === false) {
      window.alert(data.error)
    } else if (data.success === true) {
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

  const seeDocBtnClick = () => {
    document.getElementById("documentTable").style.display = "block"
    getAllDocuments()
  }
  const closeBtnClick = () => {
    document.getElementById("documentTable").style.display = "none"
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  return (
    <Layout>
      <div className="OwnerContainer wrapper">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            <div className="row ownerColumn justify-content-center ">
              <div className="margin col-lg-9  col-lg-8 col-md-6 col-sm-6 ">
                <h2 className="text-center bulkText">
                  Upload & View Payroll Documents
                </h2>
                <div className="card shadow-lg p-4">
                  <h4>Upload Payroll documents here</h4>
                  <input
                    type="file"
                    id="bulk-file"
                    name="file"
                    className="form-control inputFont"
                    onChange={onFileChange}
                  />
                  <h6 className="text-muted mt-3">
                    Hint : You can upload all types of files here.
                  </h6>
                </div>
                {uploadFile ? (
                  <div id="FileDetails">
                    <br />
                    <h2>File Details:</h2>
                    <p>File Name: {uploadFile.name} </p>
                    <p>File Type: {uploadFile.type}</p>
                    <p>
                      Last Modified:
                      {uploadFile.lastModifiedDate.toDateString()}
                    </p>
                    <button
                      className="btn btn-success mt-3"
                      onClick={onFileUpload}
                    >
                      Upload
                    </button>
                    <button
                      className="btn btn-danger mt-3"
                      id="save-clear-btns"
                      onClick={onClearBtnClick}
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  ""
                )}

                <div className="text-center">
                  <button className="btn seeDocBtn" onClick={seeDocBtnClick}>
                    See all Payroll Document here
                  </button>
                </div>
              </div>

              <div
                className="col-lg-9 col-md-8  col-sm-9"
                id="documentTable"
                style={{ display: "none" }}
              >
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  onClick={closeBtnClick}
                ></button>
                <h2 className=" text-center mb-4">List of Documents</h2>
                <div className="empTable">
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
                      {docs &&
                        docs.map((docs, Index) => {
                          console.log(docs.filename)
                          return (
                            <tr key={Index}>
                              <td>{Index + 1}</td>
                              <td>{docs.originalname}</td>
                              <td>{docs.mimetype}</td>
                              {/* {docs.mimetype.includes("image/") === true ? <td> <img src = {`/document/${docs.filename}`} alt="AddEmpImg" className="icon" /></td> : ""} */}
                              <td>
                                <button className="docDownloadBtn btn btn-light">
                                  <a
                                    href={`/document/${docs.filename}`}
                                    download
                                  >
                                    Download
                                  </a>
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UploadDocument
