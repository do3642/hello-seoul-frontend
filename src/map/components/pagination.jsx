import React from 'react';
import '../styles/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 5; // 한 블록당 최대 페이지 수
  const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1; // 현재 블록의 시작 페이지
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages); // 현재 블록의 끝 페이지

  // 이전 버튼 함수
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // 다음 버튼 함수
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // 목록을 누르면 이동하도록 해주는 함수
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button 
        onClick={handlePrevious} 
        disabled={currentPage === 1} 
        className="pagination-button"
      >
        이전
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`pagination-button ${page === currentPage ? "active" : ""}`}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={handleNext} 
        disabled={currentPage === totalPages} 
        className="pagination-button"
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
