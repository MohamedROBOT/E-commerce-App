import { IProduct } from '@/interfaces/products.interface'
import Image from 'next/image'
import React from 'react'
import { renderStars } from '../shared/review'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import AddtoCartBtn from './AddtoCartBtn'
import AddWishlistBtn from '../wishlist/AddWishlistbtn'

export default  function ProductItems({products}:{products:IProduct[]}) {

 
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-33'>
      {
        products && products.map((product) => {
          return (
            <div key={product._id} className='relative'>
              <picture className='flex group mb-4 bg-gray-200 relative flex-col justify-center items-center overflow-hidden'>
               <Link href={`/products/${product._id}`}> <Image loading='lazy' src={product.imageCover} width={200} height={200} alt={product.title} /></Link>
                <AddtoCartBtn productId={product._id} className='w-full transition-all duration-300  absolute -bottom-10 rounded-none rounded-b-lg invisible group-hover:visible group-hover:bottom-0' variant={"default"}/>
              </picture>
              <div>
                <h3 className='font-medium line-clamp-1 mb-2'>{product.title}</h3>
                <div className='flex items-center justify-around'>
                  <span className='font-medium text-red-600'>{product.price}$</span>
                  <span >{renderStars( product.ratingsAverage)}</span>
                  <span className='text-gray-500 text-xs'>({product.ratingsQuantity}) reviews</span>
                </div>
              </div>
             
              <div className='absolute top-2 end-2 flex flex-col justify-center items-center gap-y-2'>
              <AddWishlistBtn productId={product._id} />
                <span className='cursor-pointer bg-white rounded-full p-1'>
                  <Eye size={16}  />
                </span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
