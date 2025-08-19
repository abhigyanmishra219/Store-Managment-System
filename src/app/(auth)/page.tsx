"use client"
import { useContext } from "react";
import Admin from "../components/admin-dashboard";
import { UserContext } from "../components/context/user-context";


export default function page()
{
    const {user}=useContext(UserContext)


  return(
    <>  
      {user?.role && <Admin/>}
     
    </>
  )
}