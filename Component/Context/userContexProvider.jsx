import UserContext from "./userContext";
import { useState } from "react";

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState()
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider