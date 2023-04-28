import { useContext, useEffect, useState } from "react"
import axios from "axios"
  ;

import { TaskCard } from "@/components/task/TaskCard";
import { TaskList } from "@/components/task/TaskList";
import { AppContext } from "@/components/context/AppContext";
import { TaskFilter } from "@/components/task/TaskFilter";
import { useFetchTasks } from "@/hooks/useFetchTasks";
import Link from "next/link";
import { ErrorMessage } from "@/components/ErrorMessage";
export default function Home() {


  const { tasks } = useContext(AppContext)
  const { filter, setFilter } = useFetchTasks()
  return (
    <main className="grid h-screen grid-cols-3">
      <div className="col-start-2">
        <h1 className="mt-10 text-4xl font-bold text-center border-b-4 text-coffee border-tan">Lista de Tareas<Link href="/form" className="text-3xl cursor-pointer" >📝</Link></h1>
      <ErrorMessage />
        <TaskFilter filter={filter} setFilter={setFilter}/>

        {tasks.length > 0 ?
          <TaskList>
            {tasks.map((task) => (
              <TaskCard
                key={"task-" + task.id}
                task={task}
              />
            ))

            }
          </TaskList>
          :
          <h1 className="mt-5 text-2xl text-center text-coffee">Tareas no encontradas :(</h1>
        }
      </div>
    </main>
  )
}
