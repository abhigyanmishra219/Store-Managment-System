"use client"
import { Button, Dialog, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { gql } from "graphql-request";
import { useState } from "react";
import { gqlClient } from "../services/gql";
import { Product } from "../../../generated/prisma";
const ADD_PRODUCT=gql`
mutation Mutation($title: String!, $description: String!, $category: String!, $price: Float!, $stock: Int!, $imageUrl: String!) {
  addProduct(title: $title, description: $description, category: $category, price: $price, stock: $stock, imageUrl: $imageUrl) {
    title
    description
    id
    category
    price
    stock
    imageUrl
  }
}

`
export default function AddProduct()
{
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState(0)
    const [stock, setstock] = useState(1)
    const [imageUrl, setimageUrl] = useState("")
    const [category, setcategory] = useState("other")
    async function handleAddProduct()
    {
        try{
          const data:{addProduct:Product}=await gqlClient.request(ADD_PRODUCT,{
            title,
            description,
            category,
            price: parseFloat(price),
            stock: parseInt(stock),
            imageUrl
          })
          if(data.addProduct)
          {
            alert("product added")
          }
          else{
            alert("not")
          }
        }
        catch(err){
            console.log("error",err.message)
          alert("something went wrong")
        }
    }
    return(
        <>
          <Dialog.Root>
	<Dialog.Trigger>
		<Button>Add Product</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>Add Product</Dialog.Title>
		<Dialog.Description size="2" mb="4">
			
		</Dialog.Description>

		<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Title
				</Text>
				<TextField.Root
				    value={title}
                    onChange={(e)=>settitle(e.target.value)}
					placeholder="Enter Title Of The Product"
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Description
				</Text>
				<TextField.Root
				    value={description}
                    onChange={(e)=>setdescription(e.target.value)}
					placeholder="Enter Description of product"
				/>
			</label>
            <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Price
				</Text>
				<TextField.Root
				    value={price}
                   onChange={(e) => setprice(Number.parseFloat(e.target.value))}
					placeholder="Enter Price Of The Product"
				/>
			</label>
            <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Stock
				</Text>
				<TextField.Root
				    value={stock}
                    onChange={(e)=>setstock(Number.parseInt(e.target.value))}
					placeholder="Stock"
				/>
			</label>
            <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Image Url
				</Text>
				<TextField.Root
				   value={imageUrl}
                    onChange={(e)=>setimageUrl(e.target.value)}
					placeholder="Enter  Image Url of Product"
				/>
			</label>
            <Select.Root value={category} onValueChange={(value)=>setcategory(value)}>
	<Select.Trigger />
	<Select.Content>
		<Select.Group>
			<Select.Label>Category</Select.Label>
			<Select.Item value="electronics">Electronics</Select.Item>
			<Select.Item value="beauty">Beauty</Select.Item>
			<Select.Item value="food">Food</Select.Item>
            <Select.Item value=" accessories">Accessories</Select.Item>
            <Select.Item value=" clothing">Clothing</Select.Item>
            <Select.Item value="furniture">Furniture</Select.Item>
            <Select.Item value="decor">Decor</Select.Item>
            <Select.Item value="other">Other</Select.Item>
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
				<Button onClick={handleAddProduct}>Save</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

        
        </>
    )
}