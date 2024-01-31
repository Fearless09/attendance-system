"use client"
import React from 'react'
import { useAppContext } from '../context'
import { LogOut } from './SVGs'

export default function SideBar() {
    const { viewSideBar, onLogOut } = useAppContext()

    return viewSideBar && (
        // Fade background
        <div className='absolute left-0 top-0 w-full h-full bg-[#00000038] rounded-lg z-10'>
            <div className={`max-w-[250px] w-full h-full rounded-lg shadow-lg p-5 pt-40 backdrop-blur-lg`}>
                <button
                    className='w-full py-4 px-10 rounded-lg text-white capitalize text-base font-medium bg-gradient-to-r from-red-500 to-red-700 active:scale-[0.95] disabled:opacity-85 flex items-center justify-center gap-2'
                    onClick={onLogOut}
                >
                    <span>Log Out</span>
                    <LogOut />
                </button>
            </div>
        </div>
    )
}
