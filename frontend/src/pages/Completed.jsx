import React, { useMemo, useState, useCallback } from 'react'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios'
import { CheckCircle2, Filter, SortDesc, SortAsc, Award } from 'lucide-react'
import CompletedList from '../components/Completed.jsx'

const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest', icon: <SortDesc className="w-3 h-3" /> },
  { id: 'oldest', label: 'Oldest', icon: <SortAsc className="w-3 h-3" /> },
  { id: 'priority', label: 'Priority', icon: <Award className="w-3 h-3" /> },
]

const API_BASE = 'http://localhost:4000/api/tasks'

const Completed = () => {
  const outletContext = useOutletContext()
  const tasks = outletContext?.tasks || []
  const refreshTasks = outletContext?.refreshTasks || (() => {})

  const [sortBy, setSortBy] = useState('newest')

  const sortedCompletedTasks = useMemo(() => {
    const onlyCompleted = tasks.filter(t =>
      t.completed === true ||
      t.completed === 1 ||
      (typeof t.completed === 'string' && t.completed.toLowerCase() === 'yes')
    )

    const sorted = [...onlyCompleted]
    if (sortBy === 'newest') sorted.sort((a, b) => new Date(b.completedAt || b.updatedAt || b.createdAt) - new Date(a.completedAt || a.updatedAt || a.createdAt))
    else if (sortBy === 'oldest') sorted.sort((a, b) => new Date(a.completedAt || a.updatedAt || a.createdAt) - new Date(b.completedAt || b.updatedAt || b.createdAt))
    else if (sortBy === 'priority') {
      const order = { high: 3, medium: 2, low: 1 }
      sorted.sort((a, b) => (order[b.priority?.toLowerCase()] || 0) - (order[a.priority?.toLowerCase()] || 0))
    }
    return sorted
  }, [tasks, sortBy])

  const getHeaders = () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No auth token found')
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  }

  const handleDelete = useCallback(async (task) => {
    try {
      await axios.delete(`${API_BASE}/${task._id || task.id}`, { headers: getHeaders() })
      refreshTasks()
    } catch (err) {
      console.error('Failed to delete task', err)
    }
  }, [refreshTasks])

  return (
    <div className={'p-4 md:p-6 min-h-screen overflow-hidden'}>
      <div className={'flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-3 md:gap-4'}>
        <div className={'flex-1 min-w-0'}>
          <h1 className={'text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2 truncate'}>
            <CheckCircle2 className="text-green-500 w-5 h-5" />
            Completed Tasks
          </h1>
          <p className={'text-xs md:text-sm text-gray-500 mt-1 ml-7 md:ml-8'}>
            {sortedCompletedTasks.length} completed {sortedCompletedTasks.length === 1 ? 'task' : 'tasks'}
          </p>
        </div>

        <div className={'w-full md:w-auto mt-2 md:mt-0'}>
          <div className={'flex items-center justify-between bg-white p-2 md:p-3 rounded-xl shadow-sm border border-purple-100 w-full md:w-auto'}>
            <div className={'flex items-center gap-2 text-gray-700 font-medium'}>
              <Filter className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Sort by:</span>
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={'px-2 py-1 md:px-3 md:py-2 border border-purple-100 rounded-lg focus:ring-2 focus:ring-purple-500 md:hidden text-xs md:text-sm'}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="priority">By Priority</option>
            </select>
            <div className={'hidden md:flex space-x-1 bg-purple-50 p-1 rounded-lg ml-2 md:ml-3'}>
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSortBy(opt.id)}
                  className={`px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1 ${sortBy === opt.id ? 'bg-white text-purple-700 shadow-sm border border-purple-100' : 'text-gray-600 hover:text-purple-700 hover:bg-purple-100/50'}`}
                >
                  {opt.icon}{opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={'space-y-3 md:space-y-4'}>
        <CompletedList tasks={sortedCompletedTasks} onDelete={handleDelete} />
      </div>
    </div>
  )
}

export default Completed
