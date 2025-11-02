import React, { useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

export default function NewGrievance(){
  const [userType, setUserType] = useState('Student')
  const [category, setCategory] = useState('Infrastructure')
  const [description, setDescription] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    try{
      await api.post('/grievances', { userType, category, description, isAnonymous: anonymous })
      nav('/dashboard')
    }catch(err){ alert(err.response?.data?.message || 'Submit failed') }
    finally{ setLoading(false) }
  }

  return (
    <div className="card mt-6">
      <h3 className="text-lg font-semibold">New Grievance</h3>
      <form onSubmit={handleSubmit} className="space-y-4 mt-3">
        <select value={userType} onChange={e=>setUserType(e.target.value)} className="w-full border rounded-md px-3 py-2">
          <option>Student</option>
          <option>Faculty</option>
          <option>Staff</option>
          <option>Other</option>
        </select>
        <select value={category} onChange={e=>setCategory(e.target.value)} className="w-full border rounded-md px-3 py-2">
          <option>Infrastructure</option>
          <option>Academics</option>
          <option>Hostel</option>
          <option>Safety</option>
          <option>Other</option>
        </select>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border rounded-md px-3 py-2 h-28" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={anonymous} onChange={e=>setAnonymous(e.target.checked)} /> Submit anonymously</label>
        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">{loading? 'Submitting...':'Submit Grievance'}</button>
        </div>
      </form>
    </div>
  )
}
