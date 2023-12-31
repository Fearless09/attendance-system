"use client"

import React from 'react'
import { BackArrow, Star } from '../components/SVGs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function AuthLayout({ children, text }) {
    const router = useRouter()
    return (
        <div className={`p-3 sm:p-5 bg-[url('/pexels-kampus-production-5940710.jpg')] bg-cover min-h-screen h-full flex items-center justify-center`}>
            <div className={`max-w-[650px] w-full mx-auto rounded-lg shadow-lg p-5 backdrop-blur-lg`}>
                <div className='flex items-center justify-between gap-5'>
                    <button
                        className='py-3 px-[15px] border border-[#D8DADC] rounded-[10px] hover:bg-[#D8DADC]'
                        onClick={() => router.back()}
                    >
                        <BackArrow />
                    </button>
                    <Link
                        href={'/'}
                    >
                        <Star color={'#1f1f1f'} />
                    </Link>
                </div>
                <div className='px-3 sm:px-16 py-12'>
                    <h1 className='text-4xl font-medium'>
                        {text}
                    </h1>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
