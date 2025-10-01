"use client";
import MainContainer from "@/components/shared/MainContainer";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { removeFromCart, removeUserCart, updateItemQtyCart } from "@/services/cart.service";
import { toast } from "sonner";
export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();

  async function removeCartItems() {
    const response = await removeUserCart();
    if (response?.message === "success") {
      toast.success(response.message, {
        position: "top-center",
      });
      setCartDetails(null);
    } else {
      toast.error(response?.message || "something went wrong", {
        position: "top-center",
      });
    }
  }

  async function removeProductFromCart(ProductId: string) {
    const response = await removeFromCart(ProductId);

    if (response.success) {
      toast.success(response.message, {
        position: "top-center",
      });
      setCartDetails(response.data);
    } else {
      toast.error(response.message || "something went wrong", {
        position: "top-center",
      });
    }
  }
  async function updateProductQty(ProductId: string, count: number) {
    const response = await updateItemQtyCart(ProductId, count);

    if (response.success) {
      toast.success(response.message, {
        position: "top-center",
      });
      setCartDetails(response.data);
    } else {
      toast.error(response.message || "something went wrong", {
        position: "top-center",
      });
    }
  }

  
  return (
    <MainContainer>
      {cartDetails?.data?.products.length ? (
        <div className='flex flex-col gap-y-6'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className='text-right'>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartDetails.data.products.map((product) => {
                return (
                  <TableRow key={product._id}>
                    <TableCell className='font-medium'>
                      <div className='flex items-center gap-5'>
                        <div className='relative'>
                          <Image
                            width={54}
                            height={54}
                            src={product.product.imageCover}
                            alt={product.product.title}
                          />
                          <X
                            onClick={() =>
                              removeProductFromCart(product.product._id)
                            }
                            className='absolute cursor-pointer size-4 -top-1 -start-1 text-white bg-red-500 rounded-full '
                          />
                        </div>
                        <h2>{product.product.title}</h2>
                      </div>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                     <div className="flex items-center gap-x-2">
                       <Button onClick={()=> updateProductQty(product.product._id, product.count + 1)} variant={"outline"}>+</Button>
                      {product.count}
                      <Button onClick={()=> updateProductQty(product.product._id, product.count - 1)} variant={"outline"}>-</Button>
                     </div>
                    </TableCell>
                    <TableCell className='text-right'>
                      {product.price * product.count}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className='flex justify-between'>
            <Button variant={"outline"}>
              <Link href='/products'>Return to Shop</Link>
            </Button>
            <Button onClick={removeCartItems} variant={"destructive"}>
              Remove All
            </Button>
          </div>
          <div className='flex flex-col lg:flex-row lg:justify-between gap-y-6'>
            <div className='flex items-center justify-between row gap-x-4 lg:w-5/12'>
              <Input placeholder='Coupon Code' />
              <Button variant={"destructive"}>Apply Coupon</Button>
            </div>
            <div className='lg:w-5/12 py-8 px-6 border border-gray-950 rounded'>
              <h3 className='font-bold mb-6 text-xl'>Cart Total</h3>

              <ul className='divide-y divide-gray-950'>
                <li className='py-6 flex justify-between'>
                  <span>Subtotal:</span>
                  <span>{cartDetails.data.totalCartPrice}</span>
                </li>
                <li className='py-6 flex justify-between'>
                  <span>Shipiing:</span>
                  <span>Free</span>
                </li>
                <li className='py-6 flex justify-between'>
                  <span>Total:</span>
                  <span>{cartDetails.data.totalCartPrice}</span>
                </li>
              </ul>

              <div className='flex justify-center items-center'>
                <Button asChild variant={"destructive"}>
                  <Link href='/checkout'>Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-y-6 items-center justify-center h-screen'>
          <h2 className='text-3xl font-bold'>Your cart is empty</h2>
          <Button
            asChild
            className='cusrsor-pointer text-xl py-6'
            variant={"destructive"}>
            <Link href='/products'>Return to Shop</Link>
          </Button>
        </div>
      )}
    </MainContainer>
  );
}
