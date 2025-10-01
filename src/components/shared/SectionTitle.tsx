import React from 'react'

export default function SectionTitle({title, subtitle}:{title:string, subtitle:string}) {
  return (
    <div className='section-title mb-15'>
     
     

        <span className='font-semibold ps-9 text-red-500 relative before:rounded-sm before:content-[""] before:absolute before:w-5 before:h-10 before:top-1/2 before:start-0 before:bg-red-500 before:transition before:-translate-y-1/2'>{title}</span>
      
       <h2 className='mt-5 font-semibold text-4xl'>{subtitle}</h2>
    </div>
  )
}
