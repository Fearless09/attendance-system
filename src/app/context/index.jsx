"use client"

import { addDoc, doc, getDocs, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { attendanceCollection, courseCollection, database, usersCollection } from '../firebase/fireBaseConfig'
import { NextUIProvider } from '@nextui-org/react'

export const AppContext = createContext('')

const lecturer = {
    prefix: "Dr.",
    name: "S. I. Olotu",
    userName: "IFT172408",
}
const student = {
    name: "Ajayi Toheeb Opeyemi",
    userName: "IFT172408"
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
    const [users, setUsers] = useState(null)
    const [course, setCourse] = useState(null)

    // Users
    function addUsers() {
        addDoc(usersCollection, users)
            .then(() => {
                toast.success("Data Added to Database Successfully")
            })
            .catch((error) => {
                console.log(error.message)
                toast.error("Error in Send Data to the Database")
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
            setAttendance(response.docs.map((item) => ({ ...item.data(), id: item.id })))
            // console.log(response.docs.map((item) => ({ ...item.data(), id: item.id })))
        })
    }

    function clearAttendance() {
        attendance?.map(item => (
            deleteDoc(doc(database, "attendance", item.id))
                .then()
                .catch(error => {
                    console.log(error.message)
                })
        ))
    }

    useEffect(() => {
        getCourse()
        getAttendance()
        // setCourse(prev => ({ ...prev, lecturerInCharge: `${lecturer.prefix} ${lecturer.name}` }))
    }, [])

    return (
        <AppContext.Provider value={{ viewCourseDetailModal, setViewCourseDetailModal, lecturer, student, course, setCourse, addAttendance, updateCourse, endClass, attendance, viewAttendanceTable, setViewAttendanceTable, clearAttendance, users, setUsers, addUsers }}>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}
