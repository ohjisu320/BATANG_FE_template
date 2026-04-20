import { type LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-12 h-12 rounded-xl bg-[#f3f4f6] flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#9ca3af]" />
      </div>
      <p className="text-sm font-medium text-[#374151] mb-1">{title}</p>
      {description && (
        <p className="text-xs text-[#9ca3af] mb-4 max-w-xs">{description}</p>
      )}
      {action && (
        <button className="btn-primary" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  )
}
