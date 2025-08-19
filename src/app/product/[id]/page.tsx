"use client"

import AddSaleButton from "@/app/components/addsalebutton";
import { GET_PRO_DETAILS } from "@/app/gql/queries";
import { gqlClient } from "@/app/services/gql";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../../../../generated/prisma";
import ProductSaleChart from "@/app/components/product-sale-chart";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProductDetails() {
      setLoading(true);
      const data: { getProduct: Product } = await gqlClient.request(GET_PRO_DETAILS, { id });
      if (data.getProduct) {
        setProduct(data.getProduct);
      }
      setLoading(false);
    }
    getProductDetails();
  }, [id]);
  const chartData=product?.sales?.map((sale)=>{
      const date=new Date(Number.parseInt(sale.createdAt))
      const format=date?.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
     const quantity=sale.quantity;
     const obj={
        date:format,
        quantity
     }
     return obj
  })||[]
  console.log(chartData)
  return (
    <div className="max-w-4xl mx-auto p-4">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-neutral-700 rounded w-1/3 mb-4"></div>
          <div className="h-96 bg-neutral-800 rounded mb-4"></div>
          <div className="h-4 bg-neutral-700 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-neutral-700 rounded w-1/2"></div>
        </div>
      ) : (
        product && (
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Product Image */}
            <div className="bg-neutral-900 rounded-lg overflow-hidden flex justify-center items-center">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-contain w-full h-full max-h-[500px]"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">{product.title}</h1>
              <p className="text-neutral-400">{product.description}</p>
               <p className="text-neutral-400">{product.stock}</p>
              <p className="text-lg font-bold">₹{product.price}</p>
              <AddSaleButton product={product} />
              <div className="w-100 h-100">
              <ProductSaleChart data={chartData}/>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
