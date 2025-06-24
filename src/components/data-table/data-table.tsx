/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { QueryParams } from '@/lib/query';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type VisibilityState,
} from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar, { type TabItem } from './filter-bar';
import { DataTablePagination } from './pagination/data-table-pagination';

interface DataTableConfig {
  disableRowClick?: boolean;
  disableRowClickForColumns?: string[];
  disableSort?: boolean;
  sortBy?: string[];
  disableHeader?: boolean;
}

interface FilterBarConfig {
  showFilter?: boolean;
  showFilterButton?: boolean;
  initialSearch?: string;
  initialSortColumn?: string;
  onSearchChange?: (search: string) => void;
  onSortChange?: (column: string) => void;
  onReset?: () => void;
  // Tab configuration
  tabs?: TabItem[];
  activeTabId?: string;
  onTabChange?: (tabId: string, tabValue?: any) => void;
  tabClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  disableDefaultTriggers?: boolean;
}

interface QueryResult<TData> {
  data: TData[];
  isLoading: boolean;
  totalRecords?: number;
  totalPages?: number;
  error?: any;
}

interface DataTableProps<TData> {
  // Required props
  columns: ColumnDef<TData>[];

  // Query hook - function that returns query result
  useQuery?: (enabled: boolean, params: QueryParams) => QueryResult<TData>;

  // Alternative: Direct query result (for backward compatibility)
  customQuery?: QueryResult<TData>;

  // Data transformation
  dataProcessor?: (rawData: any[]) => TData[];

  // Pagination props (initial values when using internal query)
  initialPage?: number;
  initialRecordsPerPage?: number;

  // External control (when you want to control pagination externally)
  currentPage?: number;
  recordsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRecordsPerPageChange?: (recordsPerPage: number) => void;

  // Search and filtering (initial values when using internal query)
  initialSearch?: string;
  search?: string;
  onSearchChange?: (search: string) => void;

  // Sorting (initial values when using internal query)
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;

  // Tab functionality
  activeTab?: string;
  onTabChange?: (tabId: string, tabValue?: any) => void;

  // Date filtering (optional)
  dateRange?: { from_date: string; to_date: string };
  onDateRangeChange?: (dateRange: {
    from_date: string;
    to_date: string;
  }) => void;

  // Additional query parameters
  additionalQueryParams?: Record<string, any>;

  // UI Configuration
  showPagination?: boolean;
  urlPath?: string;
  config?: DataTableConfig;
  renderFilterBar?: FilterBarConfig;

  // Loading state override
  isLoading?: boolean;

  // Query control
  enableQuery?: boolean;
}

