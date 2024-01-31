"use client"

import React, { useEffect } from 'react'
import { Close, Hamburger, Star } from '../components/SVGs'
import SideBar from '../components/SideBar'
import { useAppContext } from '../context'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function StudentLayout({ children }) {
    const { viewSideBar, setViewSideBar } = useAppContext()
    const router = useRouter()

    useEffect(() => {
        if (!Cookies.get("Authenticated")) return router.push('/login')
    }, [])

    return (
        <div className={`p-3 sm:p-5 bg-[#1F313B] min-h-screen h-full flex items-center justify-center`}>
            <div className={`max-w-[650px] w-full mx-auto rounded-lg shadow-lg p-5 bg-white/75 relative`}>
                <div className='flex items-center justify-between gap-5'>
                    <button
                        className='px-3 py-2 border border-[#D8DADC] rounded-[10px] hover:bg-[#D8DADC] z-20'
                        onClick={() => setViewSideBar(!viewSideBar)}
                    >
                        {viewSideBar ? (
                            <Close color={'#1f1f1f'} size={'28px'} />
                        ) : (
                            <Hamburger color={'#1f1f1f'} size={'28px'} />
                        )}
                    </button>
                    <button>
                        <Star color={'#1f1f1f'} />
                    </button>
                </div>
                <div className='px-3 sm:px-16 py-12'>
                    {children}
                </div>

                <SideBar />
            </div>
        </div>
    )
}
