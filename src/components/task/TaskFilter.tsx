import React, { useState } from 'react'

export const TaskFilter = ({filter, setFilter }: {
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>
}) => {

    const handleFilterChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setFilter(e.target.value)
    }
    return (
        <div className="flex justify-center">
            <fieldset className="flex items-center gap-3">
                <label htmlFor="all">Todas</label>
                <input type="radio" name="all" value="A" checked={filter == "A"} onChange={handleFilterChange} />
                <label htmlFor="completed">Completadas</label>
                <input type="radio" name="completed" value="C" checked={filter == "C"} onChange={handleFilterChange} />
                <label htmlFor="pending">Pendientes</label>
                <input type="radio" name="pending" value="P" checked={filter == "P"} onChange={handleFilterChange} />
            </fieldset>
        </div>
    )
}
