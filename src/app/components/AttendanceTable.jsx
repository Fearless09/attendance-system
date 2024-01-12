"use client"

import React from 'react'
import { useAppContext } from '../context'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Close, Delete, Loading } from './SVGs'

const columns = ["SN", "Name", "Matric. Number", ""];

export default function AttendanceTable() {
    const { viewAttendanceTable, setViewAttendanceTable, attendance, clearAttendance, OnExportAttendance, deleteAttendance, loading, currentCourse } = useAppContext()

    return viewAttendanceTable && (
        // Fade background
        <div className='fixed left-0 top-0 w-full h-screen bg-[#0000002d] flex items-center justify-center p-4 sm:p-6'>
            {/* Modal Contents */}
            <div className={`max-w-[850px] w-full mx-auto rounded-lg shadow-2xl px-7 py-10 backdrop-blur-lg`}>
                <div className='flex items-center justify-between gap-5'>
                    <div className='flex items-center gap-5'>
                        <button
                            className='py-4 px-10 rounded-lg text-white capitalize text-base font-medium bg-gradient-to-t from-[#181717] to-[#1f1f1f] active:scale-[0.95]'
                            onClick={() => OnExportAttendance()}
                        >
                            Export Attendance
                        </button>
                        <button
                            className='py-4 px-10 rounded-lg text-white capitalize text-base font-medium bg-gradient-to-r from-red-500 to-red-700 active:scale-[0.95] disabled:opacity-85'
                            onClick={() => clearAttendance()}
                            disabled={!attendance || attendance?.length < 1}
                        >
                            {loading ? <Loading color={'white'} size={'28px'} /> : "Clear Attendance"}
                        </button>
                    </div>
                    <button
                        onClick={() => setViewAttendanceTable(false)}
                    >
                        <Close color={'#fff'} />
                    </button>
                </div>

                {/*  */}
                <div className='mt-[25px]'>
                    <p
                        className='capitalize text-xl px-2 mb-3 text-white'
                    >
                        {currentCourse?.courseTitle} {currentCourse?.courseCode} attendance list
                    </p>
                    <Table
                        color={"default"}
                        selectionMode="single"
                        aria-label="Example static collection table"
                    >
                        <TableHeader>
                            {columns?.map((item, index) => (
                                <TableColumn key={index}>{item}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody emptyContent={(!attendance || attendance?.length < 1) && "No rows to display"}>
                            {attendance?.map((item) => (
                                <TableRow key={item.sn}>
                                    <TableCell>{item.sn}</TableCell>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.matricNumber}</TableCell>
                                    <TableCell>
                                        <button onClick={() => deleteAttendance(`${item.courseCode}_attendance`, item.uuId)}><Delete color={"rgb(239 68 68 )"} /></button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
