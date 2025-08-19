"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../../generated/prisma";
import { gqlClient } from "../services/gql";
import { GET_PRODUCT } from "../gql/queries";
import Link from "next/link";

export default function Container() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProduct() {
      try {
        const data: { getAllProducts: Product[] } = await gqlClient.request(
          GET_PRODUCT
        );
        setProducts(data?.getAllProducts || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    getProduct();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          {/* Fixed aspect ratio container */}
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded"
            />
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <Link href={"/product/" + product.id}>
              <div>
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm line-clamp-2">{product.description}</p>
                <p className="text-sm mt-1">Category: {product.category}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-1">
                <span className="text-xl font-bold text-green-600">
                  ₹{product.price}
                </span>
                <span className="text-sm">Stock: {product.stock}</span>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
