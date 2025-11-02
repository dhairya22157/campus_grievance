import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/api'

export default function Dashboard(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.get('/grievances/my').then(res=>{
      if(mounted) setItems(res.data)
    }).catch(()=>{}).finally(()=> mounted && setLoading(false))
    return ()=> mounted = false
  },[])

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card mt-6 text-center">
        <h3 className="text-xl font-semibold">Dashboard</h3>
        <p className="text-sm text-slate-500 mt-2">Your recent grievances</p>
        <div className="mt-4 text-left">
          <Link to="/new" className="inline-block bg-green-500 text-white px-3 py-2 rounded">➕ New Grievance</Link>
        </div>
        <div className="mt-4 text-left">
          {loading ? <p>Loading...</p> : (
            items.length===0 ? <p className="text-sm text-slate-500">No grievances yet.</p> : (
              <ul className="space-y-2">
                {items.map(i=> (
                  <li key={i._id} className="p-3 border rounded flex justify-between items-center">
                    <div>
                      <div className="font-mono text-indigo-600">{i._id}</div>
                      <div className="text-sm text-slate-600">{i.category} • {new Date(i.createdAt).toLocaleString()}</div>
                    </div>
                    <div><Link to={`/dashboard`} className="text-indigo-600">See</Link></div>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </div>
  )
}
