import React, { useContext } from 'react'
import { AppContext } from './context/AppContext'

export const ErrorMessage = () => {
    const { errorMessage } = useContext(AppContext)

    return (
        <p className="text-center text-red-400">{errorMessage.length > 0 && errorMessage}</p>
    )
}
