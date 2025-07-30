import { cn } from "@/lib/utils"
import { AlertCircle, X } from "lucide-react"

interface AlertProps {
  message: string
  onClose?: () => void
  className?: string
}

export function Alert({ message, onClose, className }: AlertProps) {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 mb-4 text-sm text-red-800 border border-red-200 rounded-lg bg-red-50",
      className
    )}>
      <div className="flex items-center">
        <AlertCircle className="w-4 h-4 mr-2" />
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
} 