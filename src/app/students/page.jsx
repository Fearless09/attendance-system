import React from 'react'
import { metadata } from '../layout'
import StudentLayout from '../layouts/StudentLayout'
import StudentPage from '../components/StudentPage'

metadata.title += ' - Student Portal'

function Page() {
    return (
        <StudentLayout>
            <StudentPage />
        </StudentLayout>
    )
}

export default Page
