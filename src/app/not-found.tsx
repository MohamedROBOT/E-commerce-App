import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function notfound() {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <h2 className='text-9xl font-semibold mb-10'>404 Not Found</h2>
      <p>Your visited page not found. 
        
       </p>
     <Button className='mx-1 mt-2' asChild variant={"destructive"}>
          <Link  href={'/'}>Click to Home Page</Link>
        </Button>
    </div>
  )
}
