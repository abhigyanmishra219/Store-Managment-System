import { Button, Card, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";

export default function SignUpForm() {
  return (
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
       
      style={{
        height:36
      }} className="w-96 mb-5" placeholder="Enter Name"/>
      <TextField.Root
      
      style={{
        height:36
      }}
      className="w-96 mb-5" placeholder="Enter Email"/>
      <TextField.Root
      
      style={{
        height:36
      }}
      className="w-96 mb-5" placeholder="Enter UserName"/>
      <TextField.Root
      
      style={{
        height:36
      }}
      className="w-96 mb-5" placeholder="Enter Password"/>
      <TextField.Root
      
      style={{
        height:36
      }}
      className="w-96 mb-5" placeholder="Enter Role"/>
      <Button style={{width:"100%"}}>
        <Text>
           Sign Up
        </Text>
      </Button>
     </Card>
    </div>
  );
}
