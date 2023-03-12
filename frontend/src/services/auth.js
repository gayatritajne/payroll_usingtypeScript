
export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  if (username === `praptigomekar` && password === `prapti@123`) {
    return setUser({
        username: `praptigomekar`,
        name: `Prapti Gomekar`,
        email: `praptigomekar@uvxcel.com`,
        EmpId: `1`,
    })
} else if (username === `mayuridudhe` && password === `mayuri@123`) {
    return setUser({
        username: `mayuridudhe`,
        name: `Mayuri Dudhe`,
        email: `mayuridudhe@uvxcel.com`,
        EmpId: `3`,
    })
} else if (username === `gayatritajane` && password === `gayatri@123`) {
    return setUser({
        username: `gayatritajane`,
        name: `Gayatri Tajane`,
        email: `gayatritajane@uvxcel.com`,
        EmpId: `2`,
    })

  } else if (username === `admin` && password === `pass`) {
    return setUser({
      username: `admin`,
      name: `Admin`,
      email: `admin@example.org`,
      EmpId: `0`,
    })
  } else {
    
      alert("Wrong password");
  } 
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}
