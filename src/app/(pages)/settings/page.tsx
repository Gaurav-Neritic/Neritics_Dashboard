import GeneralCategory from '@/components/SettingsPage/GeneralCategory'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold"> General Settings</h1>
      </div>
      <GeneralCategory/>
    </div>
  )
}

export default page
