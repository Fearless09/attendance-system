import React from 'react'
import { Hamburger, Star } from '../components/SVGs'

export default function StudentLayout({ children }) {
    return (
        <div className={`p-3 sm:p-5 bg-[url('/pexels-yan-krukau-8197534.jpg')] bg-cover min-h-screen h-full flex items-center justify-center`}>
            <div className={`max-w-[650px] w-full mx-auto rounded-lg shadow-lg p-5 backdrop-blur-lg`}>
                <div className='flex items-center justify-between gap-5'>
                    <button
                        className='px-3 py-2 border border-[#D8DADC] rounded-[10px] hover:bg-[#D8DADC]'
                    >
                        <Hamburger color={'#1f1f1f'} size={'28px'} />
                    </button>
                    <button>
                        <Star color={'#1f1f1f'} />
                    </button>
                </div>
                <div className='px-3 sm:px-16 py-12'>
                    {children}
                </div>
            </div>
        </div>
    )
}
