"use server";
import { getUserToken } from "@/lib/server-utils";
import {
  addressFormSchema,
  addressFormStateType,
} from "@/schemas/address.schema";

export async function handlePayment(
  formState: addressFormStateType,
  formData: FormData
) {
  const shippingAddress = {
    details: formData.get("details"),
    city: formData.get("city"),
    phone: formData.get("phone"),
  };
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod");
  const parsedData = addressFormSchema.safeParse({
    ...shippingAddress,
    cartId,
    paymentMethod,
  });

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
      callbackUrl: "/cart",
    };
  }
  try {
    const token = await getUserToken();


    const endpoint =
      paymentMethod === "cash"
        ? `api/v1/orders/${cartId}`
        : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}
`;
    const response = await fetch(
      `${process.env.API_BASE_URL}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify(shippingAddress),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return {
        
        success: false,
        error:{},
        message: data.message || "Payment failed",
        callbackUrl: "/cart",
        paymentMethod,
      };
    } else {
      return {
        success: true,
        error: {},
        message: data.message || "Payment successful",
        callbackUrl: paymentMethod === "cash" ? "/allorders" : data.session.url,
        paymentMethod,
      };
    }

    return data;
  } catch (error) {
    return {
      error: {},
      success: false,
      message: (error as string) || "Failed to place order",
    };
  }
}
