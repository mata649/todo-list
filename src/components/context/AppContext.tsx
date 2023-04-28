import { Task } from "@/types/task";
import React, { createContext, useState } from "react";
import LoadingOverlay from 'react-loading-overlay-ts'

export const AppContext = createContext<{
    setLoading: (val: boolean) => void,
    tasks: Task[],
    setTasks: (val: Task[]) => void,
    errorMessage: string,
    setErrorMessage: (val: string) => void
}>({
    setLoading: (val: boolean) => { },
    tasks: [],
    setTasks: (val: Task[]) => { },
    errorMessage: "",
    setErrorMessage: (val: string) => { }
});


export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [tasks, setTasks] = useState<Task[]>([])
    const [errorMessage, setErrorMessage] = useState<string>("")
    return (
        <AppContext.Provider value={{ setLoading, tasks, setTasks, errorMessage, setErrorMessage }}>
            <LoadingOverlay
                spinner
                active={loading}>
                {children}
            </LoadingOverlay>


        </AppContext.Provider>
    );
};