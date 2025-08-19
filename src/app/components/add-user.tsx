"use client"
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { gql } from "graphql-request";
import { useState } from "react";
import { gqlClient } from "../services/gql";
import { User } from "../../../generated/prisma";
const CREATE_USER=gql`
mutation Mutation($name: String!, $email: String!, $username: String!, $password: String!, $role: String!) {
  createUser(name: $name, email: $email, username: $username, password: $password, role: $role) {
    name
    id
    email
    username
    avatar
    role
}}
`

export default function AddUser()
{
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [username, setusername] = useState("")
    const [role, setrole] = useState("staff")
    async function handleadd()
    {
        try{
          const data:{createUser:User}=await gqlClient.request(CREATE_USER,{
			name,email,username,password,role
		  })
		  if(data.createUser)
		  {
			alert("Member Added")
			setname("")
			setemail("")
			setpassword("")
			setusername("")
			setrole("staff")
		  }
        }
        catch(error:any)
        {
             console.log("error is",error.message)
        }
    }
    return(
        <>
        <Dialog.Root>
	<Dialog.Trigger>
		<Button>ADD MEMBER</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Edit profile</Dialog.Title>
		<Dialog.Description size="2" mb="4">
			Make changes to your profile.
		</Dialog.Description>

		<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Name
				</Text>
				<TextField.Root
					value={name}
                    onChange={(e)=>setname(e.target.value)}
					placeholder="Enter your full name"
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Email
				</Text>
				<TextField.Root
					value={email}
                    onChange={(e)=>setemail(e.target.value)}
					placeholder="Enter your email"
				/>
			</label>
            <label>
				<Text as="div" size="2" mb="1" weight="bold">
				  Password
				</Text>
				<TextField.Root
					value={password}
                    onChange={(e)=>setpassword(e.target.value)}
					placeholder="Enter Password"
				/>
			</label>
            <label>
				<Text as="div" size="2" mb="1" weight="bold">
					UserName				
                </Text>
				<TextField.Root
				    value={username}
                    onChange={(e)=>setusername(e.target.value)}
					placeholder="Enter Username"
				/>
			</label>
            <Select.Root value={role} onValueChange={(value)=>setrole(value)}>
	<Select.Trigger />
	<Select.Content>
		<Select.Group>
			<Select.Label>Roles:</Select.Label>
			<Select.Item value="manager">Manager</Select.Item>
			<Select.Item value="staff">Staff</Select.Item>
		</Select.Group>
		<Select.Separator />
		
	</Select.Content>
</Select.Root>

		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handleadd}>Save</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

        </>
    )
}