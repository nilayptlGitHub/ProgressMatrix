import React from 'react'
import ReportGenerate from './dashboard/reportGene';
import DashGraph from './dashboard/graphsDash';

const TeacherDashboard = () => {
  return (
    <div>
      <DashGraph />
      <ReportGenerate />
    </div>
  )
}

export default TeacherDashboard
