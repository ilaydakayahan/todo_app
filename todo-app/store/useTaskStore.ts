import { create } from "zustand"


export interface Task {
  id: string
  title: string
  isDone: boolean
  createdAt: string
}

interface TaskState {
  tasks: Task[]
  fetchTasks: () => Promise<void>
  addTask: (title: string) => Promise<void>
  updateTask: (id: string, updatedFields: Partial<{ title: string; isDone: boolean }>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  fetchTasks: async () => {
    try {
      const res = await fetch('/api/tasks')
      if (!res.ok) throw new Error('Fetch failed')
      const data: Task[] = await res.json()
      set({ tasks: data })
    } catch (error) {
      console.error("Fetch tasks failed:", error)
    }
  },
  
  addTask: async (title: string) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (!res.ok) throw new Error('Add task failed')
      const newTask: Task = await res.json()
      set(state => ({ tasks: [newTask, ...state.tasks] }))
    } catch (error) {
      console.error(error)
    }
  },
  

  updateTask: async (id: string, updatedFields: Partial<{ title: string; isDone: boolean }>) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      })
      if (!res.ok) throw new Error("Update task failed")
      await get().fetchTasks() // listeyi güncelle
    } catch (error) {
      console.error(error)
    }
  },

  deleteTask: async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Delete task failed")
      await get().fetchTasks() // listeyi güncelle
    } catch (error) {
      console.error(error)
    }
  },
}))
