import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    try{
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('iiitd_mail', res.data.user.email)
      nav('/dashboard')
    }catch(err){
      alert(err.response?.data?.message || 'Login failed')
    }finally{ setLoading(false) }
  }

  return (
    <div className="card mt-8">
      <h2 className="text-2xl font-semibold mb-2">Sign in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@iiitd.ac.in" className="w-full px-4 py-2 border rounded-lg" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg" />
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg">{loading? 'Signing...':'Sign In'}</button>
          <button type="button" onClick={()=>nav('/register')} className="flex-1 border rounded-lg px-4 py-2">Register</button>
        </div>
      </form>
    </div>
  )
}
