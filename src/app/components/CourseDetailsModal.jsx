"use client"

import React from 'react'
import { Close, Loading } from './SVGs'
import { useAppContext } from '../context'
import { toast } from 'react-toastify'

const elapseTime = [5, 10, 15, 20, 25, 30]

export default function CourseDetailsModal() {
    const { viewCourseDetailModal, setViewCourseDetailModal, setCourse, updateCourse, currentUser, loading } = useAppContext()

    const onsubmit = (e) => {
        e.preventDefault()
        updateCourse()
        setViewCourseDetailModal(false)
    }

    return viewCourseDetailModal && (
        <div className='fixed left-0 top-0 w-full h-screen bg-[#0000002d] text-white flex items-center justify-center p-4 sm:p-6'>
            <div className={`max-w-[550px] w-full mx-auto rounded-lg shadow-2xl px-7 py-10 backdrop-blur-lg`}>
                <div className='flex items-center justify-between gap-5'>
                    <h1 className='text-center text-2xl'>Filling the course details</h1>
                    <button
                        onClick={() => {
                            setViewCourseDetailModal(false)
                            toast.warning("Course detail modal close")
                        }}
                    >
                        <Close color={'#fff'} />
                    </button>
                </div>

                <form onSubmit={onsubmit} className='mt-[25px]'>
                    {/* Course Title */}
                    <div className='grid gap-1'>
                        <label className='ps-1 font-medium text-base' htmlFor="courseTitle">
                            Course Title
                        </label>
                        <input
                            type="text"
                            id='courseTitle'
                            name='courseTitle'
                            className='p-3 bg-transparent border border-[#f1f1f1] rounded-md text-[#f1f1f1] font-medium text-base'
                            placeholder='Enter the course title'
                            onChange={e => setCourse(prev => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                                onGoing: true,
                                date: new Date().toLocaleString(),
                                lecturerInCharge: `${currentUser?.prefix} ${currentUser?.fullName}`
                            }))}
                            required
                        />
                    </div>
                    {/* Course Code */}
                    <div className='mt-6 grid gap-1'>
                        <label className='ps-1 font-medium text-base' htmlFor="courseCode">
                            Course Code
                        </label>
                        <input
                            type="text"
                            id='courseCode'
                            name='courseCode'
                            className='p-3 bg-transparent border border-[#f1f1f1] rounded-md text-[#f1f1f1] font-medium text-base'
                            placeholder='Enter the course code'
                            onChange={e => setCourse(prev => ({
                                ...prev,
                                [e.target.name]: e.target.value,
                                onGoing: true,
                                date: new Date().toLocaleString(),
                                lecturerInCharge: `${currentUser?.prefix} ${currentUser?.fullName}`
                            }))}
                            required
                        />
                    </div>
                    {/* Course Code */}
                    <div className='mt-6 grid gap-1'>
                        <label className='ps-1 font-medium text-base' htmlFor="courseCode">
                            Attendance Elapse In
                        </label>
                        <select
                            id="elapseIn"
                            name="elapseIn"
                            className='p-3 bg-transparent border border-[#f1f1f1] rounded-md text-[#f1f1f1] font-medium text-base'
                            onChange={e => setCourse(prev => ({
                                ...prev,
                                [e.target.name]: Number(e.target.value),
                                onGoing: true,
                                date: new Date().toLocaleString(),
                                lecturerInCharge: `${currentUser?.prefix} ${currentUser?.fullName}`
                            }))}
                            required
                        >
                            <option value=""></option>
                            {elapseTime?.map((item, id) => (
                                <option className='text-black' key={id} value={item}>{item} Minutes</option>
                            ))}
                        </select>
                    </div>
                    {/* Submit Button */}
                    <button
                        type='submit'
                        onClick={onsubmit}
                        className='w-full mt-[30px] rounded-md py-4 px-6 bg-[#1f1f1f] text-white font-semibold text-lg'
                    >
                        {loading ? <Loading color={'white'} size={'28px'} /> : 'Start Attendance'}
                    </button>
                </form>
            </div>
        </div>
    )
}
