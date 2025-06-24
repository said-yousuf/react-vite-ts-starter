/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  AdjustmentsHorizontalIcon,
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  SlashIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  value?: any;
}

export interface FilterBarProps {
  /** Called when the "Reset" button is clicked */
  onReset?: () => void;
  /** Called when a sort column is selected - now includes order */
  onSort?: (column: string, order: 'asc' | 'desc') => void;
  /** Called on every change to the search input */
  onSearchChange?: (value: string) => void;
  /** Called when a tab is clicked */
  onTabChange?: (tabId: string, tabValue?: any) => void;
  /** Initial value for the search input */
  initialSearch?: string;
  /** Array of column header names for sorting */
  sortColumns?: string[];
  /** Currently selected sort column */
  selectedSortColumn?: string;
  /** Currently selected sort order */
  selectedSortOrder?: 'asc' | 'desc';
  /** Show filter button */
  showFilterButton?: boolean;
  /** Array of tabs to display */
  tabs?: TabItem[];
  /** Currently active tab ID */
  activeTabId?: string;
  /** Custom tab styling classes */
  tabClassName?: string;
  /** Custom active tab styling classes */
  activeTabClassName?: string;
  /** Custom inactive tab styling classes */
  inactiveTabClassName?: string;
  /** Disable default API triggers */
  disableDefaultTriggers?: boolean;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onReset,
  onSort,
  onSearchChange,
  onTabChange,
  initialSearch = '',
  sortColumns = [],
  selectedSortColumn,
  selectedSortOrder = 'desc',
  showFilterButton = true,
  tabs = [],
  activeTabId,
  tabClassName,
  activeTabClassName,
  inactiveTabClassName,
  disableDefaultTriggers = false,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalSelectedSort, setInternalSelectedSort] = useState<
    string | null
  >(selectedSortColumn || null);
  const [internalSortOrder, setInternalSortOrder] = useState<'asc' | 'desc'>(
    selectedSortOrder
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasTabs = tabs.length > 0;

  // Initialize first tab as active if no activeTabId is provided and we have tabs
  useEffect(() => {
    if (!isInitialized && hasTabs && !activeTabId && !disableDefaultTriggers) {
      const firstTab = tabs[0];
      if (firstTab) {
        onTabChange?.(firstTab.id, firstTab.value);
      }
      setIsInitialized(true);
    } else if (!hasTabs) {
      setIsInitialized(true);
    }
  }, [
    tabs,
    activeTabId,
    onTabChange,
    hasTabs,
    disableDefaultTriggers,
    isInitialized,
  ]);

  // Update internal state when external props change
  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    setInternalSelectedSort(selectedSortColumn || null);
  }, [selectedSortColumn]);

  useEffect(() => {
    setInternalSortOrder(selectedSortOrder);
  }, [selectedSortOrder]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearchTerm(v);
    onSearchChange?.(v);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearchChange?.('');
  };

  const handleSortSelect = (column: string, order: 'asc' | 'desc') => {
    setInternalSelectedSort(column);
    setInternalSortOrder(order);
    onSort?.(column, order);
    setIsDropdownOpen(false);
  };

  const handleReset = () => {
    setSearchTerm('');
    setInternalSelectedSort(null);
    setInternalSortOrder('desc');
    onSearchChange?.('');
    onReset?.();
  };

  const handleTabClick = (tab: TabItem) => {
    onTabChange?.(tab.id, tab.value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getSortDisplayText = () => {
    if (!internalSelectedSort) return '';
    const orderText = internalSortOrder === 'asc' ? '↑' : '↓';
    return `${internalSelectedSort} ${orderText}`;
  };

  const defaultTabClassName =
    'px-4 py-2 text-sm font-medium rounded-md rounded-[48px] transition-colors duration-200 flex items-center gap-2';
  const defaultActiveTabClassName =
    'border-1 border-gray-100 text-gray-900 bg-white';
  const defaultInactiveTabClassName =
    'text-gray-500 hover:text-gray-700 hover:bg-gray-50';

  // Don't show filter controls when showFilterButton is false
  const showFilterControls = showFilterButton || !hasTabs;

  return (
    <div className={cn('pb-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Tabs Section */}
          {hasTabs && (
            <div className="flex items-center gap-1 mr-4">
              {tabs.map((tab) => {
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={cn(
                      defaultTabClassName,
                      tabClassName,
                      isActive
                        ? cn(defaultActiveTabClassName, activeTabClassName)
                        : cn(defaultInactiveTabClassName, inactiveTabClassName)
                    )}
                  >
                    {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Filter Controls - Only show when showFilterButton is true OR when there are no tabs */}
          {showFilterControls && (
            <div className="flex items-center gap-2">
              {/* Reset Button */}
              <Button
                leftIcon={<AdjustmentsHorizontalIcon className="w-5 h-5" />}
                variant="secondary"
                size="sm"
                onClick={handleReset}
              >
                Reset
              </Button>

              {/* Sort Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <Button
                  leftIcon={<ArrowsUpDownIcon className="w-5 h-5" />}
                  rightIcon={<ChevronDownIcon className="w-4 h-4" />}
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={sortColumns.length === 0}
                >
                  {internalSelectedSort
                    ? `Sort by ${getSortDisplayText()}`
                    : 'Sort'}
                </Button>

                {isDropdownOpen && sortColumns.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[220px]">
                    {sortColumns.map((column) => {
                      if (column === 'Actions') return null;
                      const isSelected = internalSelectedSort === column;

                      return (
                        <div
                          key={column}
                          className="border-b border-gray-100 last:border-b-0"
                        >
                          <div className="px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50">
                            {column}
                          </div>
                          <div className="flex">
                            <button
                              className={cn(
                                'flex-1 text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2',
                                isSelected && internalSortOrder === 'asc'
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-700'
                              )}
                              onClick={() => handleSortSelect(column, 'asc')}
                            >
                              <ArrowUpIcon className="w-4 h-4" />
                              <span>Ascending</span>
                              {isSelected && internalSortOrder === 'asc' && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto"></div>
                              )}
                            </button>
                            <div className="w-px bg-gray-200"></div>
                            <button
                              className={cn(
                                'flex-1 text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2',
                                isSelected && internalSortOrder === 'desc'
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-700'
                              )}
                              onClick={() => handleSortSelect(column, 'desc')}
                            >
                              <ArrowDownIcon className="w-4 h-4" />
                              <span>Descending</span>
                              {isSelected && internalSortOrder === 'desc' && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto"></div>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search Input */}
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          leftIcon={<MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />}
          rightIcon={
            searchTerm && (
              <SlashIcon
                className="bg-gray-100 w-5 h-5 rounded-[4px] cursor-pointer "
                onClick={handleClear}
              />
            )
          }
          placeholder="Search..."
          className="bg-gray-100"
          inputSize="sm"
          type="text"
        />
      </div>
    </div>
  );
};

export default FilterBar;
