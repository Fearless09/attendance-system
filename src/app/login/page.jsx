"use client"

import React, { useRef, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Link from 'next/link'
import { EyeHide, EyeShow, Loading } from '../components/SVGs'

function Page() {
    const [loading, setLoading] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)
    const passwordRef = useRef()

    const onsubmit = (e) => {
        e.preventDefault()

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    }
    return (
        <AuthLayout text={"Login"}>
            <form className='mt-[30px]'>
                <div className='grid gap-2'>
                    <label className='ps-1 text-[#181717] font-semibold text-lg' htmlFor="userID">
                        User ID
                    </label>
                    <input
                        type="text"
                        id='matricNumber'
                        className='py-4 px-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base'
                        placeholder='Enter your user ID'
                        required
                    />
                </div>
                <div className='mt-4 grid gap-2'>
                    <label className='ps-1 text-[#343434] font-semibold text-lg' htmlFor="password">
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type="password"
                            id='password'
                            className='py-4 px-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base w-full'
                            placeholder='Enter your password'
                            ref={passwordRef}
                            required
                        />
                        <button
                            type='button'
                            onClick={() => {
                                setViewPassword(!viewPassword)
                                passwordRef.current.focus()
                            }}
                            className='absolute bg-[#57575742] p-[21px] rounded-lg right-0 top-1/2 -translate-y-1/2'
                        >
                            {viewPassword ? <EyeShow /> : <EyeHide />}
                        </button>
                    </div>
                </div>
                <button
                    type='button'
                    className='ps-1 mt-1 hover:text-[#000] text-[#181717]'
                >
                    Forgot password
                </button>
                <button
                    type='submit'
                    onClick={onsubmit}
                    className='w-full mt-[30px] rounded-md py-4 px-6 bg-[#1f1f1f] text-white font-semibold text-lg'
                >
                    {loading ? <Loading color={'white'} size={'28px'} /> : 'Login'}
                </button>
            </form>
            <div className='mt-2 text-right hover:text-[#000] text-[#181717]'>
                <Link href={'/register'}>
                    Don't have an account?
                </Link>
            </div>
        </AuthLayout>
    )
}

export default Page
