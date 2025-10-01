import { ICategory } from '@/interfaces/categories.interface'
import { getCategories } from '@/services/categories.service'
import React from 'react'
import CategoriesSlider from './CategoriesSlider'
import SectionTitle from '../shared/SectionTitle'

export default async function CategoriesSection() {

  
    const {data : categories} : {data : ICategory[]} = await getCategories()
  return (
    <section>
      <SectionTitle title="Categories" subtitle="Browse By Category"/>
      <CategoriesSlider  categories={categories} />
      
    </section>
  )
}
