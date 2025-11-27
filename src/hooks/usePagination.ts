import { useState, useMemo, useCallback } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  paginatedData: T[];
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
  canNextPage: boolean;
  canPrevPage: boolean;
  pageNumbers: number[];
}

export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions = {}
): UsePaginationReturn<T> {
  const { initialPage = 1, initialPageSize = 10 } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const setPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setCurrentPage(1);
  }, []);

  const nextPage = useCallback(() => {
    setPage(currentPage + 1);
  }, [currentPage, setPage]);

  const prevPage = useCallback(() => {
    setPage(currentPage - 1);
  }, [currentPage, setPage]);

  const firstPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  const lastPage = useCallback(() => {
    setPage(totalPages);
  }, [setPage, totalPages]);

  const canNextPage = currentPage < totalPages;
  const canPrevPage = currentPage > 1;

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedData,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    canNextPage,
    canPrevPage,
    pageNumbers,
  };
}
