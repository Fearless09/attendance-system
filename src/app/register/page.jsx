"use client"

import React, { useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Link from 'next/link'
import { EyeHide, EyeShow, Loading } from '../components/SVGs'
import { useAppContext } from '../context'

const prefix = ["", "Mr.", "Mrs.", "Dr.", "Prof."]

function Page() {
    const [active, setActive] = useState('students')
    const [loading, setLoading] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)
    const { users, setUsers, addUsers } = useAppContext()

    const onsubmit = (e) => {
        e.preventDefault()

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 5000);

        console.log(users)
    }
    return (
        <AuthLayout text={'Sign Up'}>
            <div className='mt-[25px] grid grid-cols-2 gap-2 rounded-lg bg-[#D8DADC]'>
                <button
                    className={`py-3 px-2 text-base font-medium rounded-lg ${active === 'students' && 'text-white bg-[#575757]'}`}
                    onClick={() => setActive('students')}
                >
                    Students
                </button>
                <button
                    className={`py-3 px-2 text-base font-medium rounded-lg ${active === 'lecturers' && 'text-white bg-[#575757]'}`}
                    onClick={() => setActive('lecturers')}
                >
                    Lecturers
                </button>
            </div>
            <form className='mt-[25px]'>
                {/* Email */}
                <div className='grid gap-1'>
                    <label className='ps-1 text-[#181717] font-medium text-base' htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id='email'
                        className='p-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base'
                        placeholder='Enter your email'
                        onChange={e => setUsers(prev => ({
                            ...prev,
                            [e.target.id]: e.target.value
                        }))}
                        required
                    />
                </div>
                {/* Initial */}
                {active === 'lecturers' && (
                    <div className='mt-4 grid gap-1'>
                        <label className='ps-1 text-[#181717] font-medium text-base' htmlFor="prefix">
                            Prefix
                        </label>
                        <select
                            name="prefix"
                            id="prefix"
                            className='p-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base'
                            onChange={e => setUsers(prev => ({
                                ...prev,
                                [e.target.id]: e.target.value
                            }))}
                        >
                            {prefix?.map((item, id) => (
                                <option key={id} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                )}
                {/* Full Name */}
                <div className='mt-4 grid gap-1'>
                    <label className='ps-1 text-[#181717] font-medium text-base' htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id='fullName'
                        className='p-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base'
                        placeholder='Enter your full name'
                        onChange={e => setUsers(prev => ({
                            ...prev,
                            [e.target.id]: e.target.value
                        }))}
                        required
                    />
                </div>
                {/* UserID */}
                <div className='mt-4 grid gap-1'>
                    <label className='ps-1 text-[#181717] font-medium text-base' htmlFor="userID">
                        {active === 'students' ? (
                            'Matric number'
                        ) : (
                            'Lecturer ID'
                        )}
                    </label>
                    <input
                        type="text"
                        id='userID'
                        className='p-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base'
                        placeholder={`Enter your  ${active === 'students' ? 'matric number' : 'lecturer ID'}`}
                        onChange={e => setUsers(prev => ({
                            ...prev,
                            [e.target.id]: e.target.value
                        }))}
                        required
                    />
                </div>
                {/* Password */}
                <div className='mt-4 grid gap-1'>
                    <label className='ps-1 text-[#343434] font-medium text-base' htmlFor="password">
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type={viewPassword ? 'text' : 'password'}
                            id='password'
                            className='p-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base w-full'
                            placeholder='Enter your password'
                            onChange={e => setUsers(prev => ({
                                ...prev,
                                [e.target.id]: e.target.value
                            }))}
                            requireds
                        />
                        <button
                            type='button'
                            onClick={() => setViewPassword(!viewPassword)}
                            className='absolute bg-[#57575742] p-[18px] rounded-lg right-0 top-1/2 -translate-y-1/2'
                        >
                            {viewPassword ? <EyeShow /> : <EyeHide />}
                        </button>
                    </div>
                </div>
                <button
                    type='submit'
                    onClick={onsubmit}
                    className='w-full mt-[30px] rounded-md py-4 px-6 bg-[#1f1f1f] text-white font-semibold text-lg'
                >
                    {loading ? <Loading color={'white'} size={'28px'} /> : 'Create Account'}
                </button>
            </form>
            <div className='mt-2 text-right hover:text-[#000] text-[#181717]'>
                <Link href={'/login'}>
                    Already have an account?
                </Link>
            </div>
        </AuthLayout>
    )
}

export default Page
