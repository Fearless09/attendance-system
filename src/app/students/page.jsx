import React from 'react'
import { metadata } from '../layout'
import StudentLayout from '../layouts/StudentLayout'
import StudentPage from '../components/StudentPage'
import StudentClasses from '../components/StudentClasses'

metadata.title += ' - Student Portal'

function Page() {
    return (
        <>
            <StudentLayout>
                <StudentPage />
            </StudentLayout>

            {/* Modal */}
            <StudentClasses />
        </>
    )
}

export default Page
