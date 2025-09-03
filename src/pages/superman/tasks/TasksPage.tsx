import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuth } from "@/hooks/use-auth"
import api from "@/lib/axios"
import { hasPermission } from "@/lib/permission"
import type { Task } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import UnautorhizedPage from "../../error/UnautorhizedPage"
import TaskForm from "./partial/TaskForm"

const getTasks = async () => {
  const response = await api.get("/api/tasks")
  return response.data
}

export default function TasksPage() {
  const { user } = useAuth()

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Task>({
    id: "",
    title: "",
    description: "",
    deadline: "",
    completed: false,
  })
  const [method, setMethod] = useState<"POST" | "PUT" | "DELETE">("POST")

  const query = useQuery({ queryKey: ["tasks"], queryFn: getTasks })

  const handleCreate = () => {
    setShowForm(true)
    setMethod("POST")
    setForm((prev) => ({
      ...prev,
      id: "",
      title: "",
      description: "",
      deadline: "",
      completed: false,
    }))
  }

  const handleEdit = (task: Task) => {
    setShowForm(true)
    setMethod("PUT")
    setForm((prev) => ({ ...prev, ...task }))
  }

  const handleDelete = (taskId: string) => {
    setShowForm(true)
    setForm((prev) => ({ ...prev, id: taskId }))
    setMethod("DELETE")
  }

  if (!hasPermission(user, "TASKS_MANAGEMENT", "READ")) {
    return <UnautorhizedPage />
  }

  return (
    <div>
      {hasPermission(user, "TASKS_MANAGEMENT", "CREATE") && (
        <Button onClick={handleCreate}>CREATE</Button>
      )}

      <TaskForm
        show={showForm}
        setShow={setShowForm}
        form={form}
        setForm={setForm}
        method={method}
      />

      <section className="mt-5">
        {query.isLoading ? (
          <div>Loading...</div>
        ) : query.isError ? (
          <div>Erorr...</div>
        ) : (
          <div className="flex-1 grid grid-cols-4 gap-3">
            {query.data?.map((task: Task) => {
              return (
                <Card
                  key={task.id}
                  className={`border-l-4 ${
                    task.completed ? "border-l-green-500" : "border-l-red-500"
                  }`}
                >
                  <CardHeader className="flex justify-between items-center">
                    <div>
                      <CardTitle>{task.title}</CardTitle>
                      <CardDescription>{task.description}</CardDescription>
                    </div>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-y-1">
                        {hasPermission(user, "TASKS_MANAGEMENT", "UPDATE") && (
                          <Button
                            variant={"ghost"}
                            onClick={() => handleEdit(task)}
                          >
                            Edit
                          </Button>
                        )}
                        {hasPermission(user, "TASKS_MANAGEMENT", "DELETE") && (
                          <Button
                            variant={"ghost"}
                            onClick={() => handleDelete(task.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </PopoverContent>
                    </Popover>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
