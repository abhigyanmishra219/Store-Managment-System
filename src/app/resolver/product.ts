//@ts-nocheck
import { ProductCategory } from "../../../generated/prisma";
import prismaclient from "../services/prisma";

export async function addProduct(_:any,args:{
  title:       String,
  description: String,
  category:    ProductCategory,
  price:       number,
  stock:       number,
  
})
{
    try{
        const createProduct=await prismaclient.product.create({
            data:args
        })
        return createProduct
    }
    catch(error:any)
    {
        console.log("error in product ",error.message)
        return null
    }
}
export async function getAllProducts()
{
 
  try{
    const product=await prismaclient.product.findMany()
    return product
  }
  catch(error)
  {
    console.log("error in fetching product",error.message)
    return null
  }
}
export async function getProduct(_:any,args:{
  id:string
})
{
  const id=args.id;
  try{
    const product=await prismaclient.product.findUnique({
      where:{
      id
      },
      include:{
        sale:true
      }
    })
    console.log(sale)
    if(product)
    {
      return product
    }
    return null
  }
  catch(error)
  {
    console.log("error",error.message)
    return null
  }
}
export async function createSale(_:any,args:{
  id:string,
  quantity:number
})
{
  try{
    const sale=await prismaclient.sale.create({
      data:{
        productId:args.id,
        quantity:args.quantity
      }
    })
    if(sale)
    {
      await prismaclient.product.update({
        where:{
          id:args.id
        },
        data:{
          stock:{
            decrement:args.quantity
          }
        }
      })
    }
    return true
  }catch(err)
  {
    return false
  }
}