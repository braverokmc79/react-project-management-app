import React from 'react'
import Tasks from './Tasks'

const SelectedProject = ({project, onDelete, onAddTask, onDeleteTask , tasks}) => {

    //console.log(today.toLocaleDateString("ko-KR", options));  en-US
    const formattedDate=new Date(project.dueDate).toLocaleDateString("ko-KR",{
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })
  return (
    <div className='w-[35rem] mt-16'>
        <header className='pb-4 mb-4 border-b-2 border-stone-300'>
            <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold text-stone-600 mb-2'>{project.title}</h1>
            <button className='text-stone-600 hover:text-stone-950' onClick={onDelete}>Delete</button>
            </div>
            <p className='mb-4 text-stone-400'>{formattedDate}</p>
            <p className='text-stone-600 whitespace-pre-warp'>{project.description}</p>
        </header>
        <Tasks onAddTask={onAddTask}  onDeleteTask={onDeleteTask} tasks={tasks} />

    </div>
  )
}

export default SelectedProject