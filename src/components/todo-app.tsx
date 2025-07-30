"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { Loading } from "@/components/ui/loading"
import { ListTodo, Plus, Trash, Edit, Check, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTodos } from "@/lib/useTodos"
import { Todo } from "@/lib/todoService"

// Header Component
function Header() {
  return (
    <header className="flex items-center justify-center p-4 bg-primary text-primary-foreground shadow-md rounded-t-lg">
      <ListTodo className="h-8 w-8 mr-3" />
      <h1 className="text-3xl font-bold tracking-tight">Todo List App</h1>
    </header>
  )
}

// TodoInput Component
interface TodoInputProps {
  onAddTodo: (text: string) => Promise<Todo | void>
  isAdding: boolean
}

function TodoInput({ onAddTodo, isAdding }: TodoInputProps) {
  const [newTodoText, setNewTodoText] = useState("")

  const handleAddClick = async () => {
    if (newTodoText.trim() !== "" && !isAdding) {
      try {
        await onAddTodo(newTodoText.trim())
        setNewTodoText("") // Clear the input field
      } catch (error) {
        // Error is handled by the hook
        console.error('Failed to add todo:', error)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isAdding) {
      handleAddClick()
    }
  }

  return (
    <div className="flex w-full max-w-md items-center space-x-2 p-4">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="New todo item"
        className="flex-1"
        disabled={isAdding}
      />
      <Button 
        onClick={handleAddClick} 
        aria-label="Add todo"
        disabled={isAdding || newTodoText.trim() === ""}
      >
        {isAdding ? (
          <Loading size="sm" />
        ) : (
          <>
            <Plus className="h-5 w-5 mr-2" /> Add
          </>
        )}
      </Button>
    </div>
  )
}

// TodoItem Component
interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onEdit: (id: string, newText: string) => Promise<void>
  isUpdating: string | null
  isDeleting: string | null
}

function TodoItem({ 
  todo, 
  onToggleComplete, 
  onDelete, 
  onEdit, 
  isUpdating, 
  isDeleting 
}: TodoItemProps) {
  const [editText, setEditText] = useState(todo.text)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update edit text when todo text changes
  useEffect(() => {
    setEditText(todo.text)
  }, [todo.text])

  // Focus the input field when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleEditSave = async () => {
    if (editText.trim() !== "" && editText !== todo.text) {
      try {
        await onEdit(todo.id, editText.trim())
        setIsEditing(false)
      } catch (error) {
        console.error('Failed to edit todo:', error)
      }
    } else {
      setIsEditing(false)
      setEditText(todo.text) // Reset to original text
    }
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditText(todo.text) // Reset to original text
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditSave()
    } else if (e.key === "Escape") {
      handleEditCancel()
    }
  }

  const handleDelete = async () => {
    if (!isDeleting) {
      try {
        await onDelete(todo.id)
      } catch (error) {
        console.error('Failed to delete todo:', error)
      }
    }
  }

  const handleToggleComplete = async () => {
    if (!isUpdating) {
      try {
        await onToggleComplete(todo.id)
      } catch (error) {
        console.error('Failed to toggle todo:', error)
      }
    }
  }

  const isLoading = isUpdating === todo.id || isDeleting === todo.id

  return (
    <li
      className={cn(
        "flex items-center justify-between p-3 rounded-md shadow-sm transition-all duration-200 ease-in-out",
        todo.completed ? "bg-muted text-muted-foreground line-through" : "bg-card hover:shadow-md",
        isLoading && "opacity-50"
      )}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={handleToggleComplete}
          disabled={isLoading}
          aria-label={`Mark "${todo.text}" as complete`}
        />
        {isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleEditKeyDown}
            className="flex-1 min-w-0"
            aria-label={`Edit todo: ${todo.text}`}
            disabled={isLoading}
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className="font-medium text-base break-words overflow-hidden text-ellipsis cursor-pointer"
            style={{ wordBreak: "break-word" }}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="flex space-x-1 ml-2">
        {isEditing ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEditSave} 
            aria-label="Save edit"
            disabled={isLoading}
          >
            <Check className="h-5 w-5 text-green-500" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditing(true)} 
            aria-label="Edit todo"
            disabled={isLoading}
          >
            <Edit className="h-5 w-5" />
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleDelete} 
          aria-label="Delete todo"
          disabled={isLoading}
        >
          {isDeleting === todo.id ? (
            <Loading size="sm" />
          ) : (
            <Trash className="h-5 w-5 text-destructive" />
          )}
        </Button>
      </div>
    </li>
  )
}

// TodoList Component
interface TodoListProps {
  todos: Todo[]
  onToggleComplete: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onEdit: (id: string, newText: string) => Promise<void>
  isUpdating: string | null
  isDeleting: string | null
  loading: boolean
}

function TodoList({ 
  todos, 
  onToggleComplete, 
  onDelete, 
  onEdit, 
  isUpdating, 
  isDeleting, 
  loading 
}: TodoListProps) {
  if (loading) {
    return (
      <div className="w-full max-w-md p-4">
        <Loading text="Loading todos..." />
      </div>
    )
  }

  return (
    <div className="w-full max-w-md p-4">
      {todos.length === 0 ? (
        <p className="text-center text-muted-foreground">No tasks yet! Add some above.</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-4 bg-secondary text-secondary-foreground text-sm rounded-b-lg mt-auto">
      <p className="text-center">&copy; {new Date().getFullYear()} My Todo App. All rights reserved.</p>
      <div className="flex space-x-4 mt-2">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  )
}

// Main TodoApp Component
export default function TodoApp() {
  const {
    todos,
    loading,
    error,
    isAdding,
    isUpdating,
    isDeleting,
    addTodo,
    updateTodoText,
    toggleComplete,
    removeTodo,
    loadTodos,
    clearError,
  } = useTodos()

  return (
    <Card className="w-full max-w-lg mx-auto my-8 flex flex-col min-h-[600px] shadow-lg rounded-lg overflow-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center p-4 overflow-auto">
        {error && (
          <div className="w-full max-w-md mb-4">
            <Alert message={error} onClose={clearError} />
          </div>
        )}
        
        <div className="flex items-center justify-between w-full max-w-md mb-4">
          <TodoInput onAddTodo={addTodo} isAdding={isAdding} />
          <Button
            variant="outline"
            size="icon"
            onClick={loadTodos}
            disabled={loading}
            aria-label="Refresh todos"
            className="ml-2"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
        </div>
        
        <TodoList
          todos={todos}
          onToggleComplete={toggleComplete}
          onDelete={removeTodo}
          onEdit={updateTodoText}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          loading={loading}
        />
      </main>
      <Footer />
    </Card>
  )
}
