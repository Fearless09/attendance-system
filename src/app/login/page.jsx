"use client"

import React, { useRef, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import Link from 'next/link'
import { EyeHide, EyeShow, Loading } from '../components/SVGs'
import { useAppContext } from '../context'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function Page() {
    const [viewPassword, setViewPassword] = useState(false)
    const [user, setUser] = useState(null)
    const passwordRef = useRef()
    const { users, currentUser, setCurrentUser, loading } = useAppContext()
    const [errorState, setErrorState] = useState({
        matricNumber: false,
        password: false
    })
    const router = useRouter()

    const onsubmit = (e) => {
        e.preventDefault()

        if (!users?.current?.find(item => item.matricNumber.toLowerCase() === user?.matricNumber.toLowerCase())) {
            toast.error("User not Found")
            setErrorState(prev => ({ ...prev, matricNumber: true }))
            return
        }

        if (currentUser?.password !== user?.password) {
            toast.error("Incorrect Password, you might want to try forget password")
            setErrorState(prev => ({ ...prev, password: true }))
        }

        sessionStorage.setItem("currentUser", JSON.stringify(users?.current?.find(item => item.matricNumber.toLowerCase() === user?.matricNumber.toLowerCase())))

        router.push(currentUser?.role)
    }
    return (
        <AuthLayout text={"Login"}>
            <form onSubmit={onsubmit} className='mt-[30px]'>
                <div className='grid gap-2'>
                    <label className='ps-1 text-[#181717] font-semibold text-lg' htmlFor="userID">
                        User ID
                    </label>
                    <input
                        type="text"
                        id='matricNumber'
                        className='py-4 px-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base'
                        placeholder='Enter your user ID'
                        onChange={e => setUser(prev => ({
                            ...prev,
                            [e.target.id]: e.target.value
                        }))}
                        onBlur={() => {
                            const findUser = users?.current?.find(item => item.matricNumber.toLowerCase() === user?.matricNumber.toLowerCase())

                            if (findUser) {
                                setCurrentUser(findUser)
                                setErrorState(prev => ({ ...prev, matricNumber: false }))
                            } else {
                                toast.error("User not Found")
                                setErrorState(prev => ({ ...prev, matricNumber: true }))
                            }
                        }}
                        required
                    />
                    {errorState?.matricNumber && (
                        <p className='-mt-2 text-red-600 ps-1'>User not found</p>
                    )}
                </div>
                <div className='mt-4 grid gap-2'>
                    <label className='ps-1 text-[#343434] font-semibold text-lg' htmlFor="password">
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type={viewPassword ? 'text' : 'password'}
                            id='password'
                            className='py-4 px-3 bg-transparent border border-[#575757] rounded-md text-[#1f1f1f] font-medium text-base w-full'
                            placeholder='Enter your password'
                            ref={passwordRef}
                            onChange={e => setUser(prev => ({
                                ...prev,
                                [e.target.id]: e.target.value
                            }))}
                            onBlur={() => {
                                if (currentUser?.password === user?.password) {
                                    setErrorState(prev => ({ ...prev, password: false }))
                                } else {
                                    toast.error("Incorrect Password, you might want to try forget password")
                                    setErrorState(prev => ({ ...prev, password: true }))
                                }
                            }}
                            required
                        />
                        <div
                            onClick={() => {
                                setViewPassword(!viewPassword)
                                passwordRef.current.focus()
                            }}
                            className='absolute bg-[#57575742] p-[21px] rounded-lg right-0 top-1/2 -translate-y-1/2 cursor-pointer'
                        >
                            {viewPassword ? <EyeShow /> : <EyeHide />}
                        </div>
                    </div>
                    {errorState.password && (
                        <p className='-mt-2 text-red-600 ps-1'>Incorrect password</p>
                    )}
                </div>
                <button
                    type='button'
                    className='ps-1 mt-2 hover:text-[#000] text-[#181717]'
                >
                    Forgot password
                </button>
                <button
                    type='submit'
                    className='w-full mt-[30px] rounded-md py-4 px-6 bg-[#1f1f1f] text-white font-semibold text-lg'
                >
                    {loading ? <Loading color={'white'} size={'28px'} /> : 'Login'}
                </button>
            </form>
            <div className='mt-2 text-right hover:text-[#000] text-[#181717]'>
                <Link href={'/register'}>
                    Don&apos;t have an account?
                </Link>
            </div>
        </AuthLayout>
    )
}

export default Page
