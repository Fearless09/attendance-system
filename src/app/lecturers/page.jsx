import React from 'react'
import LecturerLayout from '../layouts/LecturerLayout'
import CourseDetailsModal from '../components/CourseDetailsModal'
import LecturerPage from '../components/LecturerPage'
import { metadata } from '../layout'
import AttendanceTable from '../components/AttendanceTable'
import Courses from '../components/Courses'

metadata.title += ' - Lecturer Portal'

export default function Page() {
    return (
        <>
            <LecturerLayout>
                <LecturerPage />
            </LecturerLayout>
            {/* Modal */}
            <Courses />
            <CourseDetailsModal />
            <AttendanceTable />
        </>
    )
}
