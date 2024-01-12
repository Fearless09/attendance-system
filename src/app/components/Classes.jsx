"use client"

import React from 'react'
import { useAppContext } from '../context'
import { Close, Loading } from './SVGs'

export default function Classes() {
    const { viewCourses, setViewCourses, courses, attendance, loading, currentUser, addAttendance } = useAppContext()

    return viewCourses && (
        <div className='fixed left-0 top-0 w-full h-screen bg-[#0000002d] text-white flex items-center justify-center p-4 sm:p-6'>
            <div className={`max-w-[550px] w-full mx-auto rounded-lg shadow-2xl px-7 py-10 backdrop-blur-lg`}>
                <div className='flex items-center justify-between gap-5'>
                    <h1 className='text-center text-2xl'>Classes</h1>
                    <button
                        onClick={() => {
                            setViewCourses(false)
                        }}
                    >
                        <Close color={'#fff'} />
                    </button>
                </div>

                <div className='mt-[32px] grid gap-2'>
                    {courses?.sort((a, b) => b.sn - a.sn).map((item, index) => (
                        <div
                            key={item.uuId}
                            className='rounded-lg border px-4 py-2 hover:bg-[#0000004b]'
                        >
                            <h3 className='text-xl capitalize'>{item.courseTitle}</h3>
                            <h3 className='text-xl uppercase'>{item.courseCode}</h3>
                            {item.onGoing && (
                                <h3 className='text-white text-xl capitalize flex gap-3 items-center'>
                                    <span className='inline-block w-[13px] aspect-square rounded-full bg-green-500 animate-ping '></span>
                                    <span>On going class</span>
                                </h3>
                            )}


                            <h3 className='mt-3 text-xl'>Lecturer in charge: {item.lecturerInCharge}</h3>
                            <h3 className='text-xl uppercase'>{item.date}</h3>
                            <button
                                className='mt-2 py-3 px-5 rounded-lg text-white capitalize text-lg font-medium bg-gradient-to-r from-blue-700 to-blue-900 disabled:opacity-65'
                                // disabled={
                                //     attendance?.find(item => item.userName === currentUser?.userName) || !item?.onGoing
                                // }
                                onClick={() => {
                                    addAttendance(`${item.courseCode}_attendance`)
                                }}
                            >
                                {loading ? <Loading color={'white'} size={'28px'} /> : "Mark Attendance"}
                            </button>
                            {/* <button
                                    className='mt-2 py-3 px-5 rounded-lg  text-white capitalize text-base font-medium bg-gradient-to-r from-blue-700 to-blue-900'
                                    onClick={() => setViewAttendanceTable(true)}
                                >
                                    Mark Attendance
                                </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
