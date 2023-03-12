import React, { useState } from "react"
import Layout from "../components/Layout"
import Papa from "papaparse"
import { createCtcData } from "../services/apiFunction"
import SideBar from "../components/OwnersSidebar"
import axios from "axios"
import { Link } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function AddCTC() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([])
  //State to store table Column name
  const [tableRows, setTableRows] = useState([])
  //State to store the values
  const [values, setValues] = useState([])
  // On clear btn click
  const onClearBtnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    document.getElementById("ctc-file").value = ""
    document.getElementById("table-wrapper").style.display = "none"
    document.getElementById("save-clear-btns").style.display = "none"
  }
  // On Save btn click
  const empCTC = []
  // Function on Save button click
  const saveCTCinfoToDatabase = async e => {
    e.preventDefault()
    // Target `table-tbody Rows` and store it in an array.
    // e.g. the below array will [tr,tr] if the row count is 2 in that table body.
    const allTableRows = document.querySelectorAll("tbody tr")
    // ForEach loop to target/access data of each Row of table.
    allTableRows.forEach(tr => {
      // Empty object to store each row's data. Means this object will contain single employee data.
      let obj = {}
      // Target td i.e. Data from Row and store it in an Array.
      // e.g. format of below array for this project will be [td, td, td, td, td] if the Columns are 5 in a Row
      let tableDataArray = tr.querySelectorAll("td")
      // Store data in object
      obj.Emp_Id = tableDataArray[0].textContent
      obj.Name = tableDataArray[1].textContent
      obj.CTC = tableDataArray[2].textContent
      // Push object into `empCTC` array
      empCTC.push(obj)
    })
    // Post all employees CTC data from array into Database using axios
    const { error } = await createCtcData(empCTC)
    // const {error} = await axios.post("/api/v2/payroll/ctc/create", empCTC)
    if (error) {
      // window.alert(error)
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER
    });
    } else{
      //alert("CTC uploaded successfully.")
      toast.success("CTC of an employees uploaded successfully.", {
        position: toast.POSITION.TOP_CENTER
    });
    }
  }
  const changeHandler = event => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = []
        const valuesArray = []
        // Iterating data to get column name and their values
        results.data.map(d => {
          rowsArray.push(Object.keys(d))
          valuesArray.push(Object.values(d))
        })
        // Parsed Data Response in array format
        setParsedData(results.data)
        // Filtered Column Names
        setTableRows(rowsArray[0])
        // Filtered Values
        setValues(valuesArray)
        // Display Table Div
        document.getElementById("table-wrapper").style.display = "block"
        document.getElementById("save-clear-btns").style.display = "block"
      },
    })
  }

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9">
            {/* <div className="uploadTable"> */}
            {/* File Uploader */}
            <div className="row ownerColumn justify-content-center">
              <div className=" margin col-lg-9  col-lg-8 col-md-6 col-sm-6 wrapper">   
                <h2 className="text-center bulkText">Upload CTC information</h2>
                <div className="col-12">
                  <div className="card shadow-lg p-4">
                    <h4>Upload CTC information of Employee</h4>
                    <input
                      id="ctc-file"
                      type="file"
                      name="file"
                      className="form-control"
                      onChange={changeHandler}
                      accept=".csv"
                      style={{ display: "block", margin: "10px auto" }}
                    />
                    <h6 className="text-muted">
                      Hint : Upload CTC CSV file here.
                    </h6>
                    <div style={{ textAlign: "center" }}>
                      <img
                        className="img-fluid w-75"
                        src="CTC.png"
                        alt="Sample CSV image"
                      />
                    </div>
                    <h6 className="text-muted">
                      Refer the Sample CSV file image
                    </h6>
                  </div>
                </div>

                {/* Table */}
                <div className="col-lg-12">
                  <div id="table-wrapper" className="bulk-emp-table-div">
                    <h1 className="text-center mb-4">
                      Employee CTC Information Table
                    </h1>
                    <table className="table table-striped table-bordered table-sm">
                      <thead>
                        <tr>
                          {tableRows.map((rows, index) => {
                            return <th key={index}>{rows}</th>
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {values.map((value, index) => {
                          return (
                            <tr key={index}>
                              {value.map((val, i) => {
                                return <td key={i}>{val}</td>
                              })}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="row my-3"
                    id="save-clear-btns"
                    style={{ display: "none" }}
                  >
                    <div className="col-4 offset-8 d-flex justify-content-end ps-5">
                      <button
                        className="btn btn-success"
                        onClick={e => saveCTCinfoToDatabase(e)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={onClearBtnClick}
                      >
                        Clear
                      </button>
                    </div>
                    <ToastContainer />
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default AddCTC
