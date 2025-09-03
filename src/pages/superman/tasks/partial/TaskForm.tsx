import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createTask, deleteTask, updateTask } from "@/services"
import type { Task } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { type SetStateAction } from "react"

export default function TaskForm({
  show,
  setShow,
  form,
  setForm,
  method,
}: {
  show: boolean
  setShow: React.Dispatch<SetStateAction<boolean>>
  form: Task
  setForm: React.Dispatch<SetStateAction<Task>>
  method: "POST" | "PUT" | "DELETE"
}) {
  const queryClient = useQueryClient()

  const isUpdate = method === "PUT"
  const isDelete = method === "DELETE"

  const handleResetForm = () => {
    setShow(false)
    setForm((prev) => ({
      ...prev,
      id: "",
      title: "",
      description: "",
      deadline: "",
      completed: false,
    }))
  }

  const mutation = useMutation({
    mutationFn: (formData: Task) => {
      if (isUpdate) {
        return updateTask(formData)
      } else {
        return createTask(formData)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      handleResetForm()
    },
    onError: (error) => {
      console.error("Gagal menyimpan data:", error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      handleResetForm()
    },
  })

  type InputChangeEvent = React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >

  const handleChange = (event: InputChangeEvent) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(form)
  }

  const handleDelete = () => {
    deleteMutation.mutate({ id: form.id })
  }

  if (isDelete) {
    return (
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShow(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog onOpenChange={setShow} open={show}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                required
                id="title"
                name="title"
                placeholder="Type title here"
                value={form.title}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Type description here"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                placeholder="Type deadline here"
                value={form.deadline}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="completed"
                checked={form.completed}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, completed: checked }))
                }
              />
              <Label htmlFor="completed">Completed</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={mutation.isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
