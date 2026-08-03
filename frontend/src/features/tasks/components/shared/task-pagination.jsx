import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export function TaskPagination({
  page,
  totalPages,
  onNextPage,
  onPrevPage,
  onPageChange,
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={page === 1 ? undefined : onPrevPage}
            className={cn(
              "cursor-pointer",
              page === 1 && "opacity-50 pointer-events-none",
            )}
          />
        </PaginationItem>

        {/* <PaginationItem>
          <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        <PaginationItem>
          <PaginationNext
            onClick={page === 1 ? undefined : onNextPage}
            className={cn(
              "cursor-pointer",
              page === 1 && "opacity-50 pointer-events-none",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
