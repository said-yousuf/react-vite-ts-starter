import { Button } from '@/components/ui/button';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { PageNumbers } from './page-numbers';

interface DataTablePaginationProps {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  recordsPerPage: number;
  onPageChange: (page: number) => void;
  onRecordsPerPageChange: (recordsPerPage: number) => void;
}

export function DataTablePagination({
  totalRecords,
  currentPage,
  totalPages,
  onPageChange,
}: DataTablePaginationProps) {
  const noRecords = totalRecords === 0;

  return (
    <div className="flex flex-col items-center gap-4 px-2 mt-6 sm:flex-row sm:justify-between">
      {/* Left: Page info */}
      <div className="order-2 text-sm text-muted-foreground sm:order-1">
        {noRecords
          ? 'No records found'
          : `Page ${currentPage} of ${totalPages} (${totalRecords} records)`}
      </div>

      {/* Center: Page number buttons */}
      <div className="flex items-center justify-center order-1 space-x-2 sm:order-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || noRecords}
          className="items-center justify-center hidden rounded-full sm:flex"
        >
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="titiary"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || noRecords}
          className="flex items-center justify-center rounded-full"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <PageNumbers
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          noRecords={noRecords}
        />
        <Button
          variant="titiary"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || noRecords}
          className="flex items-center justify-center rounded-full"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || noRecords}
          className="items-center justify-center hidden rounded-full sm:flex"
        >
          <ChevronDoubleRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="hidden order-3 sm:block sm:order-3 sm:w-[200px]" />
    </div>
  );
}
