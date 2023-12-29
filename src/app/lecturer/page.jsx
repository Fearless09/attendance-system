import React from 'react'
import LecturerLayout from '../layouts/LecturerLayout'
import CourseDetailsModal from '../components/CourseDetailsModal'
import LecturerPage from '../components/LecturerPage'
import { metadata } from '../layout'
import AttendanceTable from '../components/AttendanceTable'

metadata.title += ' - Lecturer Portal'

export default function Page() {
    return (
        <>
            <LecturerLayout>
                <LecturerPage />
            </LecturerLayout>
            {/* Modal */}
            <CourseDetailsModal />
            <AttendanceTable />
        </>
    )
}
