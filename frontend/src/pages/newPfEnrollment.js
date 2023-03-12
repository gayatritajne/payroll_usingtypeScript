import React, { useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Papa from "papaparse"
import { uploadPfEmpInfo } from "../services/apiFunction"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function NewPfEnrollment() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([])

  //State to store table Column name
  const [tableRows, setTableRows] = useState([])

  //State to store the values
  const [values, setValues] = useState([])

  const onClearBtnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    document.getElementById("bulk-file").value = ""
    document.getElementById("table-wrapper").style.display = "none"
    document.getElementById("save-clear-btns").style.display = "none"
  }
  // Function on Save button click
  const pfEmp = []
  const saveTableDataToDatabase = async e => {
    e.preventDefault()

    // Target `table-tbody Rows` and store it in an array.
    const allTableRows = document.querySelectorAll("tbody tr")

    //to target data of each Row of table.
    allTableRows.forEach(tr => {
      // Empty object to store each row's data.
      let obj = {}
      // Target td
      let tableDataArray = tr.querySelectorAll("td")
      // Store data in object
      obj.name = tableDataArray[1].textContent
      obj.empId = tableDataArray[2].textContent
      obj.empDob = tableDataArray[3].textContent
      obj.aadharNumber = tableDataArray[4].textContent
      obj.panNumber = tableDataArray[5].textContent
      obj.bankName = tableDataArray[6].textContent
      obj.ifscCode = tableDataArray[7].textContent
      obj.accountNumber = tableDataArray[8].textContent
      obj.address = tableDataArray[9].textContent
      obj.dateofRegistration = tableDataArray[10].textContent
      obj.pfUanNumber = tableDataArray[11].textContent
      obj.pfStatus = tableDataArray[12].textContent

      pfEmp.push(obj)

    })

    // Post all employees data from array into Database using axios

    const { error } = await uploadPfEmpInfo(pfEmp)
    if (error) {
      // window.alert(error)
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER
    });
    } else {
      //alert("Information of added successfully")
      toast.success("PF employee information is added successfully.", {
        position: toast.POSITION.TOP_CENTER
    });
    }
    //window.location.reload(false)
  }
  const changeHandler = event => {
    // Passing file data
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = []
        const valuesArray = []
        //to get column name and their values
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
      <div className="container newPfEnrollment">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <Link to="/pfManagement">
              {/* <img src="/arrow.png" alt="" className="arrowImg" /> */}
              <i class="bi bi-arrow-left-circle-fill"></i>
            </Link>
          </div>
          <div className="col-lg-8 cardDiv">
            <div className="card shadow-lg p-4">
              <h2 className="bulkText">
                Upload Employee PF Information
              </h2>
              <input
                id="bulk-file"
                type="file"
                name="file"
                className="form-control my-3 inputFont"
                onChange={changeHandler}
                accept=".csv"
              />
              <h6 className="text-muted">Hint : Upload Employee PF Information CSV file here.</h6>
              <div className="csvEgImg">
                <img
                  className="img-fluid"
                  src="pfEmployeeCSV.png"
                  alt="Sample CSV image"
                  width="510"
                  height="300"
                />
              </div>
              <h6 className="text-muted mt-1">Refer the sample CSV file image</h6>
            </div>
          </div>

          {/* Table */}
          <div className="col-lg-10">
            <div id="table-wrapper" className="bulk-emp-table-div">
              <h1 className="text-center mb-4" id="table-info-heading">
                Employee PF Information Table
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
            {/* Save & Clear buttons */}
            <div
              className="row my-3"
              id="save-clear-btns"
              style={{ display: "none" }}
            >
              <div className="col-4 offset-8 d-flex justify-content-end">
                <button
                  className="btn btn-success"
                  onClick={e => saveTableDataToDatabase(e)}
                >
                  Save
                </button>
                <button className="btn btn-danger" onClick={onClearBtnClick}>
                  Clear
                </button>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default NewPfEnrollment
