import './pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <span
        className={`page-arrow ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        {'<'}
      </span>

      <div className="page-numbers">
        {pages.map((page) => (
          <span
            key={page}
            className={`page-item ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </span>
        ))}
      </div>

      <span
        className={`page-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        {'>'}
      </span>
    </div>
  );
}

export default Pagination;