export function DataTable<TData>({
  columns,
  useQuery,
  customQuery,
  dataProcessor,

  // Pagination
  initialPage = 1,
  initialRecordsPerPage = 10,
  currentPage: externalCurrentPage,
  recordsPerPage: externalRecordsPerPage,
  onPageChange: externalOnPageChange,
  onRecordsPerPageChange: externalOnRecordsPerPageChange,

  // Search
  initialSearch = '',
  search: externalSearch,
  onSearchChange: externalOnSearchChange,

  // Sorting
  initialSortBy = '',
  initialSortOrder = 'desc',
  sortBy: externalSortBy,
  sortOrder: externalSortOrder,
  onSortChange: externalOnSortChange,

  // Tab functionality
  activeTab: externalActiveTab,
  onTabChange: externalOnTabChange,

  // Date filtering
  dateRange,

  // Additional params
  additionalQueryParams = {},

  // UI Configuration
  showPagination = true,
  urlPath,
  config,
  renderFilterBar,
  isLoading: externalLoading,
  enableQuery = true,
}: DataTableProps<TData>) {
  // Internal state for pagination
  const [internalCurrentPage, setInternalCurrentPage] = useState(initialPage);
  const [internalRecordsPerPage, setInternalRecordsPerPage] = useState(
    initialRecordsPerPage
  );

  // Internal state for search and sorting
  const [internalSearch, setInternalSearch] = useState(initialSearch);
  const [internalSortBy, setInternalSortBy] = useState(initialSortBy);
  const [internalSortOrder, setInternalSortOrder] = useState<'asc' | 'desc'>(
    initialSortOrder
  );

  // Internal state for tab
  const [internalActiveTab, setInternalActiveTab] = useState<string>('');

  // Table state
  const [data, setData] = useState<TData[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Auto-activate first tab if tabs exist and no active tab is set
  useEffect(() => {
    if (
      renderFilterBar?.tabs &&
      renderFilterBar.tabs.length > 0 &&
      !externalActiveTab &&
      !internalActiveTab &&
      !renderFilterBar.disableDefaultTriggers
    ) {
      const firstTab = renderFilterBar.tabs[0];
      if (externalOnTabChange) {
        externalOnTabChange(firstTab?.id || '', firstTab?.value || '');
      } else {
        setInternalActiveTab(firstTab?.id || '');
      }
    }
  }, [
    renderFilterBar?.tabs,
    externalActiveTab,
    internalActiveTab,
    externalOnTabChange,
    renderFilterBar?.disableDefaultTriggers,
  ]);

  // Determine which values to use
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const recordsPerPage = externalRecordsPerPage ?? internalRecordsPerPage;
  const search = externalSearch !== undefined ? externalSearch : internalSearch;
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const sortOrder =
    externalSortOrder !== undefined ? externalSortOrder : internalSortOrder;
  const activeTab =
    externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;

  // Build query parameters with proper filtering
  const queryParams = useMemo((): QueryParams => {
    const params: QueryParams = {
      page: currentPage,
      ...additionalQueryParams,
    };

    // Only add itemsPerPage if it's different from default
    if (recordsPerPage && recordsPerPage !== 10) {
      params.itemsPerPage = recordsPerPage;
    }

    // Only add search if it has a meaningful value
    if (search && search.trim()) {
      params.search = search.trim();
    }

    // Only add sorting if both sortBy and sortOrder are provided
    if (sortBy && sortBy.trim()) {
      params.sortBy = sortBy.trim();
      params.sortOrder = sortOrder || 'desc';
    }

    // Only add activeTab if it exists
    if (activeTab && activeTab.trim()) {
      params.activeTab = activeTab.trim();
    }

    // Only add dateRange if it exists and has values
    if (dateRange && (dateRange.from_date || dateRange.to_date)) {
      params.dateRange = dateRange;
    }

    return params;
  }, [
    currentPage,
    recordsPerPage,
    search,
    sortBy,
    sortOrder,
    activeTab,
    dateRange,
    additionalQueryParams,
  ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryResult = useQuery ? useQuery(enableQuery, queryParams) : null;

  // Determine data source
  const finalQueryResult = useMemo(() => {
    if (queryResult) {
      return queryResult;
    }
    if (customQuery) {
      return {
        data: customQuery.data,
        isLoading: customQuery.isLoading,
        totalRecords: customQuery.totalRecords || customQuery.data.length,
        totalPages:
          customQuery.totalPages ||
          Math.ceil(
            (customQuery.totalRecords || customQuery.data.length) /
              recordsPerPage
          ),
      };
    }
    return { data: [], isLoading: false, totalRecords: 0, totalPages: 1 };
  }, [queryResult, customQuery, recordsPerPage]);

  // Process and set data - using a ref to track previous data to prevent unnecessary updates
  const prevDataRef = useRef<TData[] | null>(null);

  useEffect(() => {
    if (!finalQueryResult.data || !Array.isArray(finalQueryResult.data)) {
      // If we have data but it's not an array, set to empty array
      if (finalQueryResult.data !== undefined) {
        setData([]);
        setTotalRecords(0);
        setTotalPages(1);
      }
      return;
    }

    // Process data
    const processedData = dataProcessor
      ? dataProcessor(finalQueryResult.data)
      : (finalQueryResult.data as TData[]);

    // Only update state if data has actually changed
    const dataChanged =
      JSON.stringify(processedData) !== JSON.stringify(prevDataRef.current);

    if (dataChanged) {
      prevDataRef.current = processedData;
      setData(processedData);

      const totalRecs = finalQueryResult.totalRecords ?? processedData.length;
      const totalPgs =
        finalQueryResult.totalPages ?? Math.ceil(totalRecs / recordsPerPage);

      setTotalRecords(totalRecs);
      setTotalPages(totalPgs);
    }
  }, [
    finalQueryResult.data,
    dataProcessor,
    recordsPerPage,
    finalQueryResult.totalRecords,
    finalQueryResult.totalPages,
  ]);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (externalOnPageChange) {
      externalOnPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  const handleRecordsPerPageChange = (newRecordsPerPage: number) => {
    if (externalOnRecordsPerPageChange) {
      externalOnRecordsPerPageChange(newRecordsPerPage);
    } else {
      setInternalRecordsPerPage(newRecordsPerPage);
      setInternalCurrentPage(1); // Reset to first page when changing page size
    }
  };

  // Search handler
  const handleSearchChange = (value: string) => {
    if (externalOnSearchChange) {
      externalOnSearchChange(value);
    } else {
      setInternalSearch(value);
      setInternalCurrentPage(1); // Reset to first page when searching
    }

    if (renderFilterBar?.onSearchChange) {
      renderFilterBar.onSearchChange(value);
    }
  };

  // Sort handler - Handle both old and new signature
  const handleSort = (
    columnOrOrder: string | 'asc' | 'desc',
    order?: 'asc' | 'desc'
  ) => {
    let column: string;
    let newSortOrder: 'asc' | 'desc';

    if (order !== undefined) {
      // New signature: (column, order)
      column = columnOrOrder as string;
      newSortOrder = order;
    } else {
      // Old signature: (column) - toggle order
      column = columnOrOrder as string;
      newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    }

    if (externalOnSortChange) {
      externalOnSortChange(column, newSortOrder);
    } else {
      setInternalSortBy(column);
      setInternalSortOrder(newSortOrder);
      setInternalCurrentPage(1); // Reset to first page when sorting
    }

    if (renderFilterBar?.onSortChange) {
      renderFilterBar.onSortChange(column);
    }
  };

  // Tab handler
  const handleTabChange = (tabId: string, tabValue?: any) => {
    if (externalOnTabChange) {
      externalOnTabChange(tabId, tabValue);
    } else {
      setInternalActiveTab(tabId);
      setInternalCurrentPage(1); // Reset to first page when changing tab
    }

    if (renderFilterBar?.onTabChange) {
      renderFilterBar.onTabChange(tabId, tabValue);
    }
  };

  // Reset handler
  const handleReset = () => {
    if (externalOnSearchChange) {
      externalOnSearchChange('');
    } else {
      setInternalSearch('');
    }

    if (externalOnSortChange) {
      externalOnSortChange('', 'desc');
    } else {
      setInternalSortBy('');
      setInternalSortOrder('desc');
    }

    // Don't reset tab to empty, reset to first tab if tabs exist
    if (renderFilterBar?.tabs && renderFilterBar.tabs.length > 0) {
      const firstTab = renderFilterBar.tabs[0];
      if (externalOnTabChange && firstTab) {
        externalOnTabChange(firstTab.id, firstTab.value);
      } else {
        setInternalActiveTab(firstTab?.id || '');
      }
    } else {
      if (externalOnTabChange) {
        externalOnTabChange('');
      } else {
        setInternalActiveTab('');
      }
    }

    if (externalOnPageChange) {
      externalOnPageChange(1);
    } else {
      setInternalCurrentPage(1);
    }

    if (renderFilterBar?.onReset) {
      renderFilterBar.onReset();
    }
  };

  // Create table instance
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  // Determine loading state
  const isLoading = externalLoading ?? finalQueryResult.isLoading;

  // Get available sort columns based on config
  const availableSortColumns = useMemo(() => {
    if (config?.disableSort) {
      return [];
    }

    // If config.sortBy is provided, use only those columns
    if (config?.sortBy && config.sortBy.length > 0) {
      return config.sortBy; // Return the config.sortBy array directly
    }

    // Otherwise, use all columns except Actions
    const allColumns = table
      .getAllColumns()
      .map((col) => col.columnDef.header as string);
    return allColumns.filter(
      (column) => column !== 'Actions' && column !== 'actions'
    );
  }, [table, config?.disableSort, config?.sortBy]);

  return (
    <div className="flex flex-col mx-auto">
      {renderFilterBar?.showFilter && (
        <FilterBar
          onReset={handleReset}
          onSort={handleSort}
          onSearchChange={handleSearchChange}
          onTabChange={handleTabChange}
          initialSearch={search}
          sortColumns={availableSortColumns}
          selectedSortColumn={sortBy}
          selectedSortOrder={sortOrder}
          showFilterButton={renderFilterBar.showFilterButton}
          tabs={renderFilterBar.tabs}
          activeTabId={activeTab}
          tabClassName={renderFilterBar.tabClassName}
          activeTabClassName={renderFilterBar.activeTabClassName}
          inactiveTabClassName={renderFilterBar.inactiveTabClassName}
          disableDefaultTriggers={renderFilterBar.disableDefaultTriggers}
        />
      )}
      <div className="flex-grow overflow-auto">
        <Table className="border-t border-dashed">
          {config?.disableHeader ? null : (
            <TableHeader className="h-11 bg-weak-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="font-normal text-sm text-gray-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          )}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-neutral-900" />
                    <span className="ml-2 italic text-muted">Loading</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`${
                    !config?.disableRowClick
                      ? 'cursor-pointer hover:bg-neutral-50'
                      : ''
                  } h-13 font-normal`}
                >
                  {row.getVisibleCells().map((cell) => {
                    const rowDataId = (row.original as { id: string })?.id;
                    const isClickDisabled =
                      config?.disableRowClick ||
                      config?.disableRowClickForColumns?.includes(
                        cell.column.id
                      );

                    return (
                      <TableCell key={cell.id}>
                        {!isClickDisabled ? (
                          <Link
                            to={
                              urlPath
                                ? `${urlPath}/${rowDataId}`
                                : `${rowDataId}`
                            }
                            className="block w-full"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Link>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  {'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <div className="mt-auto">
          <DataTablePagination
            totalRecords={totalRecords}
            currentPage={currentPage}
            totalPages={totalPages}
            recordsPerPage={recordsPerPage}
            onPageChange={handlePageChange}
            onRecordsPerPageChange={handleRecordsPerPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;
