//@ts-nocheck
import { cookies } from "next/headers";
import { generateToken } from "../services/jwt";
import prismaclient from "../services/prisma";
import {  getUserFromCookies } from "../services/helper";
import { RoleType } from "../../../generated/prisma";
import { ifError } from "assert";
import { collectSegmentData } from "next/dist/server/app-render/collect-segment-data";

export async function Login(
  _: any,
  args: {
    userCred: string;
    password: string;
  }
){
  try {
    const currentuser=await getUserFromCookies()
   /* if(!currentuser)
    {
        return null
    }
    if(currentuser.role!="admin")
    {
        return null
    }*/
    const cookiesStore=cookies()
    const user = await prismaclient.user.findFirst({
      where: {
        OR:[
          {
            email:args.userCred
          },
          {
            username: args.userCred,
          }
        ]
         
      },
    });
    console.log(user)
     if(!user)
     {return false}
     if(user.password==args.password)
     {
       const token=generateToken({id:user.id})
       cookiesStore.set("token",token)
       return true
     }
     else{
        return false
     }
     } catch (err) {
    console.log(err.message);
     return false
  }
}
export async function createUser(_:any,args:{
    name:string,
    email:string,
    username:string,
    password:string,
    role:RoleType
}){
    try{
       const currentuser=await getUserFromCookies()
    if(!currentuser)
    {
        return null
    }
    if(currentuser.role!="admin")
    {
        return null
    }
         const user=await prismaclient.user.create({
            data:args
         })
         return user
    }
    catch(error)
    {
        console.log(error.message)
        return null
    }
}
export async function updateUserRole(_:any,args:{
    userId:string,
    role:RoleType
}){
    try{
        const user= await getUserFromCookies()
        if(user?.role!="admin")
        {
            return false
        }
    const upadteUser=await prismaclient.user.update({
        where:{
            id:args.userId
        },
        data:{
            role:args.role
        }

    })
    if(upadteUser)
    return true
    }
    catch(error)
    {
        console.log(error.message)
        return false
    }
}
export async function UpdateUserProfile(_:any,args:{
    name:string,
    username:string,
    email:string,
    avatar:string,
    userId:string
})
{
    try{
      const user=await getUserFromCookies()
      const datatosave={
        name:args.name,
        email:args.email,
        avatar:args.avatar,
        username:args.username
      }
      if(user?.role!='admin' && user?.id!=args.userId)
      {
        return false
      }
      const Updaterofile=await prismaclient.user.update({
        where:{
            id:args.userId
        },
        data:datatosave
      })
      return true
    }
    catch(error)
    {
       console.log(error.message)
       return false
    }
}
export async function getAllUsers()
{
 
  try{
    const users=await prismaclient.user.findMany({
      where:{
         role:{
          not:"admin"
         }
      }
    })
    return users
  }
  catch(error)
  {
    console.log("error in fetching users",error.message)
    return null
  }
}