import React from "react";


export default function ShopPageTitle({ title }: { title: string }) {
  return (
    <div className='flex gap-x-3 items-center mb-15'>
      <span className='font-semibold ps-9 text-red-500 relative before:rounded-sm before:content-[""] before:absolute before:w-5 before:h-10 before:top-1/2 before:start-0 before:bg-red-500 before:transition before:-translate-y-1/2'>
        {title}
      </span>
    </div>
  );
}
