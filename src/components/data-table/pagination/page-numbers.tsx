import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PageNumbersProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  noRecords: boolean;
}

export function PageNumbers({
  currentPage,
  totalPages,
  onPageChange,
  noRecords,
}: PageNumbersProps) {
  const renderPageButtons = () => {
    const pageButtons = [];
    const maxVisiblePages = 5;
    const pageSet = Math.ceil(currentPage / maxVisiblePages);
    const startPage = (pageSet - 1) * maxVisiblePages + 1;

    if (totalPages <= maxVisiblePages + 1) {
      if (noRecords) {
        return (
          <Button
            variant="titiary"
            className="flex items-center justify-center p-0 rounded-full size-8"
            disabled
          >
            1
          </Button>
        );
      }
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={'titiary'}
            className={cn(
              'flex items-center justify-center p-0 rounded-full size-8',
              i === currentPage && 'bg-gray-100'
            )}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }
    } else {
      for (
        let i = startPage;
        i < startPage + maxVisiblePages && i <= totalPages;
        i++
      ) {
        pageButtons.push(
          <Button
            key={i}
            variant={'titiary'}
            className="flex items-center justify-center p-0 rounded-full size-8"
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }

      if (startPage + maxVisiblePages <= totalPages) {
        pageButtons.push(
          <Button
            key="ellipsis"
            variant="titiary"
            className="flex items-center justify-center p-0 rounded-full size-8"
            onClick={() => onPageChange(startPage + maxVisiblePages)}
          >
            ...
          </Button>
        );
      }

      if (startPage + maxVisiblePages <= totalPages) {
        pageButtons.push(
          <Button
            key={totalPages}
            variant={totalPages === currentPage ? 'primary' : 'titiary'}
            className="flex items-center justify-center p-0 rounded-full size-8"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pageButtons;
  };

  return <>{renderPageButtons()}</>;
}
