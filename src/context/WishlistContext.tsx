
import { IProductResponse } from "@/interfaces/products.interface";
import { getUserWishlist } from "@/services/wishlist-service";
import { createContext, useContext, useEffect, useState } from "react";

interface IWishlistContext {
    wishlistDetails : IProductResponse | null;
    setWishlistDetails : React.Dispatch<React.SetStateAction<IProductResponse | null>>;
    getWishlistDetails : () => Promise<void>;
}

const WishlistContext = createContext<IWishlistContext | null>(null);



export default function WishlistContextProvider({children} : {children : React.ReactNode}) {
  const [wishlistDetails, setWishlistDetails] = useState<IProductResponse | null>(null)

  
  
  async function getWishlistDetails() {
       const data = await getUserWishlist()


       setWishlistDetails(data)
   }
  useEffect(() => {
    
   getWishlistDetails()
}, [])

    return (
    <WishlistContext.Provider value={{wishlistDetails, setWishlistDetails, getWishlistDetails}}>
      {children}
    </WishlistContext.Provider>
  )
}


export function useWishlist(){
   const context = useContext(WishlistContext)

   if(!context){
    throw new Error("useWishlist must be used within a WishlistContextProvider");
   }
   return context
}