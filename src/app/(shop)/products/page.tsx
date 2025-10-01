import ProductItems from '@/components/products/ProductItems'
import MainContainer from '@/components/shared/MainContainer'
import ShopPageTitle from '@/components/shared/ShopPageTitle'
import { IProduct } from '@/interfaces/products.interface'
import { getProducts } from '@/services/products.service'
import React from 'react'

export default async function ProductsPage() {
  const {data : products} : {data : IProduct[]} = await getProducts()
  return (
    <MainContainer>
      <ShopPageTitle title='All Our Products' />
      <ProductItems products={products} />
    </MainContainer>
  )
}
