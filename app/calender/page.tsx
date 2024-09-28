import React from 'react'
import Sidebar from './components/sidebar'
import Calendar from './components/calendar'

const CalendarDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Calendar />
      </main>
    </div>
  )
}

export default CalendarDashboard