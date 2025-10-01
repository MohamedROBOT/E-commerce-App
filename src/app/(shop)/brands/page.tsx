import MainContainer from '@/components/shared/MainContainer'
import ShopPageTitle from '@/components/shared/ShopPageTitle'
import { IBrand } from '@/interfaces/brands.interface'
import { getBrands } from '@/services/brands.service'
import Image from 'next/image'
import React from 'react'

export default async function BrandsPage() {
  const {data : brands} : {data : IBrand[]} = await getBrands()
  return (
    <MainContainer>
      <ShopPageTitle title='All Our Brands' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-33'>
            {
              brands && brands.map((brand) => {
                return (
                  <div key={brand._id} className=' flex justify-center items-center'>
                      <Image className='shadow-sm shadow-gray-500 rounded' loading='lazy' src={brand.image} width={200} height={200} alt={brand.name} />
                  </div>
                )
              })
            }
          </div>
    </MainContainer>
  )
}
