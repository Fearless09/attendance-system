"use client"

import React from 'react'
import { useAppContext } from '../context'
import { Loading, User } from './SVGs'
import { toast } from 'react-toastify'

export default function LecturerPage() {
    const { setViewCourseDetailModal, setViewAttendanceTable, course, endClass, currentUser, loading } = useAppContext()

    return (
        <div className='text-center'>
            {/* Profile Image */}
            <div className='w-[200px] aspect-square rounded-full bg-gradient-radial from-slate-300 to-slate-400 mx-auto flex justify-center items-end overflow-hidden '>
                <User size={"170px"} color={"white"} />
            </div>
            <h1 className='mt-10 font-medium text-3xl text-white'>
                {currentUser?.prefix} {currentUser?.fullName}
            </h1>
            <h2 className='uppercase mt-3 font-medium text-xl text-white'>
                {currentUser?.matricNumber}
            </h2>

            {(course?.courseCode || course?.courseTitle) && (
                <h3 className='mt-8 text-white text-xl capitalize flex gap-3 items-center justify-center'>
                    <span className='inline-block w-[13px] aspect-square rounded-full bg-green-500 animate-ping '></span>
                    <span>On going class</span>
                </h3>
            )}
            {course?.courseCode && (
                <h2 className='mt-3 uppercase text-2xl text-white'>
                    {course?.courseCode}
                </h2>
            )}
            {course?.courseTitle && (
                <h2 className='mt-2 capitalize text-xl text-white'>
                    {course?.courseTitle}
                </h2>
            )}

            <div className='flex justify-center items-center gap-4'>
                {(course?.courseCode || course?.courseTitle) ? (
                    <button
                        className='mt-8 py-4 px-10 rounded-lg text-white capitalize text-base font-medium bg-gradient-to-r from-red-500 to-red-700'
                        onClick={() => endClass()}
                    >
                        {loading ? <Loading color={'white'} size={'28px'} /> : "End Class"}
                    </button>
                ) : (
                    <button
                        className='mt-8 py-4 px-10 rounded-lg text-white capitalize text-base font-medium bg-gradient-to-t from-[#181717] to-[#1f1f1f]'
                        onClick={() => {
                            setViewCourseDetailModal(true)
                            toast.warn('Please fill in the course details')
                        }}
                    >
                        Start Attendance
                    </button>
                )}
                <button
                    className='mt-8 py-4 px-10 rounded-lg  text-white capitalize text-base font-medium bg-gradient-to-r from-blue-700 to-blue-900'
                    onClick={() => setViewAttendanceTable(true)}
                >
                    View Attendance
                </button>
            </div>

        </div>
    )
}
