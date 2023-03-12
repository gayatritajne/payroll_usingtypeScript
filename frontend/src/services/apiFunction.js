import axios from "axios"

// login function
export const getLogin = async userData => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post("/api/v2/login", userData, config)
    return data
  } catch (error) {
    return error.response.data
  }
}
// change password

export const createNewPassword = async userData => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }

    const { data } = await axios.put(
      "/api/v2/payroll/user/password/new",
      userData,
      config
    )
    return data
  } catch (error) {
    return error.response.data
  }
}

// check user valid our not
export const loadUser = async () => {
  try {
    const { data } = await axios.get("/api/v2/me")
    console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}
//logout function
export const logoutUser = async () => {
  try {
    const { data } = await axios.get("/api/v2/logout")
    return data
  } catch (error) {
    return error.response.data
  }
}

// user basic details {hrAdmin}
export const getAdminData = async () => {
  try {
    const { data } = await axios.get("/api/v2/admin/data")
    return data
  } catch (error) {
    return error.response.data
  }
}

// user attendance data
export const getUserData = async (month, year) => {
  let api
  if (month) {
    api = `/api/v2/user/data?month=${month}&year=${year}`
  } else {
    api = `/api/v2/user/data`
  }
  try {
    const { data } = await axios.get(api)
    return data
  } catch (error) {
    return error.response.data
  }
}

//create user {super admin}
export const createUser = async userData => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/user/create",
      userData,
      config
    )
    return data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

// add many user {super admin}
export const createManyUser = async userData => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/many-user/create",
      userData,
      config
    )
    return data
  } catch (error) {
    return error.response.data
  }
}

//all user data (super Admin)
export const allUserData = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/all")
    return data
    // console.log(data)
  } catch (error) {
    return error.response.data
  }
}

//Create CTC(Owner login)
export const createCtcData = async ctcdata => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/ctc/create",
      ctcdata,
      config
    )
    console.log("Display CTC all data.")
    console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}

//Confirm emp

export const createConfirmEmp = async confirmempdata => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post(
      "/api/v2/payroll/confirmCandidate/create",
      confirmempdata,
      config
    )
    console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}

//To show the candidates list to the Owner on Candidate selection page
export const getOwnerData = async () => {
  try {
    const { data } = await axios.get("/api/v2/owner/data")
    return data
  } catch (error) {
    return error.response.data
  }
}


//user ctc (employee)
export const getMyCTC = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/ctc")
    return data
    console.log(data)
  } catch (error) {
    return error.response.data
  }
}

//Upload Candidate Information and Save to database(hr Admin login)
export const uploadCandiInfo = async (candiInfo) => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post("/api/v2/payroll/candidate/all", candiInfo, config)
    console.log("Display Candidates all information.")
    console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}


//get allctc (owner)
export const getAllCTC = async () => {
  try {
    const { data } = await axios.get("/api/v2/payroll/user/all/ctc")
    //console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}

// Edit employee status 
export const editEmpStatus = async (id, userData) => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.put(`/api/v2/edit-emp/${id}`, userData, config)
    console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}
// Edit candidate status 
export const editCandiStatus = async (id, userData) => {
  console.log(id, userData)
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.put(`/api/v2/edit-candi/${id}`, userData, config)
    console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}

// Edit candidate status 
export const editRejectCandiInfo = async (id, userData) => {
  console.log(id, userData)
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.put(`/api/v2/edit-rejectcandi/${id}`, userData, config)
    console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}

//To show the employee list 
export const getAllPfEmpData = async () => {
  try {
    const { data } = await axios.get("/api/v2/pfEmp/data")
    console.log(data);
    return data
  } catch (error) {
    return error.response.data
  }
}

//Upload employee Information and Save to database(hr Admin login)
export const uploadPfEmpInfo = async (empInfo) => {
  try {
    const config = { Headers: { "Content-Type": "application/json" } }
    const { data } = await axios.post("/api/v2/payroll/pfEmployee/all", empInfo, config)
    console.log("Display all employee pf information.")
    console.log(data)
    return data
  } catch (error) {
    return error.response.data
  }
}