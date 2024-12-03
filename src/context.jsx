import { createContext, useContext, useState } from "react";


let AuthContext = createContext()

export const AuthConProvider = ({children})=>{


    let [usercon,setusercon] = useState(
        {isLoggedIn:false, userdata:[]}
    )
    console.log(usercon);
    


return <AuthContext.Provider value={{  usercon, setusercon}}>
    {children}
</AuthContext.Provider>

}

// to use usecontext

export let useAuth = ()=> useContext(AuthContext)