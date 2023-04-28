import React from 'react'

export const TaskList = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col items-center gap-3 mt-5">
            {children}
        </div>
    )
}
