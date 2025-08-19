"use client"


import { createContext, ReactNode } from "react"
import { RoleType, User } from "../../../../generated/prisma"

type userwithoutpassword={
    name:string,
    email:string,
    username:string,
    avatar:string | null,
    role:RoleType
}
export const UserContext=createContext<
  {user?:userwithoutpassword}>({})
  
export default function UserProvider({
    children,
    user
}:{children:ReactNode,user:userwithoutpassword})
{
    return(
        <>
       
          <UserContext.Provider value={{
            user
          }}>
             {children}
          </UserContext.Provider>
        
        </>
    )
}