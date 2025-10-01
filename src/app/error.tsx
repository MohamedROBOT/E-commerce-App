"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import React from 'react'
//for callbacks and apis
export default function error({error}:{error : Error}) {
  return (
    <div className='h-screen flex gap-3 flex-col justify-center items-center'>
      <p>{error.message}</p>
       <Button variant={"destructive"} asChild>
        <Link href={'/'} >Back to home page</Link>
      </Button>
    </div>
  )
}
