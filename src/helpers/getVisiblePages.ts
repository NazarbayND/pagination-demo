import { PageNumbersWithDots } from "../types";

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxPagesToShow = 5
): PageNumbersWithDots {
  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: PageNumbersWithDots = [];
  const half = Math.floor(maxPagesToShow / 2);

  let start = currentPage - half;
  let end = currentPage + half;

  if (start < 1) {
    start = 1;
    end = maxPagesToShow;
  }
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - maxPagesToShow + 1;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (start > 2) {
    pages.unshift("dots-left");
    pages.unshift(1);
  } else if (start === 2) {
    pages.unshift(1);
  }

  if (end < totalPages - 1) {
    pages.push("dots-right");
    pages.push(totalPages);
  } else if (end === totalPages - 1) {
    pages.push(totalPages);
  }

  return pages;
}
