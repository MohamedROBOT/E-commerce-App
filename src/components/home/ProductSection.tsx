import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { getProducts } from "@/services/products.service";
import { IProduct } from "@/interfaces/products.interface";
import ProductItems from "../products/ProductItems";
import { Button } from "../ui/button";
import Link from "next/link";

export default async function ProductSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);
  return (
    <section>
      <SectionTitle title='Our Products' subtitle='Explore Our Products' />
      <ProductItems products={products} />
      <div className='flex justify-center mt-10'>
        <Button asChild variant={"destructive"} className="rounded px-12 py-4">
          <Link href={'/products'}>View All Products</Link>
        </Button>
      </div>
    </section>
  );
}
