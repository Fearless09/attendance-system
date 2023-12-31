"use client"

import React, { useEffect, useRef, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Link from 'next/link'
import { EyeHide, EyeShow, Loading } from '../components/SVGs'
import { useAppContext } from '../context'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const prefix = ["", "Mr.", "Mrs.", "Dr.", "Prof."]

function Page() {
    const [active, setActive] = useState('students')
    const [viewPassword, setViewPassword] = useState(false)
    const [user, setUser] = useState(null)
    const { users, addUsers, loading } = useAppContext()
    const [errorState, setErrorState] = useState(false)
    const passwordRef = useRef()

    const router = useRouter()

    const onsubmit = (e) => {
        e.preventDefault()

        if (users.current?.find(item => item.matricNumber.toLowerCase() === user?.matricNumber?.toLowerCase())) {
            toast.error("User Already Exist")
            setErrorState(true)
        } else {
            setErrorState(false)
            addUsers(user)
            router.push('/login')
            toast.success("Accont Registered Successfully, please login")
        }
    }

    useEffect(() => {
        setUser(prev => ({
            ...prev,
            role: active
        }))
    }, [active])
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
            <form onSubmit={onsubmit} className='mt-[25px]'>
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
                        onChange={e => setUser(prev => ({
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
                            onChange={e => setUser(prev => ({
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
                        onChange={e => setUser(prev => ({
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
                        id='matricNumber'
                        className='p-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base'
                        placeholder={`Enter your  ${active === 'students' ? 'matric number' : 'lecturer ID'}`}
                        onChange={e => setUser(prev => ({
                            ...prev,
                            [e.target.id]: e.target.value
                        }))}
                        onBlur={() => {
                            if (users.current?.find(item => item.matricNumber.toLowerCase() === user?.matricNumber?.toLowerCase())) {
                                toast.error("User Already Exist")
                                setErrorState(true)
                            } else {
                                setErrorState(false)
                            }
                        }}
                        required
                    />
                    {errorState && (
                        <p className='-mt-1 text-red-600 ps-1'>User exist, try different ID</p>
                    )}
                </div>
                {/* Password */}
                <div className='mt-4 grid gap-1'>
                    <label className='ps-1 text-[#343434] font-medium text-base' htmlFor="password">
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            ref={passwordRef}
                            type={viewPassword ? 'text' : 'password'}
                            id='password'
                            className='p-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base w-full'
                            placeholder='Enter your password'
                            onChange={e => setUser(prev => ({
                                ...prev,
                                [e.target.id]: e.target.value
                            }))}
                            required
                        />
                        <div
                            onClick={() => {
                                setViewPassword(!viewPassword)
                                passwordRef.current.focus()
                            }}
                            className='absolute bg-[#57575742] p-[18px] rounded-lg right-0 top-1/2 -translate-y-1/2 cursor-pointer'
                        >
                            {viewPassword ? <EyeShow /> : <EyeHide />}
                        </div>
                    </div>
                </div>
                <button
                    type='submit'
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
