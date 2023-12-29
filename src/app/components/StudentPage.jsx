"use client"

import React, { useState } from 'react'
import { User } from './SVGs'
import { useAppContext } from '../context'

export default function StudentPage() {
    const { course, student, addAttendance, attendance } = useAppContext()
    const [diasble, setDisable] = useState(false)

    return (
        <div className='text-center'>
            {/* Profile Image */}
            <div className='w-[200px] aspect-square rounded-full bg-gradient-radial from-slate-300 to-slate-400 mx-auto flex justify-center items-end overflow-hidden '>
                <User size={"170px"} color={"white"} />
            </div>
            <h1 className='mt-10 font-medium text-3xl text-white'>
                {student?.name}
            </h1>
            <h2 className='uppercase mt-4 font-medium text-xl text-white'>
                {student?.userName}
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
            {(course?.courseCode || course?.courseTitle) && (
                <>
                    <h2 className='capitalize mt-3 font-medium text-xl text-white'>
                        {course?.lecturerInCharge}
                    </h2>
                    <button
                        className='mt-8 py-4 px-10 rounded-lg text-white capitalize text-lg font-medium bg-gradient-to-r from-[#292727] to-[#222121] disabled:opacity-85'
                        disabled={attendance?.find(item => item.userName === student.userName)}
                        onClick={() => {
                            addAttendance()
                            setDisable(true)
                        }}
                    >
                        Mark Attendance
                    </button>
                </>
            )}
        </div>
    )
}
