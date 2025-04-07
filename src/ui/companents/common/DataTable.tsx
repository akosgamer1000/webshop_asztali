/**
 * Data Table Component
 * 
 * A reusable table component for displaying and managing tabular data.
 * Features:
 * - Pagination
 * - Search functionality
 * - Customizable columns
 * - Loading and error states
 * - Row click handling
 * - Responsive design
 */

import React, { useState, useMemo } from 'react';

/**
 * Column configuration interface
 * @template T - Type of the data items
 * @property {string} header - The text to display in the column header
 * @property {keyof T | ((item: T) => React.ReactNode)} accessor - Function to access the data or key to access the property
 * @property {string} [width] - Optional width for the column
 */
export interface Column<T> {
  header: string;                                    // Column header text
  accessor: keyof T | ((item: T) => React.ReactNode); // Data accessor or custom render function
  width?: string;                                   // Optional column width
}

/**
 * Props interface for the DataTable component
 * @template T - Type of the data items
 * @property {T[]} data - Array of data items to display in the table
 * @property {Column<T>[]} columns - Configuration for each column
 * @property {keyof T} keyField - Field to use as unique identifier for each row
 * @property {boolean} [loading] - Whether the table is in a loading state
 * @property {string | null} [error] - Error message to display if any
 * @property {string} [searchPlaceholder] - Placeholder text for the search input
 * @property {(keyof T)[]} [searchFields] - Fields to search in when filtering
 * @property {(item: T) => void} [onRowClick] - Callback when a row is clicked
 * @property {number} [itemsPerPage] - Number of items to display per page
 */
interface DataTableProps<T> {
  data: T[];                                        // Array of data items
  columns: Column<T>[];                             // Column configurations
  keyField: keyof T;                                // Field to use as row key
  loading?: boolean;                                 // Loading state
  error?: string | null;                            // Error message
  searchPlaceholder?: string;                       // Search input placeholder
  searchFields?: (keyof T)[];                       // Fields to search in
  onRowClick?: (item: T) => void;                  // Row click handler
  itemsPerPage?: number;                            // Items per page
}

/**
 * Generic data table component for displaying and managing tabular data
 * @template T - Type of the data items
 * @param {DataTableProps<T>} props - Component properties
 * @returns {JSX.Element} A data table with pagination and search
 */
function DataTable<T>({
  data,
  columns,
  keyField,
  loading = false,
  error = null,
  searchPlaceholder = 'Search...',
  searchFields = [],
  onRowClick,
  itemsPerPage = 5
}: DataTableProps<T>) {
  // State for pagination and search
  const [currentPage, setCurrentPage] = useState<number>(1);  // Current page number
  const [searchTerm, setSearchTerm] = useState<string>('');   // Current search term

  // Reset to first page when search term changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  /**
   * Filter data based on search term
   * Memoized to prevent unnecessary recalculations
   * @returns {T[]} Filtered array of data items
   */
  const filteredData = useMemo(() => {
    if (!searchTerm || searchFields.length === 0) return data;
    
    return data.filter(item => {
      return searchFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, searchFields]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);  // Total number of pages
  const indexOfLastItem = currentPage * itemsPerPage;                // Index of last item on current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;           // Index of first item on current page
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);  // Items for current page

  /**
   * Handle page change
   * @param {number} pageNumber - New page number to navigate to
   */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * Get cell value based on column configuration
   * @param {T} item - Data item for the row
   * @param {Column<T>} column - Column configuration
   * @returns {React.ReactNode} Content to display in the cell
   */
  const getCellValue = (item: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(item);
    }
    
    return String(item[column.accessor] ?? '');
  };

  // Display loading state
  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div className="text-red-500 text-center p-6">{error}</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      {/* Search input - only shown if searchFields are provided */}
      {searchFields.length > 0 && (
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded"
            placeholder={searchPlaceholder}
          />
        </div>
      )}

      {/* Data table */}
      <table className="w-full border-collapse">
        {/* Table header */}
        <thead className="bg-gray-800 text-white">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                className="p-2 sm:p-3 border text-left text-sm sm:text-base"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Table body */}
        <tbody>
          {currentItems.length === 0 ? (
            // Empty state message
            <tr>
              <td 
                colSpan={columns.length} 
                className="p-2 sm:p-4 text-center text-gray-500 text-sm sm:text-base"
              >
                No items found
              </td>
            </tr>
          ) : (
            // Data rows
            currentItems.map(item => (
              <tr 
                key={String(item[keyField])} 
                className="even:bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {columns.map((column, index) => (
                  <td key={index} className="p-2 sm:p-3 border text-sm sm:text-base">
                    {getCellValue(item, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination controls - only shown if there are multiple pages */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-4">
          {/* Previous page button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          
          {/* Page number buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          {/* Next page button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable; 