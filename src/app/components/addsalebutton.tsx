"use client"
import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { gqlClient } from "../services/gql";
import { CREATE_SALE } from "../gql/queries";

export default function AddSaleButton({product})
{
    const [quantity, setquantity] = useState(1)
    async function handleSubmit()
    {
        if(product.stock<quantity)
        {
            alert("sale quantity cannot be more than avl.stock")
        }
        try{
            const data=await gqlClient.request(CREATE_SALE,{
                id:product.id,
                quantity
            })
            if(data?.createSale)
            {
                alert("success")
            }
        }catch(err)
        {
            console.log(error.message)
        }
    }
    return(
        <div>
            <input value={quantity} onChange={e=>setquantity(Number.parseInt(e.target.value))}/>
            <Button onClick={handleSubmit}>Add sale</Button>
        </div>
    )
}