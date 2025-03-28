"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

export default function MoviePagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <Pagination className="ml-[470px] mt-10">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => goToPage(currentPage - 1)}
            />
          </PaginationItem>
        )}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => goToPage(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages && totalPages > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => goToPage(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage == 1 && totalPages > 1 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => goToPage(currentPage + 2)}>
              {currentPage + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 1 && totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => goToPage(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
