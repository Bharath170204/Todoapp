"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { ListTodo, Plus, Trash, Edit, Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the type for a todo item
interface Todo {
  id: string
  text: string
  completed: boolean
  isEditing: boolean
}

// Header Component
// Displays the application title and a simple logo/icon.
function Header() {
  return (
    <header className="flex items-center justify-center p-4 bg-primary text-primary-foreground shadow-md rounded-t-lg">
      <ListTodo className="h-8 w-8 mr-3" />
      <h1 className="text-3xl font-bold tracking-tight">Todo List App</h1>
    </header>
  )
}

// TodoInput Component
// Provides an input field and an "Add" button for new todo items.
interface TodoInputProps {
  onAddTodo: (text: string) => void
}

function TodoInput({ onAddTodo }: TodoInputProps) {
  const [newTodoText, setNewTodoText] = useState("")

  const handleAddClick = () => {
    if (newTodoText.trim() !== "") {
      onAddTodo(newTodoText.trim())
      setNewTodoText("") // Clear the input field
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
      />
      <Button onClick={handleAddClick} aria-label="Add todo">
        <Plus className="h-5 w-5 mr-2" /> Add
      </Button>
    </div>
  )
}

// TodoItem Component
// Represents a single todo item with its text, completion status, and action buttons.
interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
  onToggleEditMode: (id: string) => void
}

function TodoItem({ todo, onToggleComplete, onDelete, onEdit, onToggleEditMode }: TodoItemProps) {
  const [editText, setEditText] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the input field when entering edit mode
  useEffect(() => {
    if (todo.isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [todo.isEditing])

  const handleEditSave = () => {
    if (editText.trim() !== "") {
      onEdit(todo.id, editText.trim())
    } else {
      // If edited text is empty, revert to original or delete
      setEditText(todo.text) // Revert to original text
      onToggleEditMode(todo.id) // Exit edit mode
    }
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEditSave()
    } else if (e.key === "Escape") {
      setEditText(todo.text) // Revert on escape
      onToggleEditMode(todo.id) // Exit edit mode
    }
  }

  return (
    <li
      className={cn(
        "flex items-center justify-between p-3 rounded-md shadow-sm transition-all duration-200 ease-in-out",
        todo.completed ? "bg-muted text-muted-foreground line-through" : "bg-card hover:shadow-md",
      )}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={() => onToggleComplete(todo.id)}
          aria-label={`Mark "${todo.text}" as complete`}
        />
        {todo.isEditing ? (
          <Input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave} // Save on blur
            onKeyDown={handleEditKeyDown}
            className="flex-1 min-w-0"
            aria-label={`Edit todo: ${todo.text}`}
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className="font-medium text-base break-words overflow-hidden text-ellipsis"
            style={{ wordBreak: "break-word" }}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="flex space-x-1 ml-2">
        {todo.isEditing ? (
          <Button variant="ghost" size="icon" onClick={handleEditSave} aria-label="Save edit">
            <Check className="h-5 w-5 text-green-500" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={() => onToggleEditMode(todo.id)} aria-label="Edit todo">
            <Edit className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => onDelete(todo.id)} aria-label="Delete todo">
          <Trash className="h-5 w-5 text-destructive" />
        </Button>
      </div>
    </li>
  )
}

// TodoList Component
// Displays a dynamically updating list of todo items.
interface TodoListProps {
  todos: Todo[]
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
  onToggleEditMode: (id: string) => void
}

function TodoList({ todos, onToggleComplete, onDelete, onEdit, onToggleEditMode }: TodoListProps) {
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
              onToggleEditMode={onToggleEditMode}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

// Footer Component
// Displays copyright information and additional links/credits.
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
// Integrates all subcomponents and manages the application's state.
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])

  // Function to add a new todo item
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(), // Generate a unique ID for the todo
      text,
      completed: false,
      isEditing: false,
    }
    setTodos((prevTodos) => [...prevTodos, newTodo])
  }

  // Function to toggle the completion status of a todo item
  const toggleTodoComplete = (id: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Function to delete a todo item
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  // Function to toggle the editing mode for a todo item
  const toggleEditMode = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : { ...todo, isEditing: false },
      ),
    )
  }

  // Function to update the text of an edited todo item
  const editTodo = (id: string, newText: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText, isEditing: false } : todo)),
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto my-8 flex flex-col min-h-[600px] shadow-lg rounded-lg overflow-hidden">
      <Header />
      <main className="flex-1 flex flex-col items-center p-4 overflow-auto">
        <TodoInput onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onToggleComplete={toggleTodoComplete}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onToggleEditMode={toggleEditMode}
        />
      </main>
      <Footer />
    </Card>
  )
}
