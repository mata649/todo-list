import { Task } from '@/types/task'
import moment from 'moment'
import axios from 'axios'
import React, { useContext, useReducer, useState } from 'react'
import { config } from '@/config/config'
import { AppContext } from '../context/AppContext'
import { yesNoModal } from '@/helpers/modal'
import { useRouter } from 'next/router'

export const TaskCard = ({ task: { id, completedDate, description, isCompleted, registeredDate, title } }: { task: Task }) => {
    const [showTruncateContent, setShowTruncateContent] = useState<boolean>(false)
    const [isLong, _] = useState<boolean>(description.length > 117)
    const { setLoading, tasks, setTasks, setErrorMessage } = useContext(AppContext)
    const router = useRouter()
    const truncateDescription = (description: string) => {
        if (showTruncateContent) {
            return description
        }
        return description.substring(0, 117) + '...'
    }

    const handleComplete = async () => {
        setErrorMessage("")
        setLoading(true)
        try {
            const resp = await axios.put(`${config.apiURL}/tasks/${id}/complete`)
            if (resp.status == 200) {
                setTasks(tasks.map((task) => {
                    if (task.id == id) {

                        return resp.data
                    }
                    return task
                }))
            }
        } catch {
            setErrorMessage("Error al completar la tarea⚠️")
        }
        setLoading(false)

    }
    const handleDelete = async () => {
        const result = await yesNoModal("¿Te gustaría eliminar la tarea?")
        if (result.isConfirmed) {
            setErrorMessage("")
            setLoading(true)
            try {
                const resp = await axios.delete(`${config.apiURL}/tasks/${id}`)
                if (resp.status == 200) {
                    setTasks(tasks.filter(task => task.id != id))
                }
            } catch {
                setErrorMessage("Error al eliminar la tarea⚠️")
            }
            setLoading(false)
        }

    }
    const handleRedirect = async () => {

        router.push({
            pathname: '/form',
            query: {
                id,
                title,
                description
            }
        })

    }
    return (
        <div className="flex flex-col w-5/6 px-2 border border-mint">
            <h1 className={`text-xl font-bold text-center border-b-2 text-coffee border-tan ${isCompleted && "line-through"}`}>{title}</h1>
            <p className="text-coffee" style={isLong ? { cursor: 'pointer' } : {}} onClick={() => setShowTruncateContent((prev) => !prev)} >{isLong ? truncateDescription(description) : description}</p>
            <div className='grid grid-cols-2 border-b-2 border-tan'>
                <div><span className='font-bold text-coffee'>Creación:</span><span> {moment(registeredDate).format("DD/MM/YYYY")}</span></div>
                <div><span className='font-bold text-coffee'>Finalizado:</span><span> {isCompleted ? moment(completedDate).format("DD/MM/YYYY") : "No😞"}</span></div>

            </div>
            <div className='flex justify-between'>
                <button onClick={handleDelete}>❌</button>
                <button onClick={handleRedirect}>✏️</button>
                <button onClick={handleComplete}>✅</button>
            </div>
        </div >
    )
}
