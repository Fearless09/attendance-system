"use client"

import { addDoc, doc, getDocs, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { attendanceCollection, courseCollection, database, usersCollection } from '../firebase/fireBaseConfig'
import { NextUIProvider } from '@nextui-org/react'
import { utils, writeFile, writeFileXLSX } from 'xlsx'

export const AppContext = createContext('')

const lecturer = {
    prefix: "Dr.",
    name: "S. I. Olotu",
    userName: "IFT172408",
}
const student = {
    name: "Ajayi Toheeb Opeyemi",
    matricNumber: "IFT172408"
}

const courseNull = {
    courseCode: null,
    courseTitle: null,
    elapseIn: null,
    lecturerInCharge: null
}

export default function AppContextProvider({ children }) {
    const [viewCourseDetailModal, setViewCourseDetailModal] = useState(false)
    const [viewAttendanceTable, setViewAttendanceTable] = useState(false)
    const [attendance, setAttendance] = useState(null)
    const users = useRef(null)
    const [user, setUser] = useState(null)
    const [course, setCourse] = useState(null)

    // console.log(users.current)

    // Users
    function addUsers() {
        addDoc(usersCollection, user)
            .then(() => {
                toast.success("Data Added to Database Successfully")
            })
            .catch((error) => {
                console.log(error.message)
                toast.error("Error in Send Data to the Database")
            })
    }

    function getUsers() {
        onSnapshot(usersCollection, (response) => {
            users.current = response.docs.map((item) => ({ ...item.data(), uuId: item.id }))
        })
    }

    // Course
    function updateCourse() {
        updateDoc(doc(database, "course", "auJTdWdBLGbkBK4HtOYD"), course)
            .then(() => {
                toast.success("Data Added to Database Successfully")
            })
            .catch((error) => {
                console.log(error.message)
                toast.error("Error in Send Data to the Database")
            })
    }
    function endClass() {
        updateDoc(doc(database, "course", "auJTdWdBLGbkBK4HtOYD"), courseNull)
            .then(() => {
                toast.success("Class End")
                setCourse(courseNull)
            })
            .catch((error) => {
                console.log(error.message)
                toast.error("Error in ending class")
            })
    }

    function getCourse() {
        // getDocs(courseCollection)
        //     .then((response) => {
        //         setCourse(response.docs.map((item) => item.data())[0])
        //         // toast.success(`${response.docs.map((item) => item.data())[0]?.courseCode.toUpperCase()} class is on-going`)
        //     }).catch(error => toast.error(error.message))
        onSnapshot(courseCollection, (response) => {
            setCourse(response.docs.map((item) => item.data())[0])
        })
    }

    // Attendance
    function addAttendance() {
        addDoc(attendanceCollection, student)
            .then(() => {
                toast.success("Data Added to Database Successfully")
            })
            .catch((error) => {
                console.log(error.message)
                toast.error("Error in Send Data to the Database")
            })
    }

    function getAttendance() {
        // getDocs(attendanceCollection)
        //     .then((response) => {
        //         setAttendance(response.docs.map((item) => item.data()))
        //         // console.log(response.docs.map((item) => item.data()))
        //     }).catch(error => toast.error(error.message))
        onSnapshot(attendanceCollection, (response) => {
            setAttendance(response.docs.map((item, index) => ({ sn: (index + 1), ...item.data(), uuId: item.id })))
            // console.log(response.docs.map((item) => ({ ...item.data(), id: item.id })))
        })
    }

    function deleteAttendance(uuID) {
        deleteDoc(doc(database, "attendance", uuID))
            .then()
            .catch(error => {
                console.log(error.message)
            })
    }

    function clearAttendance() {
        attendance?.map(item => (
            deleteDoc(doc(database, "attendance", item.uuID))
                .then()
                .catch(error => {
                    console.log(error.message)
                })
        ))
    }

    // Export Data
    function OnExportAttendance() {
        const wb = utils.book_new()
        const ws = utils.json_to_sheet(attendance)
        utils.book_append_sheet(wb, ws, "Sheet1")
        writeFile(wb, (`${course?.courseCode.toUpperCase()} ${course?.courseTitle}.xlsx` || "Attendance.xlsx"))
    }

    useEffect(() => {
        getCourse()
        getAttendance()
        getUsers()
        // setCourse(prev => ({ ...prev, lecturerInCharge: `${lecturer.prefix} ${lecturer.name}` }))
    }, [])

    return (
        <AppContext.Provider value={{ viewCourseDetailModal, setViewCourseDetailModal, lecturer, student, course, setCourse, addAttendance, updateCourse, endClass, attendance, viewAttendanceTable, setViewAttendanceTable, clearAttendance, users, user, setUser, addUsers, OnExportAttendance, deleteAttendance }}>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}
