import React from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange, totalPages }) => {

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link to={`/?page=${currentPage - 1}`} onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </Link>
      )}
      <span>Current Page: {currentPage}</span>
      {currentPage < totalPages && (
        <Link to={`/?page=${currentPage + 1}`} onClick={() => onPageChange(currentPage + 1)}>
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
