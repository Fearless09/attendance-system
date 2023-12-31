"use client"

import { addDoc, doc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { attendanceCollection, courseCollection, database, usersCollection } from '../firebase/fireBaseConfig'
import { NextUIProvider } from '@nextui-org/react'
import { utils, writeFile } from 'xlsx'
import { useRouter } from 'next/navigation'

export const AppContext = createContext('')
const sessionUser = JSON.parse(sessionStorage.getItem("currentUser"))

const courseNull = {
    courseCode: null,
    courseTitle: null,
    elapseIn: null,
    lecturerInCharge: null
}

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [viewCourseDetailModal, setViewCourseDetailModal] = useState(false)
    const [viewAttendanceTable, setViewAttendanceTable] = useState(false)
    const [viewSideBar, setViewSideBar] = useState(false)
    const [attendance, setAttendance] = useState(null)
    const users = useRef(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [course, setCourse] = useState(null)

    const router = useRouter()

    // Users
    function addUsers(user) {
        setLoading(true)
        addDoc(usersCollection, user)
            .then(() => {
                toast.success("Data Added to Database Successfully")
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.message)
                setLoading(false)
                toast.error("Error in Send Data to the Database")
            })
    }

    function getUsers() {
        setLoading(true)
        onSnapshot(usersCollection, (response) => {
            users.current = response.docs.map((item) => ({ ...item.data(), uuId: item.id }))
            setLoading(false)
        })
    }

    function onLogOut() {
        setCurrentUser(null)
        sessionStorage.clear()
        router.push('/')
    }

    // Course
    function updateCourse() {
        setLoading(true)
        updateDoc(doc(database, "course", "auJTdWdBLGbkBK4HtOYD"), course)
            .then(() => {
                setLoading(false)
                toast.success("Data Added to Database Successfully")
            })
            .catch((error) => {
                console.log(error.message)
                setLoading(false)
                toast.error("Error in Send Data to the Database")
            })
    }
    function endClass() {
        setLoading(true)
        updateDoc(doc(database, "course", "auJTdWdBLGbkBK4HtOYD"), courseNull)
            .then(() => {
                setLoading(false)
                toast.success("Class End")
                setCourse(courseNull)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error.message)
                toast.error("Error in ending class")
            })
    }

    function getCourse() {
        setLoading(true)
        onSnapshot(courseCollection, (response) => {
            setCourse(response.docs.map((item) => item.data())[0])
            setLoading(false)
        })
    }

    // Attendance
    function addAttendance() {
        setLoading(true)
        addDoc(attendanceCollection, currentUser)
            .then(() => {
                setLoading(false)
                toast.success("Data Added to Database Successfully")
            })
            .catch((error) => {
                console.log(error.message)
                setLoading(false)
                toast.error("Error in Send Data to the Database")
            })
    }

    function getAttendance() {
        setLoading(true)
        onSnapshot(attendanceCollection, (response) => {
            setAttendance(response.docs.map((item, index) => ({ sn: (index + 1), ...item.data(), uuId: item.id })))
            setLoading(false)
        })
    }

    function deleteAttendance(uuID) {
        setLoading(true)
        deleteDoc(doc(database, "attendance", uuID))
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error.message)
            })
    }

    function clearAttendance() {
        setLoading(true)
        attendance?.map(item => (
            deleteDoc(doc(database, "attendance", item.uuId))
                .then(() => {
                    setLoading(false)
                })
                .catch(error => {
                    setLoading(false)
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

        sessionUser && setCurrentUser(sessionUser)
    }, [])

    return (
        <AppContext.Provider value={
            { viewCourseDetailModal, setViewCourseDetailModal, course, setCourse, addAttendance, updateCourse, endClass, attendance, viewAttendanceTable, setViewAttendanceTable, clearAttendance, users, currentUser, setCurrentUser, addUsers, OnExportAttendance, deleteAttendance, viewSideBar, setViewSideBar, onLogOut, sessionUser, loading }
        }>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}
