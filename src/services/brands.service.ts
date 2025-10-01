 export async function getBrands() {
        try {
           const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
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