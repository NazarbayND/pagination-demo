import React, { useEffect, useRef } from "react";

import "./Pagination.scss";
import { usePagination } from "../../hooks/usePagination.ts";

interface PaginationProps {
  pageCount: number;
  pagesToShow?: number;
  pageStep?: number;
  initialPage?: number;
  isLooped?: boolean;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = React.memo(
  ({
    pageCount,
    pageStep = 3,
    pagesToShow = 5,
    initialPage = 1,
    isLooped = false,
    onPageChange,
  }) => {
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const {
      currentPage,
      totalPages,
      visiblePages,
      goToPage,
      nextPage,
      prevPage,
      nextMultiplePages,
      prevMultiplePages,
    } = usePagination({
      totalPages: pageCount,
      initialPage,
      pageStep,
      pagesToShow,
      isLooped,
      onPageChange,
    });

    useEffect(() => {
      buttonRefs.current[currentPage - 1]?.focus();
    }, [currentPage]);

    return (
      <div className="pagination-container">
        <button
          onClick={prevMultiplePages}
          disabled={!isLooped && currentPage <= 1}
        >
          &lt;&lt;
        </button>

        <button onClick={prevPage} disabled={!isLooped && currentPage <= 1}>
          &lt;
        </button>

        <div className="pages-list">
          {visiblePages.map((page, idx) => {
            if (page === "dots-left" || page === "dots-right") {
              return (
                <span key={`dots-${idx}`} className="ellipsis">
                  ...
                </span>
              );
            }
            return (
              <button
                key={page}
                className={page === currentPage ? "active" : ""}
                onClick={() => goToPage(page as number)}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={nextPage}
          disabled={!isLooped && currentPage >= totalPages}
        >
          &gt;
        </button>

        <button
          onClick={nextMultiplePages}
          disabled={!isLooped && currentPage >= totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    );
  }
);
