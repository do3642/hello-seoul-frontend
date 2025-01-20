import React from 'react';
import '../styles/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 5; // 한 블록당 최대 페이지 수
  
  // currentPage가 0부터 시작하므로, startPage를 올바르게 계산
  const startPage = Math.floor(currentPage / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  // 이전 버튼 함수
  const handlePrevious = () => {
    if (currentPage >= maxPagesToShow) {
      const previousBlockLastPage = startPage - 1; // 이전 블록의 마지막 페이지로 이동
      onPageChange(previousBlockLastPage - 1); // 0-index 보정
    }
  };

  // 다음 버튼 함수
  const handleNext = () => {
    const nextBlockFirstPage = startPage + maxPagesToShow - 1;
    if (currentPage < totalPages - 1 && endPage < totalPages) {
      onPageChange(nextBlockFirstPage);
    }
  };

  // 목록을 누르면 이동하도록 해주는 함수
  const handlePageClick = (page) => {
    if (page !== currentPage + 1) {
      onPageChange(page - 1); // 페이지 번호와 currentPage를 맞추기 위해 -1
    }
  };

  return (
    <div className="pagination">
      <button 
        onClick={handlePrevious} 
        disabled={currentPage < maxPagesToShow} 
        className="pagination-button"
      >
        이전
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`pagination-button ${page === currentPage + 1 ? "active" : ""}`}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={handleNext} 
        disabled={endPage >= totalPages} 
        className="pagination-button"
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
