import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DateRange } from '@/types/analytics';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

const ranges: { value: DateRange; label: string }[] = [
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const selectedRange = ranges.find(r => r.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'h-9 gap-2 bg-card border-border hover:bg-muted',
            className
          )}
        >
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{selectedRange?.label || 'Select range'}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {ranges.map((range) => (
          <DropdownMenuItem
            key={range.value}
            onClick={() => onChange(range.value)}
            className={cn(
              'cursor-pointer',
              value === range.value && 'bg-primary/10 text-primary'
            )}
          >
            {range.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface DateRangeTabsProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export function DateRangeTabs({ value, onChange, className }: DateRangeTabsProps) {
  const tabs: { value: DateRange; label: string }[] = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '90d', label: '90d' },
  ];

  return (
    <div className={cn('inline-flex rounded-lg bg-muted p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md',
            value === tab.value
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {value === tab.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-card rounded-md shadow-sm"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
