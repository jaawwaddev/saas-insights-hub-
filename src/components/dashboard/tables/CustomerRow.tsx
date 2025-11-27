import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MoreHorizontal, Mail, Phone, Globe, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Customer } from '@/types/customer';
import { formatCurrency, formatRelativeTime, formatDate } from '@/lib/utils/formatters';
import { cn } from '@/lib/utils';

interface CustomerRowProps {
  customer: Customer;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const statusStyles = {
  active: 'status-badge status-active',
  trial: 'status-badge status-trial',
  churned: 'status-badge status-churned',
  paused: 'status-badge bg-muted text-muted-foreground',
};

const planStyles = {
  starter: 'bg-muted text-muted-foreground',
  professional: 'bg-primary/10 text-primary',
  enterprise: 'bg-chart-5/10 text-chart-5',
};

export function CustomerRow({ customer, index, isExpanded, onToggleExpand }: CustomerRowProps) {
  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, delay: index * 0.02 }}
        className={cn(
          'border-b border-border hover:bg-muted/30 transition-colors cursor-pointer',
          isExpanded && 'bg-muted/20'
        )}
        onClick={onToggleExpand}
      >
        <td className="p-4">
          <div className="flex items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="h-10 w-10 rounded-full ring-2 ring-border"
            />
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{customer.name}</p>
              <p className="text-sm text-muted-foreground truncate">{customer.email}</p>
            </div>
          </div>
        </td>
        <td className="p-4 hidden md:table-cell">
          <span className={statusStyles[customer.status]}>
            <span className="relative flex h-2 w-2">
              {customer.status === 'active' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              )}
              <span
                className={cn(
                  'relative inline-flex rounded-full h-2 w-2',
                  customer.status === 'active' && 'bg-success',
                  customer.status === 'trial' && 'bg-warning',
                  customer.status === 'churned' && 'bg-destructive',
                  customer.status === 'paused' && 'bg-muted-foreground'
                )}
              />
            </span>
            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
          </span>
        </td>
        <td className="p-4 hidden lg:table-cell">
          <span className={cn('status-badge', planStyles[customer.plan])}>
            {customer.plan.charAt(0).toUpperCase() + customer.plan.slice(1)}
          </span>
        </td>
        <td className="p-4">
          <span className="font-mono font-medium text-foreground">
            {formatCurrency(customer.mrr)}
          </span>
        </td>
        <td className="p-4 hidden xl:table-cell">
          <span className="text-sm text-muted-foreground">
            {formatRelativeTime(customer.lastActiveAt)}
          </span>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
            >
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isExpanded && 'rotate-180'
                )}
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Send Email</DropdownMenuItem>
                <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </td>
      </motion.tr>

      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <td colSpan={6} className="p-0">
              <div className="p-6 bg-muted/20 border-b border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Company
                    </p>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{customer.company}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Industry
                    </p>
                    <p className="font-medium text-foreground">{customer.industry}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Location
                    </p>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{customer.country}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Lifetime Value
                    </p>
                    <p className="font-mono font-semibold text-foreground">
                      {formatCurrency(customer.ltv)}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Joined
                    </p>
                    <p className="text-foreground">{formatDate(customer.joinedAt)}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Last Active
                    </p>
                    <p className="text-foreground">{formatDate(customer.lastActiveAt)}</p>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Email
                    </p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${customer.email}`}
                        className="text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {customer.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}
