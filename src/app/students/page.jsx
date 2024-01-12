import React from 'react'
import { metadata } from '../layout'
import StudentLayout from '../layouts/StudentLayout'
import StudentPage from '../components/StudentPage'
import Classes from '../components/Classes'

metadata.title += ' - Student Portal'

function Page() {
    return (
        <>
            <StudentLayout>
                <StudentPage />
            </StudentLayout>

            {/* Modal */}
            <Classes />
        </>
    )
}

export default Page
