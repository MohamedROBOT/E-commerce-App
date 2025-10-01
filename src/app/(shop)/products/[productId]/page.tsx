import AddtoCartBtn from "@/components/products/AddtoCartBtn";
import ProductSwiper from "@/components/products/ProductSwiper";
import MainContainer from "@/components/shared/MainContainer";
import { renderStars } from "@/components/shared/review";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import AddWishlistBtn from "@/components/wishlist/AddWishlistbtn";
import { IProduct } from "@/interfaces/products.interface";
import { getProductDetails } from "@/services/products.service";
import { RefreshCcw, TruckIcon } from "lucide-react";
import React from "react";

export default async function ProductDetails({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );



  return (
    <MainContainer>
      <SectionTitle title="Product Overview" subtitle={product.title} />

      <div className="grid grid-cols-1 gap-17.75   md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProductSwiper product={product} />
        </div>
        <div className="lg-col-span-1">
          <div className="flex flex-col gap-y-4 border-b border-gray-400 pb-4">
            <h2 className="text-2xl font-semibold">{product.title}</h2>

            <div className="flex items-center text-gray-400 text-sm gap-x-2  ">
              <span>{renderStars(product.ratingsAverage)} </span>
              <span>({product.ratingsQuantity} Reviews)</span>
              <span>|</span>
              <span className="text-green-400">in stock</span>
            </div>
            <span className="font-medium text-2xl">${product.price}</span>
            <p className="text-sm font-medium">{product.description}</p>
          </div>

          <div className="pt-4">
            <div className="flex items-center gap-x-2">
             <AddtoCartBtn className="grow-1" variant={"destructive"} productId={product._id}/>
              <Button variant={"ghost"} className="border cursor-pointer border-gray-400 p-2 rounded-sm">
                 <AddWishlistBtn productId={product._id} />
              </Button>
            </div>
          </div>
          <div className="pt-10">
            <div className="flex items-center p-3 border  border-gray-400 gap-x-4">
             <TruckIcon size={40}/>
             <div>
              <span className="font-semibold mb-2">Free Delivery</span>
              <p className="text-sm">Enter your postal code for Delivery Availability</p>
             </div>
            </div>
          </div>
          <div >
            <div className="flex items-center p-3 border  border-gray-400 gap-x-4">
             <RefreshCcw size={40} />
             <div>
              <span className="font-semibold mb-2">Return Delivery</span>
              <p className="text-sm">Free 30 Days Delivery Returns. Details</p>
             </div>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
