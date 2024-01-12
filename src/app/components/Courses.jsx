"use client"

import React from 'react'
import { Close, Delete } from './SVGs'
import { useAppContext } from '../context'

export default function Courses() {
    const { viewCourses, setViewCourses, courses, setViewAttendanceTable, setViewCourseDetailModal, deleteClass, getAttendance } = useAppContext()

    return viewCourses && (
        <div className='fixed left-0 top-0 w-full h-screen bg-[#0000002d] text-white flex items-center justify-center p-4 sm:p-6'>
            <div className={`max-w-[550px] w-full mx-auto rounded-lg shadow-2xl px-7 py-10 backdrop-blur-lg`}>
                <div className='flex items-center justify-between gap-5'>
                    <button
                        className='mt-8 py-4 px-10 rounded-lg text-white capitalize text-base font-medium bg-gradient-to-t from-[#181717] to-[#1f1f1f]'
                        onClick={() => {
                            setViewCourseDetailModal(true)
                        }}
                    >
                        new class
                    </button>
                    <button
                        onClick={() => {
                            setViewCourses(false)
                        }}
                    >
                        <Close color={'#fff'} />
                    </button>
                </div>

                <div className='mt-[32px] grid gap-2'>
                    {courses?.map(item => (
                        <div
                            key={item.uuId}
                            className='rounded-lg border px-4 py-2 hover:bg-[#0000004b] flex items-center justify-between gap-8'
                        >
                            <div>
                                <h3 className='text-xl capitalize'>{item.courseTitle}</h3>
                                <h3 className='text-xl uppercase'>{item.courseCode}</h3>
                                <h3 className='text-xl uppercase'>{item.date}</h3>
                                <button
                                    className='mt-2 py-3 px-5 rounded-lg  text-white capitalize text-base font-medium bg-gradient-to-r from-blue-700 to-blue-900'
                                    onClick={() => getAttendance(`${item.courseCode}_attendance`)}
                                >
                                    View Attendance
                                </button>
                            </div>
                            <button>
                                <button
                                    onClick={() => deleteClass(item.uuId)}
                                >
                                    <Delete color={"rgb(239 68 68 )"} />
                                </button>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
