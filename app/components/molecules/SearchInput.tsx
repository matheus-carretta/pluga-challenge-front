import { SearchIcon } from "../atoms/SearchIcon"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = "Buscar ferramenta" }: SearchInputProps) {
  return (
    <label className="input w-full">
      <SearchIcon />
      <input 
        type="search" 
        placeholder={placeholder} 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </label>
  )
}
