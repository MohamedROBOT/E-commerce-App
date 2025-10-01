"use server"
import { getUserToken } from "@/lib/server-utils";

export async function getUserWishlist() {
  const token = await getUserToken();
  try {
    const response = await fetch(`${process.env.API_BASE_URL}api/v1/wishlist`, {
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




export async function addToWishlist(productId: string) {
  const token = await getUserToken();
  try {
    const response = await fetch(`${process.env.API_BASE_URL}api/v1/wishlist`, {
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
        message: data.message || "Add to wishlist failed",
      }
    }
    return {
      data: data,
      success: true,
      message: data.message || "Added to wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong",
    }
  }
}
export async function removeFromWishlist(productId: string) {
  const token = await getUserToken();
  try {
    const response = await fetch(`${process.env.API_BASE_URL}api/v1/wishlist/${productId}`, {
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
        message: data.message || "Remove from wishlist failed",
      }
    }
    return {
      data: data,
      success: true,
      message: data.message || "Removed from wishlist successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong",
    }
  }
}
