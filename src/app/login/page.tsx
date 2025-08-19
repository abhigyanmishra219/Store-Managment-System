"use client"
import { Button, Card, Heading, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { gqlClient } from "../services/gql";
import { Login_USER } from "../gql/queries";

export default function Home() {
  const [usercred, setusercred] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState({})
  const [loading, setloading] = useState(false)
  async function handlelogin()
  {
     seterror({})
     setloading(true)
     try{
        const data:{loginUser:boolean}=await gqlClient.request(Login_USER,{
          userCred:usercred,
          password
        })
        if(data.loginUser)
        {
          alert("login done")
          window.location.href="http://localhost:3000"
        }
        else{
          seterror({
            message:"something went wrong"
          })
        }
     }
     catch(error:any)
     {
      console.log("error in login",error.message)
     }
  }
  return (
  <>
  <div className="h-screen flex justify-center items-center ">
     <Card style={{
      display:"flex",
      flexDirection:"column",
      alignItems:"center"
     }}>
      <div className="relative h-16 w-16 rounded-full mb-5">
        <Image
         fill src={"https://cdn-icons-png.flaticon.com/512/12474/12474329.png"}
         alt="Store Management Logo"
        />
      </div>
      <TextField.Root 
       value={usercred}
       onChange={(e)=>setusercred(e.target.value)}
      style={{
        height:36
      }} className="w-96 mb-5" placeholder="Username OR Email"/>
      <TextField.Root
      value={password}
      onChange={(e)=>setpassword(e.target.value)}
      style={{
        height:36
      }}
      className="w-96 mb-5" placeholder="password"/>
      <Button onClick={handlelogin}style={{width:"100%"}}>
        <Text>
           Log In
        </Text>
      </Button>
     </Card>
    </div>
  </>
  );
}
