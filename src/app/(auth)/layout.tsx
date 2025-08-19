import { ReactNode } from "react";
import { getUserFromCookies } from "../services/helper";
import { redirect } from "next/navigation";
import UserProvider, { UserContext } from "../components/context/user-context";
import Header from "../components/header";



export default async function Layout({
    children
}:{
    children:ReactNode
}){
    const user=await getUserFromCookies()
    if(!user)
    {
        redirect("/login ")
    }
    return (
        <>
        <UserProvider user={user}>
            <Header/>
        {children}
        </UserProvider>
        </>
    )
}