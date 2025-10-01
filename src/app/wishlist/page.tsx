"use client"
import AddtoCartBtn from "@/components/products/AddtoCartBtn";
import MainContainer from "@/components/shared/MainContainer";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { removeFromWishlist } from "@/services/wishlist-service";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";


export default function WishlistPage() {
  const { wishlistDetails, getWishlistDetails } = useWishlist();

  async function removeItemFromWishlist(productId: string) {
    const response = await removeFromWishlist(productId);
    if (response.success) {
      toast.success(response.message, {
        position: "top-center",
      });
      getWishlistDetails();
      
    } else {
      toast.error(response.message || "something went wrong", {
        position: "top-center",
      });
    }
  }

  return (
    <MainContainer>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-33'>
        {
          wishlistDetails ? <>
          {wishlistDetails?.data?.map((product) => {
           return <div key={product._id} className='relative'>
          <picture className='flex group mb-4 bg-gray-200 relative flex-col justify-center items-center overflow-hidden'>
            <Image
              src={
                product?.imageCover
              }
              alt={product.title}
              width={200}
              height={200}
            />
            <AddtoCartBtn
            productId = {product._id}
              className='w-full transition-all duration-300  absolute -bottom-10 rounded-none rounded-b-lg invisible group-hover:visible group-hover:bottom-0'
              variant={"default"}
            />
          </picture>
          <div>
            <h3 className='font-medium line-clamp-1 mb-2'>{product.title}</h3>

            <span className='font-medium text-red-600'>{product.price}$</span>
          </div>
          <div className='absolute top-2 end-2 flex flex-col justify-center items-center gap-y-2'>
            <span onClick={
              () => removeItemFromWishlist(product._id)
            } className='cursor-pointer bg-white rounded-full p-1'>
              <Trash size={16} />
            </span>
          </div>
        </div>
          })}
          
          </> : <>
          <div className='flex flex-col gap-y-6 items-center justify-center'>
          <h2 className='text-3xl font-bold'>Your Wishlist is empty</h2>
          <Button
            asChild
            className='cusrsor-pointer text-xl py-6'
            variant={"destructive"}>
            <Link href='/products'>Return to Shop</Link>
          </Button>
        </div>
          </> 
        }
      </div>
    </MainContainer>
  );
}
