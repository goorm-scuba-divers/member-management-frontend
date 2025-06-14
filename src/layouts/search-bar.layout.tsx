import { Input } from "@/components/shadcn-ui/input"
import { Search } from "lucide-react"

export type SearchBarProps = {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm justify-end">
      <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-10 pl-9 placeholder:font-light placeholder:text-muted-foreground"
      />
    </div>
  )
}
