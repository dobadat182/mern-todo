import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

function getPageItems(page, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "ellipsis", totalPages];
  }

  if (page >= totalPages - 2) {
    return [
      1,
      "ellipsis",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", totalPages];
}

export function TaskPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalItems === 0 || totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);
  const pageItems = getPageItems(page, totalPages);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {start}–{end} of {totalItems}
      </p>

      <Pagination className="mx-0 w-auto justify-start sm:justify-end">
        <PaginationContent>
          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous page"
            >
              <IconChevronLeft className="size-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
          </PaginationItem>

          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <Button
                  type="button"
                  variant={item === page ? "outline" : "ghost"}
                  size="icon-sm"
                  aria-current={item === page ? "page" : undefined}
                  onClick={() => onPageChange(item)}
                >
                  {item}
                </Button>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <IconChevronRight className="size-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
