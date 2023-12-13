import UserContext from "./userContext";
import { useState } from "react";

const UserContextProvider = ({ children }) => {
    const [loginUser, setLoginUser] = useState()
    return (
        <UserContext.Provider value={{loginUser, setLoginUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider