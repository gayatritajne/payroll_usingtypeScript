import React, { useState, useRef, useEffect } from "react"
import Table from "react-bootstrap/Table"
import Modal from "react-modal"
import jsPDF from "jspdf"
import { loadUser, getUserData, getMyCTC } from "../services/apiFunction"
import html2canvas from "html2canvas"
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const Profile1 = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modal1IsOpen, setModal1IsOpen] = useState(false)
  const [selectedAttendanceYear, setSelectedAttendanceYear] = useState(
    new Date().getFullYear()
  )
  const [monthShow, setMonthShow] = useState(months)
  const [selectedMonthsalaryData, setSelectedMonthsalaryData] = useState([])
  const [validYear, setValidYear] = useState([])

  // Download PDF functionality
  async function generatePDF() {
    var downloading = document.getElementById("salaryTable")
    var doc = new jsPDF("l", "pt", "a4")
    await html2canvas(downloading, {
      width: 2000,
      height: 2500,
    }).then(canvas => {
      doc.addImage(canvas.toDataURL("image/png"), "png", 180, 50, 1360, 2300)
    })
    doc.save("SalarySlip.pdf")
  }

  async function showSalary(e) {
    if (e.target.value) {
      const d = await getUserData(
        Number(e.target.value),
        selectedAttendanceYear
      )
      if (d.success === true) {
        setSelectedMonthsalaryData([])
        const monthListArray = Object.keys(d.finalData)
        let fData = []
        monthListArray.map((month, i) => {
          fData.push(
            calculateSalaryDetail({
              ctc,
              month: month.slice(0, month.length - 4),
              year: month.slice(month.length - 4),
              ...d.finalData[month],
            })
          )
        })
        setSelectedMonthsalaryData(fData)

        document.getElementById("salaryTable").style.display = "block"
        document.getElementById("DownloadBtn").style.display = "block"
      } else {
        window.alert(d.error)
      }
    }
  }

  const ref = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)

  // check box functionality
  const handleClick = event => {
    if (ref.current.checked) {
      var familyInfo = document.getElementsByClassName("familyHidden")[0]
      var familyInfoRow = document.getElementsByClassName("familyHiddenRow")[0]
      familyInfo.style = "display:revert"
      familyInfoRow.style = "display:revert"
    } else {
      familyInfo = document.getElementsByClassName("familyHidden")[0]
      familyInfoRow = document.getElementsByClassName("familyHiddenRow")[0]
      familyInfo.style = "display:none"
      familyInfoRow.style = "display:none"
    }
  }

  const handleClick3 = event => {
    if (ref3.current.checked) {
      var salaryInfo = document.getElementsByClassName("salaryHidden")[0]
      var salaryInfoRow = document.getElementsByClassName("salaryHiddenRow")[0]
      salaryInfo.style = "display:revert"
      salaryInfoRow.style = "display:revert"
    } else {
      salaryInfo = document.getElementsByClassName("salaryHidden")[0]
      salaryInfoRow = document.getElementsByClassName("salaryHiddenRow")[0]
      salaryInfo.style = "display:none"
      salaryInfoRow.style = "display:none"
    }
  }

  const handleClick4 = event => {
    if (ref4.current.checked) {
      var CTCHidden = document.getElementsByClassName("CTCHidden")[0]
      var CTCHiddenRow = document.getElementsByClassName("CTCHiddenRow")[0]
      CTCHidden.style = "display:revert"
      CTCHiddenRow.style = "display:revert"
    } else {
      CTCHidden = document.getElementsByClassName("CTCHidden")[0]
      CTCHiddenRow = document.getElementsByClassName("CTCHiddenRow")[0]
      CTCHidden.style = "display:none"
      CTCHiddenRow.style = "display:none"
    }
  }

  const [records, setRecords] = useState()
  const [ctc, setCtc] = useState()
  const [previousMonthAttendance, setPreviousMonthAttendance] = useState()
  const [previousMonthsalaryData, setPreviousMonthsalaryData] = useState()

  // Salary calculation according to CTC
  const calculateSalaryDetail = ({
    ctc,
    month,
    year,
    present,
    "privilege leave": pl,
    "sick leave": sl,
    totalBusinessDay,
    "casual leave": cl,
    holiday,
  }) => {
    let totalCtc = Number(ctc)
    let perMonthSalary = totalCtc / 12
    let perDaySalary = perMonthSalary / 30
    let pf = 1850
    let pt = 200
    let EmployerContribution = 1850
    let basicSalary = (0.5 * totalCtc) / 12
    let houseAllowance = 0.5 * basicSalary
    let conveyanceAllowances = 1600
    let totalAllowance =
      (basicSalary + houseAllowance + conveyanceAllowances) * 12
    let ta = totalAllowance / 12
    let specialAllowances = totalCtc - totalAllowance
    let sa = specialAllowances / 12
    let grossSalary = ta + sa
    let totalPresentDays = present
    let totalpaidLeaves = sl + pl + cl
    let unpaidLeaves = totalBusinessDay - holiday - totalpaidLeaves - present
    let leaveDeduction = perDaySalary * unpaidLeaves
    let netSalary =
      grossSalary - leaveDeduction - pf - pt - EmployerContribution
    let roundupNetSalary = netSalary.toFixed(2)
    return {
      basicSalary,
      houseAllowance,
      specialAllowances,
      roundupNetSalary,
      totalPresentDays,
      totalpaidLeaves,
      unpaidLeaves,
      conveyanceAllowances,
      grossSalary,
      leaveDeduction,
      pf,
      pt,
      EmployerContribution,
      sa,
      month,
      year,
    }
  }
  // Fetching the data from database
  const getEmployeeData = async () => {
    let data = await loadUser()
    let CTC = await getMyCTC()
    let presentData = await getUserData()
    console.log(presentData);
    setRecords(data)
    if (CTC.success === true) {
      setCtc(CTC.employeeCTC.CTC)
    } else {
      window.alert(CTC.error)
    }
    if (presentData.success === true) {
      // set previous month data to use state
      setPreviousMonthAttendance({
        month: Object.keys(presentData.finalData)[0].slice(
          0,
          Object.keys(presentData.finalData)[0].length - 4
        ),
        year: Object.keys(presentData.finalData)[0].slice(
          Object.keys(presentData.finalData)[0].length - 4
        ),
        ...presentData.finalData[Object.keys(presentData.finalData)[0]],
      })
    } else if (presentData.success === false) {
      window.alert(presentData.error)
    }
  }

  useEffect(() => {
    const d = new Date()
    const oldMonth = new Date(d.getFullYear(), d.getMonth() - 1)
    let monthData = {
      month: oldMonth.getMonth(),
      year: oldMonth.getFullYear(), 
    }
    console.log(monthData);
    getEmployeeData(monthData)
  }, [])

  useEffect(() => {
    if (records && records.joiningDate) {
      let cYear = new Date().getFullYear()
      let setYear = []
      while (cYear >= new Date(records.joiningDate).getFullYear()) {
        setYear.push(cYear)
        cYear--
      }
      setValidYear(setYear)

      if (selectedAttendanceYear) {
        if (
          Number(selectedAttendanceYear) ===
            new Date(records.joiningDate).getFullYear() &&
          Number(selectedAttendanceYear) === new Date().getFullYear()
        ) {
          setMonthShow(
            months.slice(
              new Date(records.joiningDate).getMonth(),
              new Date().getMonth()
            )
          )
        } else if (
          Number(selectedAttendanceYear) ===
            new Date(records.joiningDate).getFullYear() &&
          Number(selectedAttendanceYear) !== new Date().getFullYear()
        ) {
          setMonthShow(months.slice(new Date(records.joiningDate).getMonth()))
        } else if (Number(selectedAttendanceYear) < new Date().getFullYear()) {
          setMonthShow(months)
        } else if (
          Number(selectedAttendanceYear) === new Date().getFullYear()
        ) {
          setMonthShow(months.slice(0, new Date().getMonth()))
        }
      }
    }
    if (ctc) {
      setPreviousMonthsalaryData(
        calculateSalaryDetail({ ctc, ...previousMonthAttendance })
      )
    }
  }, [previousMonthAttendance, selectedAttendanceYear, ctc, records])
  // Family information modal
  const onButtonClick2 = (
    fmember,
    status,
    Nspouse,
    relationship,
    sDOB,
    c1Name,
    c1Gender,
    c1DOB,
    c2Name,
    c2Gender,
    c2DOB,
    fName,
    fDOB,
    mName,
    mDOB
  ) => {
    setModalIsOpen(true)
    setTimeout(() => {
      document.getElementById(
        "common-modal"
      ).innerHTML = `  <table class="table table-bordered table-sm table-striped">
<thead>
<tr>
  <th class="text-center">Number of Family Members</th>
  <th class="text-center">Status</th>
  ${
    status === "married"
      ? `<th class="text-center">Spouse Details</th>
  <th class="c1-hide text-center">Child 1</th>
  <th class="c2-hide text-center">Child 2</th>`
      : ` <th class="text-center">Father Details</th>
  <th class="text-center">Mother Details</th>`
  }
</tr>
</thead>
<tbody>
<tr>
  <td>${fmember}</td>
  <td>${status}</td>
${
  status === "married"
    ? `
  <td>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Relationship</th>
          <th scope="col">DOB</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${Nspouse}</td>
          <td>${relationship}</td>
          <td>${
            sDOB &&
            sDOB.split("-")[2] +
              "-" +
              sDOB.split("-")[1] +
              "-" +
              sDOB.split("-")[0]
          }</td>
        </tr>
      </tbody>
    </table>
  </td>

  <td class="c1-hide">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">DOB</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${c1Name}</td>
          <td>${c1Gender}</td>
          <td>${
            c1DOB &&
            c1DOB.split("-")[2] +
              "-" +
              c1DOB.split("-")[1] +
              "-" +
              c1DOB.split("-")[0]
          }</td>
        </tr>
      </tbody>
    </table>
  </td>
  <td class="c2-hide">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">DOB</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${c2Name}</td>
          <td>${c2Gender}</td>
          <td>${
            c2DOB &&
            c2DOB.split("-")[2] +
              "-" +
              c2DOB.split("-")[1] +
              "-" +
              c2DOB.split("-")[0]
          }</td>
        </tr>
      </tbody>
    </table>
  </td>`
    : `<td>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">DOB</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${fName}</td>
          <td>${
            fDOB &&
            fDOB.split("-")[2] +
              "-" +
              fDOB.split("-")[1] +
              "-" +
              fDOB.split("-")[0]
          }</td>
        </tr>
      </tbody>
    </table>
  </td>
  <td>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">DOB</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${mName}</td>
          <td>${
            mDOB &&
            mDOB.split("-")[2] +
              "-" +
              mDOB.split("-")[1] +
              "-" +
              mDOB.split("-")[0]
          }</td>
        </tr>
      </tbody>
    </table>
  </td>`
}

</tr>
</tbody>
</table>`
      document.getElementById("heading").innerText = "Family Information"
      // Conditions for hiding/showing children
      if (c1Name === "" || c1Name === undefined) {
        document.querySelectorAll(".c1-hide").forEach(i => {
          i.classList.add("d-none")
        })
      } else {
        document.querySelectorAll(".c1-hide").forEach(i => {
          i.classList.remove("d-none")
        })
      }
      if (c2Name === "" || c2Name === undefined) {
        document.querySelectorAll(".c2-hide").forEach(i => {
          i.classList.add("d-none")
        })
      } else {
        document.querySelectorAll(".c2-hide").forEach(i => {
          i.classList.remove("d-none")
        })
      }
    }, 200)
  }

  return (
    // <div className="vh-100">
    <div className="empDashbord container-fluid">
      <div className="profileDiv">
        <div className="yprofile">
          <h1 className="">My profile</h1>
          <div className="employeeLogo">
            <img src="/ownerLogo.png" alt="profile" className="w-25" />
          </div>
          <div className="email">
            <p>
              {" "}
              <b> Email ID : </b>
              {records === undefined ? "" : records.email}
            </p>
            <p>
              <b> Mobile Number : </b>
              {records === undefined ? "" : records.contactNo}
            </p>
          </div>
        </div>

        <h2 className="text-center">
          Welcome {records === undefined ? "" : records.name}
        </h2>

        <div className="row check justify-content-center">
          <div className="col-lg-3 col-xl-2">
            <input
              type="checkbox"
              ref={ref}
              onClick={handleClick}
              id="check1"
              name="check1"
              className="check1"
            ></input>
            <label htmlFor="check1">Family Information</label>
          </div>
          <div className="col-lg-3 col-xl-2">
            <input
              type="checkbox"
              ref={ref3}
              onClick={handleClick3}
              id="check2"
              name="check2"
              value="salary"
            ></input>
            <label htmlFor="check2">Salary Information</label>
          </div>
          <div className="col-lg-3 col-xl-2">
            <input
              type="checkbox"
              ref={ref4}
              onClick={handleClick4}
              id="check5"
              name="check5"
              value="CTC"
            ></input>
            <label htmlFor="check5">Current CTC</label>
          </div>
        </div>
        <div className="profileTableDiv" id="employeeTable">
          <Table
            striped
            bordered
            hover
            size="sm"
            className="profileTable table table-responsive"
          >
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Email Id</th>
                <th>Joining Date</th>
                <th className="CTCHidden">CTC</th>
                <th className="familyHidden">Family Information</th>
                <th className="salaryHidden">Salary Information</th>
              </tr>
            </thead>
            {records ? (
              <tbody>
                <tr>
                  <td>{records.empId}</td>
                  <td>{records.name}</td>
                  <td>{records.designation}</td>
                  <td>{records.email}</td>
                  <td>
                    {records.joiningDate.split("-")[2] +
                      "-" +
                      records.joiningDate.split("-")[1] +
                      "-" +
                      records.joiningDate.split("-")[0]}
                  </td>
                  <td className="CTCHiddenRow">
                    {ctc === undefined ? "NA" : ctc}
                  </td>
                  <td className="familyHiddenRow">
                    <button
                      id="modalbtn"
                      onClick={() =>
                        onButtonClick2(
                          records.numberOfMember,
                          records.status,
                          records.NameofSpouse,
                          records.relationship,
                          records.DOB,
                          records.child1,
                          records.child1Gender,
                          records.DOB1,
                          records.child2,
                          records.child2Gender,
                          records.DOB2,
                          records.NameofFather,
                          records.DOB3,
                          records.NameofMother,
                          records.DOB4
                        )
                      }
                    >
                      See Information{" "}
                    </button>
                  </td>
                  <td className="salaryHiddenRow">
                    <button id="modalbtn" onClick={() => setModal1IsOpen(true)}>
                      See Information
                    </button>
                  </td>
                </tr>
              </tbody>
            ) : (
              ""
            )}
          </Table>
        </div>
        {/* </div> */}
        <Modal isOpen={modalIsOpen}>
          <h1 className="heading text-center pt-4" id="heading"></h1>
          <p className="crossSign" onClick={() => setModalIsOpen(false)}>
            &#10060;
          </p>
          <div className="familyInformation" id="common-modal"></div>
          <div className="salaryCloseBtn">
            <button className="modalbtn" onClick={() => setModalIsOpen(false)}>
              Close
            </button>
          </div>
        </Modal>
        <Modal isOpen={modal1IsOpen}>
          <div className="familyInformation">
            <h1 className="heading">
              Last Month Salary Information{" "}
              <p className="crossSign" onClick={() => setModal1IsOpen(false)}>
                &#10060;
              </p>
            </h1>
            <div className="PreviousMonthData">
              <table className="table table-bordered profileTable salTable">
                <thead>
                  {previousMonthsalaryData ? (
                    <tr>
                      <th>Year</th>
                      <th>Month</th>
                      <th>Present Days</th>
                      <th>Paid Leaves</th>
                      <th>Unpaid Leaves</th>
                      <th>Basic Salary</th>
                      <th>
                        HRA <br />
                        (House Rent Allowances)
                      </th>
                      <th>
                        CA <br />
                        (Conveyance Allowances)
                      </th>
                      <th>
                        SA <br />
                        (Special Allowances)
                      </th>
                      <th>Deduction-PT</th>
                      <th>Deduction-PF</th>
                      <th>Employer-Contribution</th>
                      <th>Deduction-Unpaid leaves</th>
                      <th>Net Salary</th>
                    </tr>
                  ) : (
                    <p>CTC not found.</p>
                  )}
                </thead>
                <tbody>
                  {previousMonthsalaryData ? (
                    <tr>
                      <td>{previousMonthsalaryData.year}</td>
                      <td>{previousMonthsalaryData.month}</td>
                      <td>{previousMonthsalaryData.totalPresentDays}</td>
                      <td>{previousMonthsalaryData.totalpaidLeaves}</td>
                      <td>{previousMonthsalaryData.unpaidLeaves}</td>
                      <td>{previousMonthsalaryData.basicSalary.toFixed(2)}</td>
                      <td>
                        {previousMonthsalaryData.houseAllowance.toFixed(2)}
                      </td>
                      <td>{previousMonthsalaryData.conveyanceAllowances}</td>
                      <td>{previousMonthsalaryData.sa.toFixed(2)}</td>
                      <td>{previousMonthsalaryData.pt}</td>
                      <td>{previousMonthsalaryData.pf}</td>
                      <td>{previousMonthsalaryData.EmployerContribution}</td>
                      <td>
                        {previousMonthsalaryData.leaveDeduction.toFixed(2)}
                      </td>
                      <td>{previousMonthsalaryData.roundupNetSalary}</td>
                    </tr>
                  ) : (
                    <p>Can't show the salary information.</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <hr
            style={{ height: "4px", background: "black", marginTop: "40px" }}
          />
          <div className="previousSalary">
            <label className="form-label">
              <h1>Select month and year to download salary slip.</h1>
            </label>
            <div className="container">
              <div className=" row monthDroupdown justify-content-center">
                <div className="col-lg-4 col-md-5">
                  <select
                    className="form-select mt-3 dropDown1"
                    required
                    name="year"
                    disabled={ctc == undefined ? true : false}
                    style={ctc == undefined ? { color:'#AAAAAA'} : {color : ''}} 
                    onChange={e => setSelectedAttendanceYear(e.target.value)}
                  >
                    <option selected disabled value="">
                      {" "}
                      Select year
                    </option>
                    {validYear.map(y => (
                      <option value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6 col-md-7">
                  <select
                    className="form-select mt-3 dropDown2"
                    required
                    name="month"
                    disabled={ctc == undefined ? true : false}
                    style={ctc == undefined ? { color:'#AAAAAA'} : {color : ''}} 
                    onChange={showSalary}
                  >
                    <option selected disabled value="">
                      {" "}
                      Select month to see previous salary information.
                    </option>
                    {monthShow.map((m, index) => {
                      return (
                        <option key={m} value={index}>
                          {m}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div id="salaryTable">
            <div className="container1">
              {selectedMonthsalaryData.length > 0 ? (
                <div className="salaryhead">
                  <h1 className="titalColor">uvXcel It Solution Pvt.Ltd</h1>
                  <hr />
                  <h2>
                    Salary slip of {selectedMonthsalaryData[0].month} -{" "}
                    {selectedMonthsalaryData[0].year}
                  </h2>
                </div>
              ) : (
                ""
              )}
              <Table className="salaryTable table-responsive" border="1">
                <tr>
                  <th>Name:</th>
                  <td>{records === undefined ? "" : records.name}</td>
                  <th>Department:</th>
                  <td>Software Development</td>
                </tr>
                <tr>
                  <th>Emp Id:</th>
                  <td>{records === undefined ? "" : records.empId}</td>
                  <th>Bank Name:</th>
                  <td>{records === undefined ? "" : records.bankName}</td>
                </tr>
                <tr>
                  <th>Designation:</th>
                  <td>{records === undefined ? "" : records.designation}</td>
                  <th>Account No.:</th>
                  <td>{records === undefined ? "" : records.accountNumber}</td>
                </tr>
              </Table>
              {selectedMonthsalaryData &&
                selectedMonthsalaryData.map(salaryData => {
                  return (
                    <table className="salaryTable table-responsive" border="1">
                      <tr style={{ border: "1px solid black" }}>
                        <th>Earnings</th>
                        <th>Amount</th>
                        <th>Deductions</th>
                        <th>Amount</th>
                      </tr>
                      <tr>
                        <td>Basic Salary</td>
                        <td style={{ borderRight: "1px solid black" }}>
                          {salaryData.basicSalary.toFixed(2)}
                        </td>
                        <td>PF</td>
                        <td>{salaryData.pf}</td>
                      </tr>
                      <tr>
                        <td>House Rent Allowance</td>
                        <td style={{ borderRight: "1px solid black" }}>
                          {salaryData.houseAllowance.toFixed(2)}
                        </td>
                        <td>PT</td>
                        <td>{salaryData.pt}</td>
                      </tr>
                      <tr>
                        <td>Conveynance Allowances</td>
                        <td style={{ borderRight: "1px solid black" }}>
                          {salaryData.conveyanceAllowances}
                        </td>
                        <td>Leaves ({salaryData.unpaidLeaves})</td>
                        <td>{salaryData.leaveDeduction.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Special Allowances</td>
                        <td style={{ borderRight: "1px solid black" }}>
                          {salaryData.sa.toFixed(2)}
                        </td>
                        <td>Employer Contribution</td>
                        <td>{salaryData.EmployerContribution.toFixed(2)}</td>
                      </tr>
                      <tr className="font-weight-bold">
                        <td>Gross Salary</td>
                        <td style={{ borderRight: "1px solid black" }}>
                          {salaryData.grossSalary.toFixed(2)}
                        </td>
                      </tr>
                      <tr style={{ border: "1px solid black" }}>
                        <th> </th>
                        <th>NET PAY</th>
                        <th>{salaryData.roundupNetSalary}</th>
                        <td></td>
                      </tr>
                    </table>
                  )
                })}
            </div>
          </div>
          <div id="DownloadBtn">
            <button id="download" onClick={generatePDF}>
              Download
            </button>
          </div>
          <div className="salaryCloseBtn">
            <button className="modalbtn" onClick={() => setModal1IsOpen(false)}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
export default Profile1