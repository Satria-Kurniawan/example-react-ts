import api from "@/lib/axios"

export const createTask = async ({
  title,
  description,
  deadline,
  completed,
}: {
  title: string
  description: string
  deadline: string
  completed: boolean
}) => {
  const response = await api.post("/api/tasks", {
    title,
    description,
    deadline,
    completed,
  })
  return response.data
}

export const updateTask = async ({
  id,
  title,
  description,
  deadline,
  completed,
}: {
  id: string
  title: string
  description: string
  deadline: string
  completed: boolean
}) => {
  const response = await api.put(`/api/tasks/${id}`, {
    title,
    description,
    deadline,
    completed,
  })
  return response.data
}

export const deleteTask = async ({ id }: { id: string }) => {
  const response = await api.delete(`/api/tasks/${id}`)
  return response.data
}
