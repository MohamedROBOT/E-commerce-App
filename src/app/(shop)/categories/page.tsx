import MainContainer from '@/components/shared/MainContainer'
import ShopPageTitle from '@/components/shared/ShopPageTitle'
import { ICategory } from '@/interfaces/categories.interface'
import { getCategories } from '@/services/categories.service'
import Image from 'next/image'
import React from 'react'


export default async function CategoriesSection() {

  
    const {data : categories} : {data : ICategory[]} = await getCategories()

  return (
    <MainContainer>
      <ShopPageTitle title="Categories"/>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-33'>
            {
              categories && categories.map((category) => {
                return (
                  <div key={category._id} className='bg-gray-500 rounded-2xl flex flex-col gap-y-5 text-white p-5 justify-center items-center'>
                      <Image width={200} height={150}  className='shadow-sm shadow-gray-500 size-48  rounded' loading='lazy' src={category.image}  alt={category.name} />
                      <h2>{category.name}</h2>
                  </div>
                )
              })
            }
          </div>
      
    </MainContainer>
  )
}
