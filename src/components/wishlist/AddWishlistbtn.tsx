"use client";
import { useWishlist } from "@/context/WishlistContext";
import { addToWishlist } from "@/services/wishlist-service";
import { Heart } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function AddWishlistBtn({ productId }: { productId: string }) {
  const { wishlistDetails, getWishlistDetails } = useWishlist();

  // Check if product is already in wishlist
  const isInWishlist = wishlistDetails?.data?.some(
    (item) => item._id === productId
  );

  async function addProductToWishlist(productId: string) {
    const response = await addToWishlist(productId);

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
    <span
      onClick={() => addProductToWishlist(productId)}
      className={`cursor-pointer bg-white rounded-full p-1 ${
        isInWishlist ? " text-red-500" : ""
      }`}>
      <Heart size={16} fill={isInWishlist ? "red" : "none"} />
    </span>
  );
}
