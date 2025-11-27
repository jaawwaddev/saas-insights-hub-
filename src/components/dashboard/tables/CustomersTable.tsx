import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePagination } from '@/hooks/usePagination';
import { generateCustomers } from '@/lib/mock-data/customers';
import { formatCurrency, formatRelativeTime } from '@/lib/utils/formatters';
import { Customer, CustomerStatus, CustomerPlan, CustomerFilters, CustomerSort } from '@/types/customer';
import { cn } from '@/lib/utils';
import { SkeletonTable } from '../SkeletonCard';
import { CustomerRow } from './CustomerRow';

interface CustomersTableProps {
  isLoading?: boolean;
}

export function CustomersTable({ isLoading = false }: CustomersTableProps) {
  const allCustomers = useMemo(() => generateCustomers(100), []);

  const [filters, setFilters] = useState<CustomerFilters>({
    search: '',
    status: 'all',
    plan: 'all',
  });

  const [sort, setSort] = useState<CustomerSort>({
    field: 'mrr',
    direction: 'desc',
  });

  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return allCustomers.filter((customer) => {
      const matchesSearch =
        filters.search === '' ||
        customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        customer.company.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = filters.status === 'all' || customer.status === filters.status;
      const matchesPlan = filters.plan === 'all' || customer.plan === filters.plan;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [allCustomers, filters]);

  // Sort customers
  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sort.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return sort.direction === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [filteredCustomers, sort]);

  // Pagination
  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    setPage,
    setPageSize,
    canNextPage,
    canPrevPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    pageNumbers,
  } = usePagination(sortedCustomers, { initialPageSize: 10 });

  const handleSort = (field: keyof Customer) => {
    setSort((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const SortIcon = ({ field }: { field: keyof Customer }) => {
    if (sort.field !== field) return null;
    return sort.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  if (isLoading) {
    return <SkeletonTable rows={10} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((f) => ({ ...f, status: value as CustomerStatus | 'all' }))
              }
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="churned">Churned</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.plan}
              onValueChange={(value) =>
                setFilters((f) => ({ ...f, plan: value as CustomerPlan | 'all' }))
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 table-header hover:text-foreground"
                >
                  Customer
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left p-4 hidden md:table-cell">
                <span className="table-header">Status</span>
              </th>
              <th className="text-left p-4 hidden lg:table-cell">
                <span className="table-header">Plan</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('mrr')}
                  className="flex items-center gap-1 table-header hover:text-foreground"
                >
                  MRR
                  <SortIcon field="mrr" />
                </button>
              </th>
              <th className="text-left p-4 hidden xl:table-cell">
                <button
                  onClick={() => handleSort('lastActiveAt')}
                  className="flex items-center gap-1 table-header hover:text-foreground"
                >
                  Last Active
                  <SortIcon field="lastActiveAt" />
                </button>
              </th>
              <th className="w-12 p-4"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginatedData.map((customer, index) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  index={index}
                  isExpanded={expandedRow === customer.id}
                  onToggleExpand={() =>
                    setExpandedRow((prev) => (prev === customer.id ? null : customer.id))
                  }
                />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {paginatedData.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No customers found matching your filters.</p>
        </div>
      )}

      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, sortedCustomers.length)} of{' '}
              {sortedCustomers.length} customers
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => setPageSize(parseInt(value))}
            >
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={firstPage}
                disabled={!canPrevPage}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={prevPage}
                disabled={!canPrevPage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {pageNumbers.map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="icon"
                  className="h-8 w-8 hidden sm:flex"
                  onClick={() => setPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={nextPage}
                disabled={!canNextPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={lastPage}
                disabled={!canNextPage}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
