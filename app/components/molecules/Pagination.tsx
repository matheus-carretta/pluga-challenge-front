import { ChevronLeftIcon, ChevronRightIcon } from "../atoms/ChevronIcons"

interface PaginationProps {
  currentPage: number
  maxPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, maxPage, onPageChange }: PaginationProps) {
  return (
    <div className="text-center">
      <div className="join">
        <button 
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))} 
          className={`join-item btn ${currentPage === 1 ? "btn-disabled" : ""}`}
        >
          <ChevronLeftIcon />
        </button>
        {Array.from({ length: maxPage }, (_, i) => i + 1).map((i) =>
          <button 
            key={`p${i}`} 
            onClick={() => onPageChange(i)} 
            className={`join-item btn ${i === currentPage ? "btn-active" : ""}`}
          >
            {i}
          </button>
        )}
        <button 
          onClick={() => onPageChange(Math.min(currentPage + 1, maxPage))} 
          className={`join-item btn ${currentPage === maxPage ? "btn-disabled" : ""}`}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}
