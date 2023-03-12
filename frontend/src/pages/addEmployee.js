import React, { useState, useEffect, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "../style/global.css"
import { navigate } from "gatsby"
import { createUser } from "../services/apiFunction"
import "react-toastify/dist/ReactToastify.css"
import Layout from "../components/Layout"
import SideBar from "../components/SideBar"
import { Link } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const regAlphaSpace = /^[a-zA-Z ]*$/
const isValidEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
const validEmailType = ["uvxcel.com", "uvxcel.in"]
const nameValidation = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/

const Superadmin = location => {
  const [checkError, setCheckError] = useState(false)
  // Function to restrict space
  function spaceBlock() {
    let allInputs = document.querySelectorAll(".preventSpaces")
    allInputs.forEach(input => {
      if (input.selectionStart === 0 && window.event.code === "Space") {
        window.event.preventDefault()
      }
    })
  }
  // Function to Show hide password
  const showPasswordFunction = () => {
    var password = document.getElementById("employeePassword")
    if (password.type === "password") {
      password.type = "text"
    } else {
      password.type = "password"
    }
  }
  // Function for employee who has single parent
  const numberOfMembers = () => {
    let singleRadio = document.getElementById("famInput1")
    let marriedRadio = document.getElementById("famInput")
    if (
      document.getElementById("exampleInputnumberOfMember").value === "1" &&
      singleRadio.checked
    ) {
      document.getElementById("parents").style.display = "block"
      document.querySelectorAll(".motherDiv").forEach(item => {
        item.style.display = "none"
      })
      document.querySelectorAll(".fatherDiv").forEach(item => {
        item.style.display = "none"
      })
    } else if (
      document.getElementById("exampleInputnumberOfMember").value !== "1" &&
      singleRadio.checked
    ) {
      document.getElementById("parents").style.display = "none"
      document.querySelectorAll(".singleParent").forEach(parent => {
        if (parent.checked) {
          parent.checked = false
        }
      })
      document.querySelectorAll(".motherDiv").forEach(item => {
        item.style.display = "block"
      })
      document.querySelectorAll(".fatherDiv").forEach(item => {
        item.style.display = ""
      })
    } else if (
      document.getElementById("exampleInputnumberOfMember").value === "1" &&
      marriedRadio.checked
    ) {
      document.getElementById("parents").style.display = "none"
    } else {
      document.getElementById("parents").style.display = "none"
      document.querySelectorAll(".motherDiv").forEach(item => {
        item.style.display = "block"
      })
      document.querySelectorAll(".fatherDiv").forEach(item => {
        item.style.display = "block"
      })
    }
    if (document.getElementById("famInput2").checked) {
      document.querySelectorAll(".motherDiv").forEach(item => {
        item.style.display = "none"
      })
      document.querySelectorAll(".fatherDiv").forEach(item => {
        item.style.display = ""
      })
    } else if (document.getElementById("famInput3").checked) {
      document.querySelectorAll(".fatherDiv").forEach(item => {
        item.style.display = "none"
      })
      document.querySelectorAll(".motherDiv").forEach(item => {
        item.style.display = ""
      })
    }
  }
  // for maried and single employee
  const radioClick = () => {
    document.getElementById("spouse").style.display = "block"
    document.getElementById("newDiv").style.display = "none"
  }
  const radioClick1 = () => {
    numberOfMembers()
    document.getElementById("spouse").style.display = "none"
    document.getElementById("newDiv").style.display = "block"
  }

  //  To show child details
  const ref = useRef(null)
  const ref1 = useRef(null)
  const child1Click = event => {
    if (ref.current.checked) {
      console.log(ref)
      var children1 = document.getElementsByClassName("child1")[0]
      children1.style = "display:block"
    } else {
      children1 = document.getElementsByClassName("child1")[0]
      children1.style = "display:none"
      console.log("✅ Checkbox is unchecked")
    }
  }
  const child2Click = event => {
    if (ref1.current.checked) {
      var children2 = document.getElementsByClassName("child2")[0]
      children2.style = "display:block"
    } else {
      children2 = document.getElementsByClassName("child2")[0]
      children2.style = "display:none"
    }
  }
  // on click of child information
  const ref2 = useRef(null)
  const childInfoClick = event => {
    if (ref2.current.checked) {
      document.getElementById("childCheckBox").style = "display:block"
    } else {
      document.getElementById("childCheckBox").style = "display:none"
    }
  }
  // useState to show forms
  const [showFormNo, setShowFormNo] = useState(1)
  // useState to set Data
  const [employeeData1, setEmployeeData1] = useState({
    role: "",
    tempPassword: "",
    empId: "",
  })
  const [employeeData2, setEmployeeData2] = useState({
    numberOfMember: "",
    status: "",
    NameofSpouse: "",
    relationship: "",
    DOB: "",
    child1: "",
    DOB1: "",
    child1Gender: "",
    child2: "",
    DOB2: "",
    child2Gender: "",
    NameofFather: "",
    DOB3: "",
    NameofMother: "",
    DOB4: "",
  })

  // To validation for DOB
  function getAge(DOB) {
    var today = new Date()
    var birthDate = new Date(DOB)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
  //1st form On change - Basic Information of Employee
  const handleFirstFormInput = e => {
    // validations for 1st form
    const { name, value, localName } = e.target
    const inputRef = document.querySelector(`${localName}[name = ${name}]`)
    const errorRef = inputRef.closest(".mb-3").lastChild
    if (name === "empId") {
      if (value.length > 0 && value[0].toUpperCase() !== "U") {
        setCheckError(true)
        console.log(value)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "EmpId first letter must be 'U' ")
      } else if (value.length > 1 && value[1].toUpperCase() !== "I") {
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "EmpId second letter must be 'I' ")
      } else if (value.length > 2 && value[2].toUpperCase() !== "S") {
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "EmpId third letter must be 'S'")
      } else if (value.length > 3 && value[3].toUpperCase() !== "P") {
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "EmpId fourth letter must be 'P'")
      } else if (value.length > 4 && value[4].toUpperCase() !== "L") {
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "EmpId fifth letter must be 'L'")
      } else if (
        (value.length > 5 && value.length < 9) ||
        (value.length > 5 && value.length > 9)
      ) {
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "EmpId must contain  5 letter and 4 digits"
      } else if (value.length === 9 && isNaN(value.slice(5)) === true) {
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "After 5 letter enter 4 number"
      } else {
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else {
      setCheckError(false)
      inputRef.classList.remove("inputError")
      inputRef.classList.add("inputSuccess")
      errorRef.classList.remove("errorRef")
    }
    setEmployeeData1({ ...employeeData1, [name]: value })
  }
  //2nd form On change - Employee Position
  const handleSecondFormInput = e => {
    // validations for 2nd form
    const { name, value } = e.target
    numberOfMembers()
    const relationship = employeeData2.relationship
    const inputRef = document.querySelector(`[name = ${name}]`)
    const errorRef = inputRef.closest(".mb-3").lastChild

    if (name === "NameofSpouse" && value.length > 0) {
      if (!employeeData2.numberOfMember) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter number of family member first"
      } else if (regAlphaSpace.test(value) === false) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter only alphabets."
      } else {
        setCheckError(false)
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else if (name === "NameofFather" && value.length > 0) {
      if (!employeeData2.numberOfMember) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter number of family member first"
      } else if (regAlphaSpace.test(value) === false) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter only alphabets."
      } else {
        setCheckError(false)
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else if (name === "NameofMother" && value.length > 0) {
      if (regAlphaSpace.test(value) === false) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter only alphabets."
      } else {
        setCheckError(false)
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else if (name === "child1" && value.length > 0) {
      if (regAlphaSpace.test(value) === false) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter only alphabets."
      } else {
        setCheckError(false)
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else if (name === "child2" && value.length > 0) {
      if (regAlphaSpace.test(value) === false) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter only alphabets."
      } else {
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else {
      setCheckError(false)
      inputRef.classList.remove("inputError")
      inputRef.classList.add("inputSuccess")
      errorRef.classList.remove("errorRef")
    }
    if (name === "DOB" && relationship === "Husband") {
      const age = getAge(value)
      if (age < 21) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "Age must be greater than 21 years ")
      } else {
        setCheckError(false)
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else if (name === "DOB" && relationship === "Wife") {
      const age = getAge(value)
      if (age < 18) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "Age must be greater than 18 years ")
      } else {
        setCheckError(false)
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else if (name === "DOB3") {
      const age = getAge(value)
      if (age < 42) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "Please enter correct age.")
      } else {
        setCheckError(false)
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    } else if (name === "DOB4") {
      const age = getAge(value)
      if (age < 42) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        return (errorRef.innerHTML = "Please enter correct age.")
      } else {
        setCheckError(false)
        inputRef.classList.remove("inputError")
        inputRef.classList.add("inputSuccess")
        errorRef.classList.remove("errorRef")
      }
    }
    if (name === "DOB1") {
      if (!employeeData2.child1) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter name of child 1 first"
      }
    }
    if (name === "DOB2") {
      if (!employeeData2.child1) {
        setCheckError(true)
        inputRef.classList.add("inputError")
        inputRef.classList.remove("inputSuccess")
        errorRef.classList.add("errorRef")
        errorRef.innerHTML = "Please enter name of child 2 first"
      }
    }
    setEmployeeData2({ ...employeeData2, [name]: value })
  }

  // on first form submit
  const handleFirstForm = e => {
    e.preventDefault()
    var form1ErrorMsg = document.getElementById("form1ErrorMsg")
    if (!employeeData1.empId || !employeeData1.role || !employeeData1.tempPassword) {
      form1ErrorMsg.style.color = "red"
      return (form1ErrorMsg.innerHTML = "Please fill the form first")
    } else if (employeeData1.empId !== employeeData1.tempPassword) {
      form1ErrorMsg.style.color = "red"
      return (form1ErrorMsg.innerHTML = "Please Enter password same as EMP id")
    } else if (!checkError) {
      form1ErrorMsg.style.display = "none"
      setShowFormNo(2)
    }
  }

  // on second form submit
  const handleSecondForm = async e => {
    e.preventDefault()

    const child1Box = document.querySelector(".child1Box")
    console.log(child1Box.checked)

    const child2Box = document.querySelector(".child2Box")
    console.log(child2Box.checked)

    var form2ErrorMsg = document.getElementById("form2ErrorMsg")
    if (!employeeData2.numberOfMember || !employeeData2.status) {
      form2ErrorMsg.style.color = "red"
      return (form2ErrorMsg.innerHTML = "Please fill the form first")
    }
    if (
      employeeData2.status === "married" &&
      (!employeeData2.NameofSpouse ||
        !employeeData2.relationship ||
        !employeeData2.DOB)
    ) {
      form2ErrorMsg.style.color = "red"
      return (form2ErrorMsg.innerHTML = "Please fill the form first")
    } else if (
      child1Box.checked === true &&
      (!employeeData2.child1 ||
        !employeeData2.child1Gender ||
        !employeeData2.DOB1)
    ) {
      console.log("checked")
      form2ErrorMsg.style.color = "red"
      return (form2ErrorMsg.innerHTML = "Please fill the form first")
    } else if (
      child2Box.checked === true &&
      (!employeeData2.child2 ||
        !employeeData2.child2Gender ||
        !employeeData2.DOB2)
    ) {
      console.log("checked")
      form2ErrorMsg.style.color = "red"
      return (form2ErrorMsg.innerHTML = "Please fill the form first")
    } else if (
      employeeData2.numberOfMember !== "1" &&
      employeeData2.status === "single" &&
      (!employeeData2.NameofFather ||
        !employeeData2.DOB3 ||
        !employeeData2.NameofMother ||
        !employeeData2.DOB4)
    ) {
      form2ErrorMsg.style.color = "red"
      return (form2ErrorMsg.innerHTML = "Please fill the form first")
    } else if (
      employeeData2.numberOfMember === "1" &&
      employeeData2.status === "single" &&
      employeeData2.parents === "father" &&
      (!employeeData2.NameofFather || !employeeData2.DOB3)
    ) {
      form2ErrorMsg.style.color = "red"
      return (form2ErrorMsg.innerHTML = "Please fill the form first")
    } else if (
      employeeData2.numberOfMember === "1" &&
      employeeData2.status === "single" &&
      employeeData2.parents === "mother" &&
      (!employeeData2.NameofMother || !employeeData2.DOB4)
    ) {
      form2ErrorMsg.style.color = "red"
      return (form2ErrorMsg.innerHTML = "Please fill the form first")
    } else {
      const allUserData = {
        ...employeeData1,
        ...employeeData2,
      }
      const a = await createUser(
        allUserData
      )
      console.log(allUserData)
        const { success, message, error, payrollUser } = a
      console.log(a)
      if (success === false) {
        return window.alert(error)
      } else if (!checkError) {
        window.alert(message)
        console.log(payrollUser)
      }
      navigate("/app/superadmin")
    }
  }

  return (
    <Layout>
      <div className="OwnerContainer">
        <div className="row ownerRow">
          <div className="col-lg-3">
            <SideBar />
          </div>
          <div className="col-lg-9 margin wrapper">
            <div className="superAdminFormContainer">
              <div className="row ownerColumn justify-content-center">
                <div className="col-xl-9 col-lg-11 col-md-10">
                  {showFormNo === 1 ? (
                    <div className="formDiv form-1">
                      <h2 className="Detail">Create Employee Account</h2>
                      <hr></hr>
                      <div id="showErrorMsg" className="formErrorMsg"></div>
                      <form>
                        {}
                        <div className="mb-3">
                          <label htmlFor="Role" className="form-label">
                            Role
                          </label>
                          <select
                            className="form-select "
                            required
                            name="role"
                            value={employeeData1.role}
                            onChange={handleFirstFormInput}
                          >
                            
                            <option selected disabled value="">
                              {" "}
                              Role
                            </option>
                            <option value="superAdmin">Super Admin</option>
                            <option value="hrAdmin">Hr Admin</option>
                            <option value="technicalEmployee">
                              Technical Employee
                            </option>
                            <option value="accountEmployee">
                              Account Employee
                            </option>
                            <option value="marketingEmployee">
                              Marketing Employee
                            </option>
                          </select>
                        </div>
                       
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputempID"
                            className="form-label"
                          >
                            Employee ID
                          </label>
                          <input
                            type="text"
                            className="form-control inputFont"
                            id="exampleInputempID"
                            name="empId"
                            value={employeeData1.empId}
                            onChange={handleFirstFormInput}
                          />
                          <h6 className="text-muted mt-1 text-start">
                            Hint : UISPL0016
                          </h6>
                          <p></p>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleInputempID"
                            className="form-label"
                          >
                            Password
                          </label>
                          <div className="">
                            <input
                              type="password"
                              className="form-control inputFont"
                              name="tempPassword"
                              value={employeeData1.tempPassword}
                              onChange={handleFirstFormInput}
                              id="employeePassword"
                            />

                            <h6 className="text-muted mt-1 text-start">
                              Hint : Password must be same as Employee Id
                            </h6>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          onChange={showPasswordFunction}
                          id="showPass"
                        />{" "}
                        <label
                          htmlFor="exampleInputempID"
                          className="form-label"
                        >
                          Show Password
                        </label>
                        <div id="form1ErrorMsg" className="formErrorMsg"></div>
                        <div className="container">
                          <div className="formButtonDiv row justify-content-center">
                            <div className="col-lg-3 col-sm-3 col-md-3">
                              <button
                                type="submit"
                                className="btn btn-primary nextBtn"
                                onClick={handleFirstForm}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                  {showFormNo === 2 ? (
                    <div className="formDiv form-2">
                      <h2 className="Detail"> Family Information </h2>
                      <hr></hr>
                      <form>
                        <div className="Formcontainer">
                          <div className="row">
                            <div className="mb-3 famDiv col-sm">
                              <label
                                htmlFor="exampleInputnoOfMember"
                                className="form-label"
                              >
                                Number of Members
                              </label>
                              <input
                                type="number"
                                className="form-control inputFont"
                                id="exampleInputnumberOfMember"
                                name="numberOfMember"
                                value={employeeData2.numberOfMember}
                                onChange={handleSecondFormInput}
                              />
                            </div>

                            <div className="mb-3 famDiv col-sm">
                              <label
                                htmlFor="exampleInputGender"
                                className="form-label"
                              >
                                Status
                              </label>
                              <div className="famRadioBtn">
                                <input
                                  type="radio"
                                  name="status"
                                  value="married"
                                  id="famInput"
                                  onClick={radioClick}
                                  onChange={handleSecondFormInput}
                                />
                                <label htmlFor="married">Married</label>
                                <input
                                  type="radio"
                                  name="status"
                                  value="single"
                                  id="famInput1"
                                  onClick={radioClick1}
                                  onChange={handleSecondFormInput}
                                />
                                <label htmlFor="single">Single</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="mb-3 famDiv"
                              id="parents"
                              style={{ display: "none" }}
                            >
                              <label htmlFor="singleParent">
                                Please select father or mother
                              </label>
                              <div className="famRadioBtn">
                                <input
                                  type="radio"
                                  name="parents"
                                  className="singleParent"
                                  value="father"
                                  id="famInput2"
                                  onChange={handleSecondFormInput}
                                />
                                <label htmlFor="singlefather">Father</label>
                                <input
                                  type="radio"
                                  className="singleParent"
                                  name="parents"
                                  value="mother"
                                  id="famInput3"
                                  onChange={handleSecondFormInput}
                                />
                                <label htmlFor="singleMother">Mother</label>
                              </div>
                            </div>
                          </div>
                          <div id="spouse">
                            <div className="row">
                              <div className="col-md-4">
                                <div className="mb-3 famDiv">
                                  <label
                                    htmlFor="exampleInputOccupation"
                                    className="form-label"
                                  >
                                    Name of Spouse
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control inputFont"
                                    id="exampleInputNameofSpouse"
                                    name="NameofSpouse"
                                    onKeyDown={spaceBlock}
                                    value={employeeData2.NameofSpouse}
                                    onChange={handleSecondFormInput}
                                  />

                                  <p></p>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3 famDiv">
                                  <label
                                    htmlFor="exampleInputnumberOfPassword"
                                    className="form-label"
                                  >
                                    Relationship
                                  </label>
                                  <select
                                    className="relationClass"
                                    required
                                    value={employeeData2.relationship}
                                    name="relationship"
                                    onChange={handleSecondFormInput}
                                  >
                                    <option hidden value="">
                                      {" "}
                                      Relationship
                                    </option>
                                    <option value="Husband">Husband </option>
                                    <option value="Wife">Wife</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="mb-3 famDiv">
                                  <label
                                    htmlFor="exampleInputDOB"
                                    className="form-label"
                                  >
                                    Date Of Birth
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control inputFont"
                                    id="exampleInputDOB1"
                                    name="DOB"
                                    value={employeeData2.DOB}
                                    onChange={handleSecondFormInput}
                                  />
                                  <p></p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="mb-3 famDiv">
                                <input
                                  type="checkbox"
                                  className="childInfoClick"
                                  id="famInput1"
                                  name="childInfoClick"
                                  value="childInfoClick"
                                  ref={ref2}
                                  onClick={childInfoClick}
                                  onChange={handleSecondFormInput}
                                />
                                <label htmlFor="childInfo">
                                  Child Information
                                </label>
                              </div>
                              <div className="mb-3 famDiv">
                                <div
                                  className="childCheckBox"
                                  id="childCheckBox"
                                >
                                  <input
                                    type="checkbox"
                                    className="child1Box"
                                    id="famInput1"
                                    name="childCheck1"
                                    value="child1"
                                    ref={ref}
                                    onClick={child1Click}
                                    onChange={handleSecondFormInput}
                                  />
                                  <label htmlFor="child1">Child 1</label>
                                  <input
                                    type="checkbox"
                                    id="famInput"
                                    className="child2Box"
                                    name="childCheck2"
                                    value="child2"
                                    ref={ref1}
                                    onClick={child2Click}
                                    onChange={handleSecondFormInput}
                                  />
                                  <label htmlFor="child2">Child 2</label>
                                </div>
                              </div>

                              <div
                                id="children"
                                className="row justify-content-center childrenInfo"
                              >
                                <div className="familyInfo child1" id="child1">
                                  <div className="row">
                                    <div></div>
                                    <div className="mb-3 famDiv col-md-4">
                                      <label
                                        htmlFor="exampleInput Child1"
                                        className="form-label"
                                      >
                                        Name of Child 1
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control inputFont"
                                        id="exampleInputChild1"
                                        name="child1"
                                        onKeyDown={spaceBlock}
                                        value={employeeData2.child1}
                                        onChange={handleSecondFormInput}
                                      />
                                      <p></p>
                                    </div>

                                    <div className="mb-3 famDiv col-md-4">
                                      <label
                                        htmlFor="exampleInputGender"
                                        className="form-label"
                                      >
                                        Gender
                                      </label>
                                      <div className="famRadioBtn">
                                        <input
                                          type="radio"
                                          name="child1Gender"
                                          value="Male"
                                          id="famInput"
                                          onChange={handleSecondFormInput}
                                        />
                                        <label htmlFor="married">Male</label>
                                        <input
                                          type="radio"
                                          name="child1Gender"
                                          value="Female"
                                          id="famInput1"
                                          onChange={handleSecondFormInput}
                                        />
                                        <label htmlFor="single">Female</label>
                                      </div>
                                    </div>
                                    <div className="mb-3 famDiv col-md-4">
                                      <label
                                        htmlFor="exampleInputDOB"
                                        className="form-label"
                                      >
                                        Date Of Birth
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control inputFont"
                                        id="exampleInputDOB1"
                                        name="DOB1"
                                        value={employeeData2.DOB1}
                                        onChange={handleSecondFormInput}
                                      />
                                      <p></p>
                                    </div>
                                  </div>
                                </div>
                                <div className="familyInfo child2 " id="child2">
                                  <div className="row">
                                    <div className="mb-3 famDiv col-sm">
                                      <label
                                        htmlFor="exampleInputChild2"
                                        className="form-label"
                                      >
                                        Name of Child 2
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control inputFont"
                                        id="exampleInputChild2"
                                        name="child2"
                                        onKeyDown={spaceBlock}
                                        value={employeeData2.child2}
                                        onChange={handleSecondFormInput}
                                      />
                                      <p></p>
                                    </div>
                                    <div className="mb-3 famDiv col-sm">
                                      <label
                                        htmlFor="exampleInputGender"
                                        className="form-label"
                                      >
                                        Gender
                                      </label>
                                      <div className="famRadioBtn">
                                        <input
                                          type="radio"
                                          name="child2Gender"
                                          value="Male"
                                          id="famInput"
                                          onChange={handleSecondFormInput}
                                        />
                                        <label htmlFor="married">Male</label>
                                        <input
                                          type="radio"
                                          name="child2Gender"
                                          value="Female"
                                          id="famInput1"
                                          onChange={handleSecondFormInput}
                                        />
                                        <label htmlFor="single">Female</label>
                                      </div>
                                    </div>
                                    <div className="mb-3 famDiv col-sm">
                                      <label
                                        htmlFor="exampleInputDOB"
                                        className="form-label"
                                      >
                                        Date Of Birth
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control inputFont"
                                        id="exampleInputDOB2"
                                        name="DOB2"
                                        value={employeeData2.DOB2}
                                        onChange={handleSecondFormInput}
                                      />
                                      <p></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="newDiv">
                            <div className="row" id="parent">
                              <div className="mb-3 famDiv col-md-6 fatherDiv">
                                <label
                                  htmlFor="exampleInputOccupation"
                                  className="form-label"
                                >
                                  Name of Father
                                </label>
                                <input
                                  type="text"
                                  className="form-control inputFont"
                                  id="exampleInputNameofFather"
                                  name="NameofFather"
                                  onKeyDown={spaceBlock}
                                  value={employeeData2.NameofFather}
                                  onChange={handleSecondFormInput}
                                />
                                <p></p>
                              </div>
                              <div className="mb-3 famDiv col-md-6 fatherDiv">
                                <label
                                  htmlFor="exampleInputDOB"
                                  className="form-label"
                                >
                                  Date Of Birth
                                </label>
                                <input
                                  type="date"
                                  className="form-control inputFont"
                                  id="exampleInputDOB1"
                                  name="DOB3"
                                  value={employeeData2.DOB3}
                                  onChange={handleSecondFormInput}
                                />
                                <p></p>
                              </div>
                            </div>
                            <div className="row" id="parent">
                              <div className="mb-3 famDiv col-md-6 motherDiv">
                                <label
                                  htmlFor="exampleInputOccupation"
                                  className="form-label"
                                >
                                  Name of Mother
                                </label>
                                <input
                                  type="text"
                                  className="form-control inputFont"
                                  id="exampleInputNameofMother"
                                  name="NameofMother"
                                  onKeyDown={spaceBlock}
                                  value={employeeData2.NameofMother}
                                  onChange={handleSecondFormInput}
                                />
                                <p></p>
                              </div>
                              <div className="mb-3 famDiv col-md-6 motherDiv">
                                <label
                                  htmlFor="exampleInputDOB"
                                  className="form-label"
                                >
                                  Date Of Birth
                                </label>
                                <input
                                  type="date"
                                  className="form-control inputFont"
                                  id="exampleInputDOB1"
                                  name="DOB4"
                                  value={employeeData2.DOB4}
                                  onChange={handleSecondFormInput}
                                />
                                <p></p>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div className="container">
                            <div
                              id="form2ErrorMsg"
                              className="formErrorMsg"
                            ></div>
                            <div className="formButtonDiv row justify-content-center">
                              <div className="col-lg-3 col-sm-3 col-md-3">
                                <button
                                  className="btn btn-primary nextBtn "
                                  onClick={() => setShowFormNo(1)}
                                >
                                  Previous
                                </button>
                              </div>
                              <div className="col-lg-3 col-sm-3  col-md-3">
                                <button
                                  type="submit"
                                  className="btn btn-primary nextBtn"
                                  onClick={handleSecondForm}
                                >
                                  Finish
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* </div>
                  </div> */}
                  {/* </section> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Superadmin
