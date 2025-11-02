import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Profile(){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    api.get('/user/profile').then(res=> setUser(res.data)).catch(()=>{})
  },[])

  if(!user) return <div className="card mt-6 text-center">Loading...</div>

  return (
    <div className="card mt-6">
      <h3 className="text-lg font-semibold">Profile</h3>
      <p className="mt-2">Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}
