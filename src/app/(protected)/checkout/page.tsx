"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MainContainer from "@/components/shared/MainContainer";
import { useRouter } from "next/navigation";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import {
  addressFormPayload,
  addressFormSchema,
  addressFormState,
} from "@/schemas/address.schema";
import { handlePayment } from "@/services/order.service";
import { useCart } from "@/context/CartContext";


export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart();

  const [action, formAction] = useActionState(handlePayment, addressFormState);
  const router = useRouter();

  const form = useForm<addressFormPayload>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      city: "",
      phone: "",
      paymentMethod: "cash",
    },
  });

  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [cartDetails, form]);
  useEffect(() => {
  if (!action) return; 

  if (action.success && action.message) {
    if (action.paymentMethod === "cash") {
      toast.success(action.message, {
        position: "top-center",
      });

      const timeout = setTimeout(() => {
        router.push(action.callbackUrl);
        setCartDetails(null);
      }, 2000);

      return () => clearTimeout(timeout); 
    } else {
     
      window.location.href = action.callbackUrl;
    }
  } else if (action.message) {
    toast.error(action.message, {
      position: "top-center",
    });
  }
}, [action, router, setCartDetails]);

  return (
    <MainContainer>
      <div className='max-w-2xl  mx-auto py-12'>
        <h2 className='text-3xl font-bold mb-12'>Checkout</h2>
        <Form {...form}>
          {/* we didn't use onsubmit because event on server  */}
          <form action={formAction} className='space-y-8'>
            {/* ******************** Cart Id *********************/}
            <FormField
              control={form.control}
              name='cartId'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      value={cartDetails?.cartId}
                      className='hidden'
                    />
                  </FormControl>
                  {/* <FormMessage>{action.error?.cartId?.[0]}</FormMessage> */}
                </FormItem>
              )}
            />
            {/* ******************** Name *********************/}
            <FormField
              control={form.control}
              name='details'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input placeholder='Ex. Mohamed' {...field} />
                  </FormControl>
                  <FormMessage>{action.error?.details?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {/* ******************** city *********************/}
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder='Ex. Cairo' {...field} />
                  </FormControl>
                  <FormMessage>{action.error?.city?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            {/* ******************** phone *********************/}
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='+2 0123 456 789'
                      {...field}
                      type='tel'
                    />
                  </FormControl>

                  <FormMessage>{action.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* ******************** payment opts *********************/}
            <FormField
              control={form.control}
              name='paymentMethod'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <RadioGroup {...field} defaultValue='cash' onValueChange={field.onChange}>
                    <div className='flex items-center gap-3'>
                      <RadioGroupItem value='cash' id='cash' />
                      <Label htmlFor='cash'>Cash</Label>
                    </div>
                    <div className='flex items-center gap-3'>
                      <RadioGroupItem value='card' id='card' />
                      <Label htmlFor='card'>Card</Label>
                    </div>
                    <FormMessage>
                      {action.error?.paymentMethod?.[0]}
                    </FormMessage>
                  </RadioGroup>
                </FormItem>
              )}
            />
            <div className='text-center w-1/2 mx-auto  -'>
              <Button className='w-full' type='submit'>
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MainContainer>
  );
}
