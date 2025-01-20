import React from 'react';
import '../styles/Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 5; // 한 블록당 최대 페이지 수
  const currentBlock = Math.floor(currentPage / maxPagesToShow); // 현재 블록 계산
  const startPage = currentBlock * maxPagesToShow; // 현재 블록의 첫 페이지
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1); // 현재 블록의 마지막 페이지

  // 이전 블록 버튼 함수
  const handlePrevious = () => {
    if (currentPage > 0) {
      const previousBlockStart = Math.max(startPage - maxPagesToShow, 0); // 이전 블록의 시작 페이지
      onPageChange(previousBlockStart);
    }
  };

  // 다음 블록 버튼 함수
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      const nextBlockStart = Math.min(startPage + maxPagesToShow, totalPages - 1); // 다음 블록의 시작 페이지
      onPageChange(nextBlockStart);
    }
  };

  // 특정 페이지를 클릭하면 이동
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      {/* 이전 블록 버튼 */}
      <button 
        onClick={handlePrevious} 
        disabled={currentPage === 0} // 첫 블록일 때 비활성화
        className="pagination-button"
      >
        이전
      </button>

      {/* 페이지 번호 버튼 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`pagination-button ${page === currentPage ? "active" : ""}`}
        >
          {page + 1}
        </button>
      ))}

      {/* 다음 블록 버튼 */}
      <button 
        onClick={handleNext} 
        disabled={currentPage >= totalPages - 1} // 마지막 블록일 때 비활성화
        className="pagination-button"
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
