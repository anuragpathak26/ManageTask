import React from 'react'
import { CheckCircle2, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

const getPriorityBadgeColor = (priority) => {
  const colors = {
    low: 'bg-green-100 text-green-900',
    medium: 'bg-purple-100 text-purple-900',
    high: 'bg-fuchsia-300 text-fuchsia-900',
  }
  return colors[priority?.toLowerCase()] || 'bg-gray-100 text-gray-700'
}

const Completed = ({ tasks = [], onDelete }) => {
  const completedTasks = tasks.filter(task => 
    task.completed === true || 
    task.completed === 1 || 
    (typeof task.completed === 'string' && task.completed.toLowerCase() === 'yes')
  )

  if (completedTasks.length === 0) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-purple-100 text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-purple-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No completed tasks</h3>
        <p className="text-sm text-gray-500">Complete some tasks to see them here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {completedTasks.map(task => (
        <div 
          key={task._id || task.id} 
          className="group p-4 sm:p-5 rounded-xl shadow-sm bg-white border-l-4 border-green-500 hover:shadow-md transition-all duration-300 border border-purple-100"
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex items-center justify-center mt-1">
              <CheckCircle2 
                size={20} 
                className="text-green-500 fill-green-500" 
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                <h3 className="text-base sm:text-lg font-medium text-gray-400 line-through truncate">
                  {task.title}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${getPriorityBadgeColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>

              {task.description && (
                <p className="text-sm text-gray-400 line-through mt-1 truncate">
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {task.dueDate ? format(new Date(task.dueDate), 'MMM-dd') : 'No due date'}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {task.completedAt ? `Completed ${format(new Date(task.completedAt), 'MMM-dd')}` : 'Recently completed'}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={() => onDelete?.(task)}
                className="p-2 hover:bg-red-100 rounded-lg text-gray-400 hover:text-red-700 transition-colors duration-200"
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Completed

