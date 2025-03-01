import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { PaginationClass } from "../lib/PaginationClass";
import { getVisiblePages } from "../helpers/getVisiblePages";

interface UsePaginationProps {
  totalPages: number;
  pagesToShow: number;
  pageStep: number;
  initialPage: number;
  isLooped: boolean;
  onPageChange?: (page: number) => void;
}

export const usePagination = ({
  totalPages,
  initialPage,
  pageStep,
  pagesToShow,
  isLooped,
  onPageChange,
}: UsePaginationProps) => {
  const { current: pagination } = useRef(
    new PaginationClass(totalPages, isLooped, initialPage, pageStep)
  );

  const [currentPage, setCurrentPage] = useState(pagination.getCurrentPage());

  useEffect(() => {
    pagination.setTotalPages(totalPages);
    pagination.setLoop(isLooped);
  }, [pagination, totalPages, isLooped]);

  const goToPage = useCallback(
    (page: number) => {
      pagination.goToPage(page);
      setCurrentPage(pagination.getCurrentPage());
    },
    [pagination]
  );

  useEffect(() => {
    goToPage(initialPage);
  }, [initialPage, pagination, goToPage]);

  const nextPage = useCallback(() => {
    pagination.nextPage();
    setCurrentPage(pagination.getCurrentPage());
  }, [pagination]);

  const prevPage = useCallback(() => {
    pagination.prevPage();
    setCurrentPage(pagination.getCurrentPage());
  }, [pagination]);

  const nextMultiplePages = useCallback(() => {
    pagination.nextMultiPage();
    setCurrentPage(pagination.getCurrentPage());
  }, [pagination]);

  const prevMultiplePages = useCallback(() => {
    pagination.prevMultiPage();
    setCurrentPage(pagination.getCurrentPage());
  }, [pagination]);

  const visiblePages = useMemo(
    () => getVisiblePages(currentPage, totalPages, pagesToShow),
    [currentPage, totalPages, pagesToShow]
  );

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  return {
    visiblePages,
    totalPages: pagination.getTotalPages(),
    currentPage,
    goToPage,
    nextPage,
    prevPage,
    nextMultiplePages,
    prevMultiplePages,
  };
};
