const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}

const logIn = () => {
    return {
        type: "LOG_IN"
    }
}
const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    setUser,
    logIn,
    logOut
} 