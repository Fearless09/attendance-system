"use client"

import { addDoc, doc, updateDoc, onSnapshot, deleteDoc, collection } from 'firebase/firestore'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { attendanceCollection, courseCollection, database, usersCollection } from '../firebase/fireBaseConfig'
import { NextUIProvider } from '@nextui-org/react'
import { utils, writeFile } from 'xlsx'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export const AppContext = createContext('')

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [viewCourseDetailModal, setViewCourseDetailModal] = useState(false)
    const [viewCourses, setViewCourses] = useState(true)
    const [viewAttendanceTable, setViewAttendanceTable] = useState(false)
    const [viewSideBar, setViewSideBar] = useState(false)
    const [attendance, setAttendance] = useState(null)
    const users = useRef(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [courses, setCourses] = useState(null)
    const [currentCourse, setCurrentCourse] = useState(null)

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
        Cookies.remove("Authenticated")
        router.push('/')
        setViewSideBar(false)
    }

    // Course
    function updateCourse(course) {
        setLoading(true)
        addDoc(courseCollection, course)
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

    function endClass(uuID) {
        setLoading(true)
        updateDoc(doc(database, "course", uuID), { onGoing: false })
            .then(() => {
                setLoading(false)
                toast.success("Class End")
            })
            .catch((error) => {
                setLoading(false)
                console.log(error.message)
                toast.error("Error in ending class")
            })
    }

    function deleteClass(uuID) {
        setLoading(true)
        deleteDoc(doc(database, "course", uuID))
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error.message)
            })
    }

    function getCourse() {
        setLoading(true)
        onSnapshot(courseCollection, (response) => {
            setCourses(response.docs.map((item, index) => ({ ...item.data(), uuId: item.id, sn: index + 1 })))
            setLoading(false)
        })
    }

    // Attendance
    function addAttendance(name) {
        setLoading(true)
        addDoc(collection(database, name), currentUser)
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

    function getAttendance(name) {
        setLoading(true)
        onSnapshot(collection(database, name), (response) => {
            setAttendance(response.docs.map((item, index) => ({ sn: (index + 1), ...item.data(), uuId: item.id })))
            setLoading(false)
            setViewAttendanceTable(true)
        })
    }

    function deleteAttendance(name, uuID) {
        setLoading(true)
        deleteDoc(doc(database, name, uuID))
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)
                console.log(error.message)
            })
    }

    function clearAttendance(name) {
        setLoading(true)
        attendance?.map(item => (
            deleteDoc(doc(database, name, item.uuId))
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
        writeFile(wb, (`${currentCourse?.courseCode}_attendance` || "Attendance.xlsx"))
    }

    useEffect(() => {
        getCourse()
        getUsers()

        const sessionUser = JSON.parse(sessionStorage.getItem("currentUser"))
        sessionUser && setCurrentUser(sessionUser)
    }, [])

    return (
        <AppContext.Provider value={
            { viewCourseDetailModal, setViewCourseDetailModal, addAttendance, updateCourse, endClass, attendance, viewAttendanceTable, setViewAttendanceTable, clearAttendance, users, currentUser, setCurrentUser, addUsers, OnExportAttendance, deleteAttendance, viewSideBar, setViewSideBar, onLogOut, loading, viewCourses, setViewCourses, courses, setCourses, deleteClass, getAttendance, currentCourse, setCurrentCourse }
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
