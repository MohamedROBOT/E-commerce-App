"use server"
import { getUserToken } from "@/lib/server-utils";

export async function getUserCart() {
  try {
    const token = await getUserToken();
    const response = await fetch(`${process.env.API_BASE_URL}api/v1/cart`, {
        method: "GET",
      headers: {
        token: token as string,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "something went wrong");
    }
    return data;
  } catch (error) {
    return {error: error as string}
  }
}
export async function removeUserCart() {
  try {
    const token = await getUserToken();
    const response = await fetch(`${process.env.API_BASE_URL}api/v1/cart`, {
        method: "DELETE",
      headers: {
        token: token as string,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return {
      data: null,
      success: false,
      message: data.message || "Error in removing cart",
    };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Cart deleted successfully",
    };
  } catch (error) {
      return {
      data: null,
      success: true,
      message: (error as string) || "something went wrong",
    };
    }
  
}

export async function addToCart(productId: string) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${process.env.API_BASE_URL}api/v1/cart`, {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({productId}),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
      data: null,
      success: false,
      message: data.message || "Add to cart failed",
    };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Added to cart successfully",
    };
  } catch (error) {
      return {
      data: null,
      success: true,
      message: (error as string) || "something went wrong",
    };
    }
  
}

export async function removeFromCart(productId: string) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${process.env.API_BASE_URL}api/v1/cart/${productId}`, {
        method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      }
    });

    const data = await response.json();
    if (!response.ok) {
      return {
      data: null,
      success: false,
      message: data.message || "Delete from cart failed",
    };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Deleted from cart successfully",
    };
  } catch (error) {
      return {
      data: null,
      success: true,
      message: (error as string) || "something went wrong",
    };
    }
  
}
export async function updateItemQtyCart(productId: string, count: number) {
  try {
    const token = await getUserToken();
    const response = await fetch(`${process.env.API_BASE_URL}api/v1/cart/${productId}`, {
        method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({count}),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
      data: null,
      success: false,
      message: data.message || "Updating  cart quantity failed",
    };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Updating cart quantity successfully",
    };
  } catch (error) {
      return {
      data: null,
      success: true,
      message: (error as string) || "something went wrong",
    };
    }
  
}

