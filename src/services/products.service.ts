 export async function getProducts(limit? : number) {
        try {
           const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=${limit}`, {
            cache: 'force-cache'
           })
           if(!response.ok) {
            throw new Error(response.statusText || "something went wrong")
           }
           const data = await response.json()
           return data
        } catch (error) {
            return  {error: error as string}
        }

        
    }
 export async function getProductDetails(id : string) {
        try {
           const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
            cache: 'force-cache'
           })
           if(!response.ok) {
            throw new Error(response.statusText || "something went wrong")
           }
           const data = await response.json()
           return data
        } catch (error) {
            return  {error: error as string}
        }

        
    }