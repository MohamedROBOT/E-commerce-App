"use client"
import { addToCart } from "@/services/cart.service";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export default function AddtoCartBtn({
  productId,
  ...props
}: { productId: string ; 

    [key: string]: string
}
 ) {
  const {  getCartDetails } = useCart();

  async function addProductToCart(productId: string) {
    const response = await addToCart(productId);

    if (response.success) {
      toast.success("Added to cart successfully", { position: "top-center" });
      getCartDetails();
    } else {
      toast.error(response.message || "something went wrong", { position: "top-center" });
    }
  }

  return (
    <Button onClick={() => addProductToCart(productId)} {...props}>
      Buy Now
    </Button>
  );
}
