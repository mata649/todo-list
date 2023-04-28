import { ErrorMessage } from '@/components/ErrorMessage'
import { AppContext } from '@/components/context/AppContext'
import { config } from '@/config/config'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useRef } from 'react'

export default function Form() {
    const form = useRef<HTMLFormElement | null>(null)
    const router = useRouter()
    const { id, title, description } = router.query
    const { setErrorMessage, setLoading } = useContext(AppContext)
    const handleCreate = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            setErrorMessage("")
            setLoading(true)
            const title = form.current?.title.value
            const description = form.current?.description.value as string
            const resp = await axios.post(`${config.apiURL}/tasks`, {
                title, description
            })
            if (resp.status == 201) {
                setLoading(false)
                router.push("/")
            }
            setLoading(false)

        } catch (ex) {
            console.log(ex)
            setErrorMessage("Error al crear la tarea⚠️")
            setLoading(false)
        }

    }
    const handleUpdate = async(e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            setErrorMessage("")
            setLoading(true)
            const title = form.current?.title.value
            const description = form.current?.description.value as string
            const resp = await axios.put(`${config.apiURL}/tasks/${id}`, {
                title, description
            })
            if (resp.status == 200) {
                setLoading(false)
                router.push("/")
            }
            setLoading(false)

        } catch (ex) {
            console.log(ex)
            setErrorMessage("Error al crear la tarea⚠️")
            setLoading(false)
        }
    }
    return (
        <div className='grid grid-cols-3'>
            <form ref={form} onSubmit={id ? handleUpdate : handleCreate} className='flex flex-col items-center col-start-2 gap-3 px-2 py-2 mt-20 border-2 rounded border-tan'>
                <h1 className='text-4xl font-bold'>Crear Tarea</h1>
                <ErrorMessage />
                <div className='flex justify-center gap-14'>
                    <label htmlFor='title' className='text-2xl'>Título</label>
                    <input type='text' name='title' className='rounded' required maxLength={60} defaultValue={title ? title : ""} />
                </div>

                <label htmlFor='description' className='text-2xl'>Descripción</label>
                <textarea className='w-full h-32' maxLength={250} name='description' required defaultValue={description ? description : ""} />
                <button className='flex justify-between w-full font-bold'>
                    <Link href="/" className='px-2 py-1 rounded text-coffee' style={{ backgroundColor: "#d5aeae", color: "#e6e9dc" }}>Volver</Link>
                    <input type='submit' className='px-2 py-1 rounded cursor-pointer bg-mint text-coffee' style={{ color: "#e6e9dc" }} value={id ? "Actualizar" : "Crear"} />
                </button>
            </form>
        </div>
    )
}
