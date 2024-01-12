"use client"

import React from 'react'
import { Loading, User } from './SVGs'
import { useAppContext } from '../context'

export default function StudentPage() {
    const { addAttendance, attendance, currentUser, loading, setViewCourses, currentCourse, } = useAppContext()

    return (
        <div className='text-center'>
            {/* Profile Image */}
            <div className='w-[200px] aspect-square rounded-full bg-gradient-radial from-slate-300 to-slate-400 mx-auto flex justify-center items-end overflow-hidden '>
                <User size={"170px"} color={"white"} />
            </div>
            <h1 className='mt-10 font-medium text-3xl text-white'>
                {currentUser?.fullName}
            </h1>
            <h2 className='uppercase mt-4 font-medium text-xl text-white'>
                {currentUser?.matricNumber}
            </h2>

            {currentCourse?.onGoing && (
                <h3 className='mt-8 text-white text-xl capitalize flex gap-3 items-center justify-center'>
                    <span className='inline-block w-[13px] aspect-square rounded-full bg-green-500 animate-ping '></span>
                    <span>On going class</span>
                </h3>
            )}
            {currentCourse?.courseCode && (
                <h2 className='mt-3 uppercase text-2xl text-white'>
                    {currentCourse.courseCode}
                </h2>
            )}
            {currentCourse?.courseTitle && (
                <h2 className='mt-2 capitalize text-xl text-white'>
                    {currentCourse?.courseTitle}
                </h2>
            )}
            {currentCourse?.lecturerInCharge && (
                <>
                    <h2 className='capitalize mt-3 font-medium text-xl text-white'>
                        {currentCourse?.lecturerInCharge}
                    </h2>
                    <h2 className='capitalize mt-3 font-medium text-xl text-white'>
                        {currentCourse?.date}
                    </h2>
                    <button
                        className='mt-8 py-4 px-10 rounded-lg text-white capitalize text-lg font-medium bg-gradient-to-r from-[#292727] to-[#222121] disabled:opacity-65'
                        // disabled={
                        //     attendance?.find(item => item.userName === currentUser?.userName) || !currentCourse?.onGoing
                        // }
                        onClick={() => {
                            addAttendance(`${currentCourse.courseCode}_attendance`)
                        }}
                    >
                        {loading ? <Loading color={'white'} size={'28px'} /> : "Mark Attendance"}
                    </button>
                </>
            )}
            <button
                className='mt-8 mx-auto block py-4 px-10 rounded-lg  text-white capitalize text-base font-medium bg-gradient-to-r from-blue-700 to-blue-900'
                onClick={() => setViewCourses(true)}
            >
                View Classes
            </button>
        </div>
    )
}
