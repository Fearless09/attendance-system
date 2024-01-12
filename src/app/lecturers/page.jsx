import React from 'react'
import LecturerLayout from '../layouts/LecturerLayout'
import CourseDetailsModal from '../components/CourseDetailsModal'
import LecturerPage from '../components/LecturerPage'
import { metadata } from '../layout'
import AttendanceTable from '../components/AttendanceTable'
import LecturerCourses from '../components/LecturerCourses'

metadata.title += ' - Lecturer Portal'

export default function Page() {
    return (
        <>
            <LecturerLayout>
                <LecturerPage />
            </LecturerLayout>
            {/* Modal */}
            <LecturerCourses />
            <CourseDetailsModal />
            <AttendanceTable />
        </>
    )
}
