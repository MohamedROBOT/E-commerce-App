"use client"; //SessionProvider must be client component
import { SessionProvider } from "next-auth/react";
import React from "react";
import { CartContextProvider } from "./context/CartContext";
import WishlistContextProvider from "./context/WishlistContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    //we use SessionProvider to use next auth token to get our data in all our pages
    //it wrap all our pages
    //we use seperate Providers.tsx file to wrap all our pages and make it client component and wrap our layout pages withit
    //we use session provider because the data will be used using useSession hook
    <SessionProvider>
      <WishlistContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </WishlistContextProvider>
    </SessionProvider>
  );
}
