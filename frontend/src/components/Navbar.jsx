import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const nav = useNavigate()
  const token = localStorage.getItem('token')
  const mail = localStorage.getItem('iiitd_mail')

  function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('iiitd_mail')
    nav('/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="font-semibold text-slate-800">Campus Grievance Portal</Link>
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <span className="text-sm text-slate-600">{mail}</span>
              <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 border rounded">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  )
}
