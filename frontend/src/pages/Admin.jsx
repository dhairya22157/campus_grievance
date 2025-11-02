import React, { useEffect, useState } from 'react'
import api from '../api/api'

export default function Admin(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    api.get('/grievances').then(res=>{ if(mounted) setItems(res.data) }).catch(()=>{}).finally(()=> mounted && setLoading(false))
    return ()=> mounted = false
  },[])

  async function updateStatus(id, status){
    try{
      await api.put(`/grievances/${id}/status`, { status })
      setItems(items.map(i=> i._id===id ? { ...i, status } : i))
    }catch(err){ alert(err.response?.data?.message || 'Update failed') }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card mt-6">
        <h3 className="text-lg font-semibold">Admin Panel</h3>
        {loading ? <p>Loading...</p> : (
          <div className="mt-4">
            {items.length===0 ? <p>No grievances</p> : (
              <ul className="space-y-2">
                {items.map(i=> (
                  <li key={i._id} className="p-3 border rounded">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-mono text-indigo-600">{i._id}</div>
                        <div className="text-sm text-slate-600">{i.category}</div>
                        <div className="text-xs text-slate-400">{new Date(i.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm">Status: {i.status}</div>
                        <div className="flex gap-2">
                          <button onClick={()=>updateStatus(i._id, 'In Progress')} className="px-2 py-1 border rounded">In Progress</button>
                          <button onClick={()=>updateStatus(i._id, 'Resolved')} className="px-2 py-1 bg-green-500 text-white rounded">Resolved</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
